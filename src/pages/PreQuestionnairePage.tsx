import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ClipboardList } from "lucide-react";
import SEOMeta from "../components/seo/SEOMeta";
import PreQuestionnaireForm from "../components/forms/PreQuestionnaireForm";

const PreQuestionnairePage: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSuccess = () => {
    setSubmitStatus("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleError = () => {
    setSubmitStatus("error");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    setSubmitStatus("idle");
  };

  return (
    <>
      <SEOMeta
        title="שאלון קדם אילוף | אומץ לב"
        description="שאלון קדם אילוף - מלא את השאלון לפני תחילת תהליך האילוף"
        noindex={true}
        nofollow={true}
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 lg:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatePresence mode="wait">
            {submitStatus === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-3xl shadow-soft-lg p-8 lg:p-12"
              >
                {/* Success Icon */}
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3"
                  >
                    השאלון נשלח בהצלחה!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-600 text-lg"
                  >
                    תודה על מילוי השאלון. נתראה בקרוב!
                  </motion.p>
                </div>
              </motion.div>
            ) : submitStatus === "error" ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-3xl shadow-soft-lg p-8 lg:p-12"
              >
                {/* Error Icon */}
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <XCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3"
                  >
                    אופס! משהו השתבש
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-600 text-lg mb-6"
                  >
                    לא הצלחנו לשלוח את השאלון. אנא נסה שוב או צור קשר ישירות.
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={handleRetry}
                    className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
                  >
                    נסה שוב
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-soft-lg p-6 lg:p-10"
              >
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-center mb-8"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClipboardList className="w-7 h-7 text-primary-600" />
                  </div>
                  <h1 className="text-2xl lg:text-4xl font-bold text-slate-800 mb-2">
                    שאלון קדם אילוף
                  </h1>
                  <p className="text-slate-600 text-sm lg:text-base">
                    אנא מלא/י את הפרטים הבאים לפני תחילת תהליך האילוף
                  </p>
                </motion.div>

                {/* Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <PreQuestionnaireForm
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default PreQuestionnairePage;
