import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../../../ui/card";
import { cn } from "../../../../lib/utils";
import { type TimeUnitCardProps } from "../../../../types/timer";

const TimeUnitCard: React.FC<TimeUnitCardProps> = ({
  value,
  label,
  previousValue,
  className,
}) => {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (previousValue !== undefined && previousValue !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 200);
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);

  const formattedValue = value.toString().padStart(2, "0");

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <motion.div
        className="relative"
        animate={isFlipping ? { scale: [1, 1.01, 1] } : {}}
        transition={{ duration: 0.2 }}
      >
        <Card className="w-5 h-6 sm:w-6 sm:h-7 xl:w-7 xl:h-8 bg-gradient-to-b from-primary-500 to-primary-600 border border-primary-400 shadow-md shadow-primary-900/20 rounded">
          <CardContent className="p-0 flex items-center justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.span
                key={formattedValue}
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 3 }}
                transition={{ duration: 0.15 }}
                className="text-[10px] sm:text-xs font-bold text-white leading-none"
              >
                {formattedValue}
              </motion.span>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Flip animation overlay */}
        {isFlipping && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-primary-100 to-primary-200 rounded opacity-15"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      <motion.span
        className="text-xs font-semibold text-primary-700 mt-0.5 text-center leading-none"
        animate={isFlipping ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 0.2 }}
        style={{ fontSize: "9px" }}
      >
        {label}
      </motion.span>
    </div>
  );
};

export default TimeUnitCard;
