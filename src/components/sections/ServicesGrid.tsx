import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, BookOpen, Award, Users, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const ServicesGrid: React.FC = () => {
  const services = [
    {
      path: "/therapy",
      title: "כלבנות טיפולית",
      icon: Heart,
      description: "טיפול באמצעות כלבים לילדים ומבוגרים עם צרכים מיוחדים",
      features: [
        "טיפול בחרדות",
        "שיפור כישורים חברתיים",
        "חיזוק הביטחון העצמי",
      ],
      color: "from-red-400 to-pink-500",
      bgColor: "from-red-50 to-pink-50",
      hoverColor: "hover:shadow-red-200/50",
    },
    {
      path: "/training",
      title: "אילוף כלבים",
      icon: BookOpen,
      description: "אילוף מקצועי לכלבים בכל הגילאים עם שיטות חיוביות",
      features: ["אילוף בסיסי", "פתרון בעיות התנהגות", "אילוף מתקדם"],
      color: "from-primary-500 to-primary-600",
      bgColor: "from-primary-50 to-primary-100/50",
      hoverColor: "hover:shadow-primary-200/50",
    },
    {
      path: "/coaching",
      title: "אימון אישי",
      icon: Award,
      description: "ליווי אישי לבעלי כלבים ליצירת קשר הרמוני",
      features: ["ייעוץ אישי", "תכנית מותאמת", "ליווי רציף"],
      color: "from-accent-500 to-orange-500",
      bgColor: "from-accent-50 to-orange-50",
      hoverColor: "hover:shadow-accent-200/50",
    },
    {
      path: "/schools",
      title: "תכנית גפן",
      icon: Users,
      description: "תכנית מיוחדת לבתי ספר להכרת עולם הכלבים",
      features: ["חינוך לאחריות", "הכרת התנהגות כלבים", "פעילויות חוויתיות"],
      color: "from-purple-500 to-indigo-500",
      bgColor: "from-purple-50 to-indigo-50",
      hoverColor: "hover:shadow-purple-200/50",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-primary-50/20 to-accent-50/20">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            <span>השירותים שלנו</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            איך אנחנו יכולים
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              {" "}
              לעזור לכם
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            מגוון שירותים מקצועיים המותאמים לצרכים השונים שלכם ושל הכלב שלכם
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.path}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card
                className={`card hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br ${service.bgColor} ${service.hoverColor} hover:-translate-y-2 h-full`}
              >
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-center space-x-4 space-x-reverse mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed mb-6 text-right">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1 + featureIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3 space-x-reverse"
                      >
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full`}
                        ></div>
                        <span className="text-slate-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className="w-full justify-between bg-white/80 hover:bg-white text-slate-800 border border-slate-200/50 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105"
                  >
                    <Link to={service.path} className="flex items-center">
                      <span className="flex-1 text-center font-medium">
                        למידע נוסף
                      </span>
                      <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
