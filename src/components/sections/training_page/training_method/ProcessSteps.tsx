import { motion } from "framer-motion";

const ProcessSteps = () => {
  const steps = [
    {
      step: "1",
      title: "הערכה",
      desc: "ניתוח התנהגות ובניית תוכנית",
    },
    {
      step: "2",
      title: "יישום",
      desc: "אימונים מעשיים והדרכה",
    },
    {
      step: "3",
      title: "מעקב",
      desc: "ליווי שוטף ושיפורים",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-slate-50 rounded-2xl p-8 border border-slate-200"
    >
      <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        תהליך האילוף שלנו
      </h3>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
            className="space-y-3"
          >
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
              {step.step}
            </div>
            <h4 className="text-lg font-semibold text-slate-800">
              {step.title}
            </h4>
            <p className="text-slate-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProcessSteps;
