import { motion } from "framer-motion";

// Mobile-optimized version with improved readability and native app feel
const HeroSubtitle: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      className="mb-8 lg:mb-10"
    >
      {/* Mobile-first typography with enhanced readability */}
      <div className="text-center lg:text-right max-w-2xl mx-auto lg:mx-0 space-y-4 sm:space-y-5">
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed"
          style={{ lineHeight: "1.7" }}
        >
          <span className="inline-block text-primary-300 font-bold bg-primary-500/10 px-2 py-1 rounded-lg mb-1 sm:mb-0 sm:inline">
            באומץ לב
          </span>{" "}
          <span className="block sm:inline mt-1 sm:mt-0">
            אני מאמין שתקשורת אמיתית מתחילה בהבנה.
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed"
          style={{ lineHeight: "1.7" }}
        >
          <span className="inline-block text-primary-300 font-bold bg-primary-500/10 px-2 py-1 rounded-lg mb-1 sm:mb-0 sm:inline">
            באילוף חיובי
          </span>{" "}
          <span className="block sm:inline mt-1 sm:mt-0">
            אני בונה איתכם ועם הכלב שלכם שפה משותפת נטולת עונשים המבוססת על אמון
            וכבוד.
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed"
          style={{ lineHeight: "1.7" }}
        >
          <span className="inline-block text-primary-300 font-bold bg-primary-500/10 px-2 py-1 rounded-lg mb-1 sm:mb-0 sm:inline">
            בטיפול התנהגותי
          </span>{" "}
          <span className="block sm:inline mt-1 sm:mt-0">
            אני מאבחן את שורש הבעיה של הכלב שלכם ובונה תוכנית עבודה מותאמת
            אישית.
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed"
          style={{ lineHeight: "1.7" }}
        >
          <span className="inline-block text-primary-300 font-bold bg-primary-500/10 px-2 py-1 rounded-lg mb-1 sm:mb-0 sm:inline">
            ובכלבנות טיפולית
          </span>{" "}
          <span className="block sm:inline mt-1 sm:mt-0">
            אני משלב כלבים בתהליכים חינוכיים וטיפוליים ליצירת מרחב בטוח ומחזק
            לילדים ולבוגרים כאחד.
          </span>
        </motion.p>
      </div>
    </motion.div>
  );
};

// const HeroSubtitle: React.FC = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, delay: 0.8 }}
//       className="text-lg lg:text-xl text-slate-200 leading-relaxed mb-8 max-w-3xl mx-auto lg:mx-0 space-y-4"
//     >
//       <p>
//         <span className="text-primary-300 font-semibold">באומץ לב</span> אני
//         מאמין שתקשורת אמיתית מתחילה בהבנה.
//       </p>
//       <p>
//         <span className="text-primary-300 font-semibold">באילוף חיובי</span> אני
//         בונה איתכם ועם הכלב שלכם שפה משותפת <br /> נטולת עונשים המבוססת על אמון
//         וכבוד.
//       </p>
//       <p>
//         <span className="text-primary-300 font-semibold">בטיפול התנהגותי</span>{" "}
//         אני מאבחן את שורש הבעיה של הכלב שלכם ובונה תוכנית עבודה מותאמת אישית.
//       </p>
//       <p>
//         <span className="text-primary-300 font-semibold">ובכלבנות טיפולית</span>{" "}
//         אני משלב כלבים בתהליכים חינוכיים וטיפוליים ליצירת מרחב בטוח ומחזק לילדים
//         ולבוגרים כאחד.
//       </p>
//     </motion.div>
//   );
// };

export default HeroSubtitle;
