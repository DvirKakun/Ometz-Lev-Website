import React from "react";
import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";
import WhatsAppButton from "../common/WhatsAppButton";
import PhoneButton from "../common/PhoneButton";
import SlideHeroImage from "../common/SlideHeroImage";

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-16 lg:pb-24 bg-gradient-to-br from-slate-900 via-primary-900 to-accent-900 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        {/* Large gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-transparent rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent-400/20 to-transparent rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-primary-300/10 to-accent-300/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-8 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-white/10 h-full"></div>
            ))}
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-primary-300/40 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 left-32 w-3 h-3 bg-accent-300/40 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 right-40 w-2 h-2 bg-primary-200/40 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-1 h-1 bg-accent-200/40 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-primary-900/70 to-accent-900/80"></div>

      <div className="container-max section-padding relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content - Right side for RTL */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center lg:text-right order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center space-x-2 space-x-reverse bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Award className="w-4 h-4" />
              <span>כלבן טיפולי, מאמן כלבים ומטפל התנהגותי</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              ברוכים הבאים ל
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-300 block">
                אומץ לב
              </span>
            </motion.h1>

            {/* Subtitle */}
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

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-8"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-slate-300 font-medium">
                  +200 לקוחות מרוצים
                </span>
              </div>
              <div className="text-slate-400">•</div>
              <div className="text-slate-300 font-medium">+10 שנות נסיון</div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <WhatsAppButton
                phoneNumber="972524724700"
                message="שלום! אני מעוניין/ת לקבל מידע על שירותי אילוף הכלבים של אומץ לב."
                size="lg"
                className="flex-1 sm:flex-none"
              />
              <PhoneButton
                phoneNumber="052-472-4700"
                variant="outline"
                size="lg"
                className="flex-1 sm:flex-none"
              />
            </motion.div>
          </motion.div>

          {/* Dynamic Image - Left side for RTL */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 order-1 lg:order-2 relative max-w-md lg:max-w-lg"
          >
            <SlideHeroImage className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
