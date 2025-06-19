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
  }, [targetDate, timeLeft]);

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
        "flex flex-col items-center space-y-1",
        // Clean background with subtle gradient
        "bg-white/80 backdrop-blur-sm",
        // Simple elegant border
        "border border-slate-200/60",
        // Clean shadow without expanding size
        "shadow-md shadow-slate-900/5",
        // Rounded corners
        "rounded-lg",
        // Minimal padding
        "px-2 py-1.5",
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Event Info */}
      {showEventInfo && (
        <EventInfo
          targetDate={targetDate}
          eventTitle={eventTitle}
          className="mb-1"
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
