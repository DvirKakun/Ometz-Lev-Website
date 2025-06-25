import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../../lib/utils";
import {
  type TimeLeft,
  type TimeUnit,
  type CountdownTimerProps,
} from "../../../../types/timer";
import TimeUnitCard from "./TimeUnitCard";
import TimeSeparator from "./TimeSeparator";
import EventInfo from "./EventInfo";

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  eventTitle,
  className,
  showEventInfo = true,
  onClick,
  clickable = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [previousTimeLeft, setPreviousTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setPreviousTimeLeft({ ...timeLeft });

        const newTimeLeft = {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        };

        setTimeLeft(newTimeLeft);
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isActive) {
    return null;
  }

  const timeUnits: TimeUnit[] = [
    {
      value: timeLeft.seconds,
      label: "שניות",
      previousValue: previousTimeLeft.seconds,
    },
    {
      value: timeLeft.minutes,
      label: "דקות",
      previousValue: previousTimeLeft.minutes,
    },
    {
      value: timeLeft.hours,
      label: "שעות",
      previousValue: previousTimeLeft.hours,
    },
    {
      value: timeLeft.days,
      label: "ימים",
      previousValue: previousTimeLeft.days,
    },
  ];

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center space-y-1 sm:space-y-1",
        // Attractive gradient background with primary colors
        "bg-gradient-to-br from-primary-50 via-white to-accent-50",
        // Subtle border with primary accent
        "border border-primary-200/70",
        // Enhanced shadow for prominence
        "shadow-lg shadow-primary-900/10",
        // Rounded corners
        "rounded-xl",
        // Responsive padding - ultra compact for mobile, normal for desktop
        "px-1.5 py-0.5 sm:px-2 sm:py-1 xl:px-2 xl:py-1.5",
        // Clickable styles with more pronounced hover effects
        clickable && "cursor-pointer hover:bg-gradient-to-br hover:from-primary-100 hover:via-white hover:to-accent-100 hover:shadow-xl hover:shadow-primary-900/15 hover:border-primary-300 transition-all duration-300 hover:scale-105",
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={clickable && onClick ? onClick : undefined}
    >
      {/* Event Info */}
      {showEventInfo && (
        <EventInfo
          targetDate={targetDate}
          eventTitle={eventTitle}
          className="mb-0.5 xl:mb-1"
        />
      )}

      {/* Timer Display */}
      <div className="flex items-center justify-center space-x-0.5 space-x-reverse">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <TimeUnitCard
              value={unit.value}
              label={unit.label}
              previousValue={unit.previousValue}
            />
            {index < timeUnits.length - 1 && <TimeSeparator />}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
