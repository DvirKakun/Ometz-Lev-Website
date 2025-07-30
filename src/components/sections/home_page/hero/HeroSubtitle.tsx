import { motion } from "framer-motion";

const HeroSubtitle: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="text-lg lg:text-xl text-slate-200 leading-relaxed mb-8 max-w-3xl mx-auto lg:mx-0 space-y-4"
    >
      <p>
        <span className="text-primary-300 font-semibold">באומץ לב</span> אני
        מאמין שתקשורת אמיתית מתחילה בהבנה.
      </p>
      <p>
        <span className="text-primary-300 font-semibold">באילוף חיובי</span> אני
        בונה איתכם ועם הכלב שלכם שפה משותפת <br /> נטולת עונשים המבוססת על אמון
        וכבוד.
      </p>
      <p>
        <span className="text-primary-300 font-semibold">בטיפול התנהגותי</span>{" "}
        אני מאבחן את שורש הבעיה של הכלב שלכם ובונה תוכנית עבודה מותאמת אישית.
      </p>
      <p>
        <span className="text-primary-300 font-semibold">ובכלבנות טיפולית</span>{" "}
        אני משלב כלבים בתהליכים חינוכיים וטיפוליים ליצירת מרחב בטוח ומחזק לילדים
        ולבוגרים כאחד.
      </p>
    </motion.div>
  );
};

export default HeroSubtitle;
