import { motion } from "framer-motion";

const MainHero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/assets/hero/hero_image.png"
          alt="אומץ לב - אילוף כלבים"
          className="w-full h-full object-cover object-[70%_70%] sm:object-center"
        />
        {/* Top gradient fade - mobile only */}
        <div
          className="absolute top-0 left-0 right-0 h-80 sm:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.85), transparent)",
          }}
        />
        {/* Left gradient fade - desktop only */}
        <div
          className="hidden sm:block absolute top-0 bottom-0 left-0 w-1/2"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.8), transparent)",
          }}
        />
        {/* Bottom gradient fade to slate-900 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background: "linear-gradient(to bottom, transparent, #0f172a)",
          }}
        />
      </div>

      {/* Content - Mobile: top right, Desktop: centered in left column */}
      <div className="relative z-10 min-h-screen flex sm:grid sm:grid-cols-2">
        {/* Mobile layout */}
        <div className="sm:hidden flex items-start justify-start w-full px-6 pt-14">
          <div className="text-right">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold text-white mb-4"
            >
              אומץ לב
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white font-medium"
              style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
            >
              בונים קשר אמיתי, בשיטה חיובית ומלאה באהבה
            </motion.p>
          </div>
        </div>

        {/* Empty right column for desktop (appears first in RTL) */}
        <div className="hidden sm:block" />
        {/* Desktop layout - 2 columns */}
        <div className="hidden sm:flex items-center justify-start">
          <div className="text-right">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6"
            >
              אומץ לב
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-white mb-10 font-medium"
              style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
            >
              בונים קשר אמיתי, בשיטה חיובית ומלאה באהבה
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHero;
