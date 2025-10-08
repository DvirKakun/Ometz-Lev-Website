import { motion } from "framer-motion";

interface TimelineHeaderProps {
  title: string;
}

const TimelineHeader = ({ title }: TimelineHeaderProps) => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="md:text-4xl text-2xl font-bold text-slate-800 mb-6">
        {title}
      </h3>
      <div className="w-16 md:w-20 h-1 bg-primary-500 rounded-full mx-auto" />
    </motion.div>
  );
};

export default TimelineHeader;