import { motion } from "framer-motion";

const HeroSubtitle: React.FC = () => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="text-xl lg:text-2xl text-slate-200 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
    >
      אילוף כלבים מקצועי, כלבנות טיפולית ואימונים אישיים
      <br />
      <span className="text-primary-300 font-semibold">
        ליצירת קשר הרמוני בינכם לבין הכלב שלכם
      </span>
    </motion.p>
  );
};

export default HeroSubtitle;
