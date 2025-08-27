import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SummerCampModalHeader from "./SummerCampModalHeader";
import SummerCampModalForm from "./SummerCampModalForm";
import SummerCampModalSuccess from "./SummerCampModalSuccess";
import SummerCampModalError from "./SummerCampModalError";
import type { SummerCampModalProps } from "../../../types/modals";

const SummerCampModal = ({ isOpen, onOpenChange }: SummerCampModalProps) => {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSuccess = () => {
    setSubmitStatus("success");
    // Close modal after success
    setTimeout(() => {
      onOpenChange(false);
      setSubmitStatus("idle");
    }, 8000); // Longer timeout to read the success message
  };

  const handleError = () => {
    setSubmitStatus("error");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[90vw] max-h-[90vh] p-0 border-0 text-slate-900 overflow-y-auto overflow-x-hidden rounded-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>הרשמה לקייטנת אומץ לב</DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                duration: 0.35, 
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="bg-white rounded-2xl"
            >
              <div className="relative p-4 pt-10">
                <AnimatePresence mode="wait">
                  {submitStatus === "success" ? (
                    <SummerCampModalSuccess key="success" />
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                    >
                      <SummerCampModalHeader />
                      <SummerCampModalForm
                        onSuccess={handleSuccess}
                        onError={handleError}
                      />
                      {submitStatus === "error" && <SummerCampModalError />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default SummerCampModal;
