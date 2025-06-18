import { motion } from "framer-motion";
import { Award } from "lucide-react";

const AwardsBadges: React.FC = () => {
  const awards = [
    { text: "כלבן טיפולי", delay: 0.5 },
    { text: "מאמן כלבים", delay: 0.6 },
    { text: "מטפל התנהגותי", delay: 0.7 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex flex-wrap flex-row-reverse items-center justify-center lg:justify-end gap-3 mb-6"
    >
      {awards.map((award, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: award.delay }}
          className="inline-flex items-center space-x-2 space-x-reverse bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/15 hover:border-white/30 transition-all duration-200"
        >
          <Award className="w-4 h-4" />
          <span>{award.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AwardsBadges;
