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
      {/* SEO H1 - Screen reader only, fully accessible */}
      <h1 className="sr-only">
        אומץ לב - אלעד שמעונוב | אילוף כלבים מקצועי וכלבנות טיפולית בראשון לציון
      </h1>

      {/* Mobile-first typography with enhanced readability */}
      <div className="text-right max-w-2xl mx-auto lg:mx-0 space-y-4 sm:space-y-5">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-base sm:text-lg lg:text-xl px-2 text-slate-200 leading-relaxed"
          style={{ lineHeight: "1.7" }}
        >
          <strong className=" text-primary-300 font-bold py-1 rounded-lg mb-1 sm:mb-0 inline text-base sm:text-lg lg:text-xl">
            באומץ לב
          </strong>{" "}
          <span className="inline mt-1 sm:mt-0">
            אנחנו מאמינים שתקשורת אמיתית מתחילה בהבנה.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-base sm:text-lg lg:text-xl px-2 text-slate-200 leading-relaxed"
          style={{ lineHeight: "1.7" }}
        >
          <strong className=" text-primary-300 font-bold py-1 rounded-lg mb-1 sm:mb-0 inline text-base sm:text-lg lg:text-xl">
            באילוף כלבים
          </strong>{" "}
          <span className=" inline mt-1 sm:mt-0">
            בגישה חיובית אנחנו בונים איתכם ועם הכלב שפה משותפת נטולת עונשים
            המבוססת על אמון וכבוד.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-base sm:text-lg lg:text-xl px-2 text-slate-200 leading-relaxed"
          style={{ lineHeight: "1.7" }}
        >
          <strong className=" text-primary-300 font-bold  py-1 rounded-lg mb-1 sm:mb-0 inline text-base sm:text-lg lg:text-xl">
            בטיפול התנהגותי
          </strong>{" "}
          <span className="inline mt-1 sm:mt-0">
            אצל כלבים, מאבחנים את שורש הבעיה של הכלב ובונים לו תוכנית עבודה
            מותאמת אישית.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-base sm:text-lg lg:text-xl px-2  text-slate-200 leading-relaxed"
          style={{ lineHeight: "1.7" }}
        >
          <strong className=" text-primary-300 font-bold py-1 rounded-lg mb-1 sm:mb-0 inline text-base sm:text-lg lg:text-xl">
            ובכלבנות טיפולית
          </strong>{" "}
          <span className="inline mt-1 sm:mt-0">
            אנחנו משלבים כלבים בתהליכים חינוכיים וטיפוליים ליצירת מרחב בטוח
            ומחזק לילדים ולבוגרים כאחד.
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSubtitle;
