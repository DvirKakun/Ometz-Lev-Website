import React from "react";
import { motion } from "framer-motion";
import { Heart, Target, Users, Award, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const AboutSection: React.FC = () => {
  const achievements = [
    "מעל 10 שנות ניסיון באילוף כלבים",
    "מאמן מוסמך ברשות הטבע והגנים",
    "התמחות בכלבנות טיפולית",
    "מעל 200 כלבים אולפו בהצלחה",
  ];

  const values = [
    {
      icon: Heart,
      title: "אהבה וסבלנות",
      description: "כל כלב הוא עולם ומלואו, ואנחנו מתייחסים אליו באהבה ובכבוד",
    },
    {
      icon: Target,
      title: "גישה מקצועית",
      description: "שיטות מתקדמות ומותאמות אישית לכל כלב ולכל משפחה",
    },
    {
      icon: Users,
      title: "שיתוף המשפחה",
      description: "מעורבות הבעלים היא המפתח להצלחה ארוכת טווח",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
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
            <Heart className="w-4 h-4" />
            <span>קצת עלינו</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            מי אנחנו ב
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              {" "}
              אומץ לב
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            אנחנו מתמחים ביצירת קשר הרמוני בין כלבים לבעליהם, תוך שימוש בשיטות
            חיוביות ומתקדמות
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
              אלעד שמעונוב - המאמן שלכם
            </h3>
            <div className="prose prose-lg text-slate-600 space-y-4 mb-8">
              <p className="leading-relaxed">
                שלום! אני אלעד, מאמן כלבים מוסמך עם מעל עשר שנות ניסיון בתחום.
                התחלתי את הדרך שלי מתוך אהבה עמוקה לכלבים ורצון עז לעזור למשפחות
                ליצור קשר הרמוני עם חברי הכלבים שלהן.
              </p>
              <p className="leading-relaxed">
                הגישה שלי מבוססת על הבנה, סבלנות ושיטות חיוביות. אני מאמין שכל
                כלב יכול ללמוד ולהשתפר, בתנאי שמקבלים אותו בהבנה ונותנים לו את
                הכלים הנכונים.
              </p>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-1 gap-3 mb-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 space-x-reverse"
                >
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span className="text-slate-700">{achievement}</span>
                </motion.div>
              ))}
            </div>

            {/* Award Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-2xl p-4"
            >
              <Award className="w-8 h-8 text-primary-600" />
              <div className="text-right">
                <div className="font-semibold text-slate-800">מאמן מוסמך</div>
                <div className="text-sm text-slate-600">רשות הטבע והגנים</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Values Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center lg:text-right">
              הערכים שלנו
            </h3>
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="card hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-primary-50/30">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-right">
                        <h4 className="text-xl font-semibold text-slate-800 mb-2">
                          {value.title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
