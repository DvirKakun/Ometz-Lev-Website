import { motion } from "framer-motion";
import { Video } from "lucide-react";

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
    >
      <Video className="w-16 h-16 text-slate-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-slate-600 mb-2">
        אין סרטונים ברמה זו
      </h3>
      <p className="text-slate-500">
        נסו לבחור רמה אחרת או חזרו למבט כללי
      </p>
    </motion.div>
  );
};

export default EmptyState;