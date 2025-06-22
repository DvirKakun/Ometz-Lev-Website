import { motion } from "framer-motion";
import { Heart, Brain, Target, Shield } from "lucide-react";

const MethodPrinciples = () => {
  const methodPrinciples = [
    {
      icon: Heart,
      title: "חיזוק חיובי",
      description: "שימוש בפרסים וחיזוקים חיוביים במקום עונשים",
    },
    {
      icon: Brain,
      title: "הבנת התנהגות",
      description: "ניתוח מעמיק של הסיבות להתנהגות הכלב",
    },
    {
      icon: Target,
      title: "יעדים ברורים",
      description: "הגדרת מטרות ספציפיות ומדידות לכל שלב",
    },
    {
      icon: Shield,
      title: "סביבה בטוחה",
      description: "יצירת מרחב לימוד נוח ובטוח לכלב",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {methodPrinciples.map((principle, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
          className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-start gap-4 text-right">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <principle.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {principle.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {principle.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MethodPrinciples;