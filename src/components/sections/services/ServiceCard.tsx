import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../ui/card";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { type Service } from "../../../data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link to={service.path} className="block">
        <motion.div
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <Card className="border-0 overflow-hidden relative bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 aspect-square">
            {/* Animated Background Gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0`}
              animate={{ opacity: isHovered ? 0.8 : 0.3 }}
              transition={{ duration: 0.4 }}
            />

            {/* Glowing Border Effect */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 blur-sm`}
              animate={{ opacity: isHovered ? 0.4 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Sparkle Effect */}
            <motion.div
              className="absolute top-4 right-4 text-white/60"
              animate={{
                scale: isHovered ? 1.2 : 0.8,
                rotate: isHovered ? 180 : 0,
                opacity: isHovered ? 1 : 0.3,
              }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>

            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full relative z-10">
              {/* Icon with Advanced Animation */}
              <motion.div
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  y: isHovered ? -12 : 0,
                  rotateY: isHovered ? 10 : 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center shadow-2xl mb-6 relative overflow-hidden`}
              >
                {/* Icon Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} blur-md opacity-0`}
                  animate={{ opacity: isHovered ? 0.6 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <service.icon className="w-10 h-10 text-white relative z-10" />
              </motion.div>

              {/* Title with Modern Typography */}
              <motion.h3
                animate={{
                  y: isHovered ? -6 : 0,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-slate-800 mb-4 leading-tight tracking-tight"
              >
                {service.title}
              </motion.h3>

              {/* Features List with Staggered Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 20,
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-3 w-full"
              >
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -20,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: isHovered ? idx * 0.08 + 0.2 : 0,
                      ease: "easeOut",
                    }}
                    className="flex items-center text-sm text-slate-700 font-medium"
                  >
                    <motion.div
                      className={`w-2.5 h-2.5 bg-gradient-to-br ${service.color} rounded-full ml-2 flex-shrink-0`}
                      animate={{
                        scale: isHovered ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.2, delay: idx * 0.1 }}
                    />
                    <span className="text-right flex-1 leading-relaxed">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Call-to-Action Arrow */}
              <motion.div
                className="absolute bottom-4 left-4 opacity-0"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : -10,
                }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div
                  className={`w-8 h-8 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            </CardContent>

            {/* Subtle Border Glow */}
            <motion.div
              className="absolute inset-0 rounded-[inherit] border-2 border-transparent"
              animate={{
                borderColor: isHovered
                  ? `rgba(255,255,255,0.2)`
                  : "transparent",
              }}
              transition={{ duration: 0.3 }}
              style={{
                background: isHovered
                  ? `linear-gradient(45deg, ${service.color
                      .replace("from-", "")
                      .replace("to-", "")}) border-box`
                  : "none",
                WebkitMask:
                  "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
