import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FlipCardProps {
  value: number;
  label: string;
  previousValue?: number;
}

const FlipCard: React.FC<FlipCardProps> = ({ value, label, previousValue }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (previousValue !== undefined && previousValue !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);

  const formattedValue = value.toString().padStart(2, "0");
  const formattedPreviousValue =
    previousValue?.toString().padStart(2, "0") || formattedValue;

  return (
    <div className="relative">
      {/* Card Container */}
      <div className="relative w-12 h-14 lg:w-14 lg:h-16">
        {/* Background Card */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg shadow-lg border border-slate-600/30" />

        {/* Flip Animation Container */}
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={formattedValue}
              className="absolute inset-0 flex items-center justify-center"
              initial={isFlipping ? { rotateX: -90 } : false}
              animate={{ rotateX: 0 }}
              exit={{ rotateX: 90 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Top Half */}
              <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-100 flex items-center justify-center">
                <span className="text-slate-800 font-bold text-lg lg:text-xl">
                  {formattedValue}
                </span>
              </div>

              {/* Middle Line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-400/30 transform -translate-y-px" />

              {/* Bottom Half */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center">
                <span className="text-slate-800 font-bold text-lg lg:text-xl">
                  {formattedValue}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Highlight Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary-400/20 to-accent-400/20 rounded-lg opacity-0"
          animate={isFlipping ? { opacity: [0, 0.6, 0] } : {}}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Label */}
      <motion.p
        className="text-xs font-medium text-slate-600 text-center mt-1 leading-tight"
        animate={isFlipping ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.p>
    </div>
  );
};

interface FlipCountdownTimerProps {
  targetDate?: Date;
  className?: string;
}

const FlipCountdownTimer: React.FC<FlipCountdownTimerProps> = ({
  targetDate,
  className = "",
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
    if (!targetDate) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setPreviousTimeLeft(timeLeft);
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
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, timeLeft]);

  // Don't render if no target date or countdown is finished
  if (!targetDate || !isActive) {
    return null;
  }

  const timeUnits = [
    {
      value: timeLeft.days,
      previousValue: previousTimeLeft.days,
      label: "ימים",
    },
    {
      value: timeLeft.hours,
      previousValue: previousTimeLeft.hours,
      label: "שעות",
    },
    {
      value: timeLeft.minutes,
      previousValue: previousTimeLeft.minutes,
      label: "דקות",
    },
    {
      value: timeLeft.seconds,
      previousValue: previousTimeLeft.seconds,
      label: "שניות",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`flex items-end gap-2 lg:gap-3 ${className}`}
    >
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-end gap-1">
          <FlipCard
            value={unit.value}
            label={unit.label}
            previousValue={unit.previousValue}
          />
          {index < timeUnits.length - 1 && (
            <div className="flex flex-col items-center pb-4">
              <div className="w-1 h-1 bg-slate-400 rounded-full mb-1" />
              <div className="w-1 h-1 bg-slate-400 rounded-full" />
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default FlipCountdownTimer;
