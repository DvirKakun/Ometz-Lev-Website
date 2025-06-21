import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../../lib/utils";
import { type EventInfoProps } from "../../../../types/timer";

const EventInfo: React.FC<EventInfoProps> = ({
  targetDate,
  eventTitle = "התרגשות מתקרבת!",
  className,
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("he-IL", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <motion.div
      className={cn("text-center", className)}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-[10px] xl:text-xs font-semibold text-slate-700 leading-tight">
        {eventTitle}
      </h3>
      <p
        className="text-xs text-slate-500 leading-tight"
        style={{ fontSize: "8px" }}
      >
        {formatDate(targetDate)}
      </p>
    </motion.div>
  );
};

export default EventInfo;
