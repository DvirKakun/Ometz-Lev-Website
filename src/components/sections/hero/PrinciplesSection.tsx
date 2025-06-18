import React from "react";
import { motion } from "framer-motion";

interface Principle {
  icon: string;
  title: string;
  description: string;
  colorScheme: {
    bg: string;
    hoverBg: string;
    iconBg: string;
    iconHoverBg: string;
    text: string;
    description: string;
    glow: string;
  };
}

const PrinciplesSection: React.FC = () => {
  const principles: Principle[] = [
    {
      icon: "🏆",
      title: "מומחיות מקצועית",
      description: "ניסיון רב שנים בתחום",
      colorScheme: {
        bg: "bg-primary-500/10",
        hoverBg: "hover:bg-primary-500/20",
        iconBg: "bg-gradient-to-br from-primary-400 to-primary-600",
        iconHoverBg: "group-hover:from-primary-300 group-hover:to-primary-500",
        text: "text-primary-100",
        description: "text-primary-200/80",
        glow: "group-hover:shadow-lg group-hover:shadow-primary-400/30",
      },
    },
    {
      icon: "❤️",
      title: "אילוף בשיטות חיוביות",
      description: "גישה מכבדת ואוהבת",
      colorScheme: {
        bg: "bg-accent-500/10",
        hoverBg: "hover:bg-accent-500/20",
        iconBg: "bg-gradient-to-br from-accent-400 to-accent-600",
        iconHoverBg: "group-hover:from-accent-300 group-hover:to-accent-500",
        text: "text-accent-100",
        description: "text-accent-200/80",
        glow: "group-hover:shadow-lg group-hover:shadow-accent-400/30",
      },
    },
    {
      icon: "🐾",
      title: "קהילה מרוצה",
      description: "לקוחות שחוזרים וממליצים",
      colorScheme: {
        bg: "bg-emerald-500/10",
        hoverBg: "hover:bg-emerald-500/20",
        iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
        iconHoverBg: "group-hover:from-emerald-300 group-hover:to-emerald-500",
        text: "text-emerald-100",
        description: "text-emerald-200/80",
        glow: "group-hover:shadow-lg group-hover:shadow-emerald-400/30",
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0 }}
      className="mb-8"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="text-center lg:text-right mb-8"
      >
        <div className="inline-flex items-center space-x-2 space-x-reverse">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="w-2 h-2 bg-primary-400 rounded-full"
          />
          <h3 className="text-sm font-semibold text-white/90 tracking-wide uppercase">
            הערכים שלנו
          </h3>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "2rem" }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
          />
        </div>
      </motion.div>

      {/* Principles Grid */}
      <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
        {principles.map((principle, index) => (
          <motion.div
            key={principle.title}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 1.2 + index * 0.15,
              type: "spring",
              stiffness: 150,
              damping: 12,
            }}
            className="group flex-1"
          >
            <motion.div
              className={`
                relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-500 cursor-default
                ${principle.colorScheme.bg} ${principle.colorScheme.hoverBg} ${principle.colorScheme.glow}
              `}
              whileHover={{
                y: -4,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative p-6">
                {/* Icon Container */}
                <motion.div
                  className={`
                    relative w-12 h-12 ${principle.colorScheme.iconBg} ${principle.colorScheme.iconHoverBg}
                    rounded-2xl flex items-center justify-center shadow-xl mb-4 mx-auto lg:mx-0 lg:mr-auto
                    transition-all duration-300
                  `}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -3, 3, 0],
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Icon Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle, ${
                        principle.colorScheme.iconBg.includes("primary")
                          ? "rgba(20, 184, 166, 0.3)"
                          : principle.colorScheme.iconBg.includes("accent")
                          ? "rgba(249, 115, 22, 0.3)"
                          : "rgba(16, 185, 129, 0.3)"
                      } 0%, transparent 70%)`,
                      filter: "blur(8px)",
                      transform: "scale(1.5)",
                    }}
                  />

                  <span className="relative text-white text-xl z-10">
                    {principle.icon}
                  </span>
                </motion.div>

                {/* Text Content */}
                <div className="text-center lg:text-right">
                  <motion.h4
                    className={`text-base font-bold ${principle.colorScheme.text} mb-2 leading-tight`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.15 }}
                  >
                    {principle.title}
                  </motion.h4>

                  <motion.p
                    className={`text-sm ${principle.colorScheme.description} leading-relaxed`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + index * 0.15 }}
                  >
                    {principle.description}
                  </motion.p>
                </div>

                {/* Animated Bottom Accent */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 ${principle.colorScheme.iconBg} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.6 + index * 0.15 }}
                />

                {/* Floating Particles */}
                <motion.div
                  className="absolute top-3 right-3 w-1 h-1 bg-white/40 rounded-full"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />

                <motion.div
                  className="absolute bottom-6 left-4 w-1.5 h-1.5 bg-white/30 rounded-full"
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.7,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PrinciplesSection;
