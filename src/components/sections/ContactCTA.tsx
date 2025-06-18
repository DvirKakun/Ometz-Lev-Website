import React from "react";
import { motion } from "framer-motion";
import { Heart, Phone, MessageCircle, Clock, MapPin } from "lucide-react";
import WhatsAppButton from "../common/WhatsAppButton";
import PhoneButton from "../common/PhoneButton";
import { Card, CardContent } from "../ui/card";

const ContactCTA: React.FC = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "הודעה בוואטסאפ",
      description: "התכתבות מהירה ונוחה",
      action: "שלחו הודעה",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Phone,
      title: "שיחת טלפון",
      description: "שיחה ישירה ואישית",
      action: "התקשרו עכשיו",
      color: "from-accent-500 to-accent-600",
    },
  ];

  const workingHours = [
    { day: "ראשון - חמישי", hours: "08:00 - 20:00" },
    { day: "שישי", hours: "08:00 - 15:00" },
    { day: "שבת", hours: "לפי תיאום מראש" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-48 translate-y-48"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-right"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Heart className="w-4 h-4" />
              <span>בואו נתחיל את המסע</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              מוכנים ליצור קשר
              <br />
              <span className="text-accent-200">עם הכלב שלכם?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-primary-100 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              צרו קשר עכשיו לקביעת פגישת ייעוץ ראשונה ונתחיל יחד את המסע ליצירת
              קשר הרמוני בינכם לבין הכלב שלכם
            </motion.p>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <WhatsAppButton
                phoneNumber="972524724700"
                message="שלום אלעד! אני מעוניין/ת לקבוע פגישת ייעוץ ראשונה לכלב שלי."
                size="lg"
                className="flex-1 sm:flex-none bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
              />
              <PhoneButton
                phoneNumber="052-472-4700"
                variant="outline"
                size="lg"
                className="flex-1 sm:flex-none border-white/30 text-white hover:bg-white/10"
              />
            </motion.div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-primary-100"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <MapPin className="w-5 h-5" />
                <span>ראשון לציון ופזור</span>
              </div>
              <div className="hidden sm:block text-primary-200">•</div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Clock className="w-5 h-5" />
                <span>זמינות גמישה</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Working Hours & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Working Hours Card */}
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2 space-x-reverse">
                  <Clock className="w-5 h-5" />
                  <span>שעות פעילות</span>
                </h3>
                <div className="space-y-3">
                  {workingHours.map((schedule, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center text-primary-100"
                    >
                      <span className="font-medium">{schedule.hours}</span>
                      <span>{schedule.day}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-white mb-1">
                        {method.title}
                      </h4>
                      <p className="text-sm text-primary-100 mb-2">
                        {method.description}
                      </p>
                      <span className="text-xs text-accent-200 font-medium">
                        {method.action}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
                <Heart className="w-6 h-6 text-red-400" />
                <span className="text-lg font-semibold text-white">
                  הייעוץ הראשון
                </span>
              </div>
              <p className="text-primary-100 text-sm">
                פגישת הכרות ללא התחייבות
              </p>
              <p className="text-accent-200 font-medium text-sm mt-1">
                כי כל מסע מתחיל בצעד אחד
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
