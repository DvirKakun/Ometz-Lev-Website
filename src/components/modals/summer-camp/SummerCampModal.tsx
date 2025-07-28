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
      <DialogContent className="max-w-lg w-[90vw] max-h-[90vh] p-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 border-0 text-white overflow-hidden [&>button]:hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl transform -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl transform translate-x-12 translate-y-12" />
        </div>

        <DialogHeader className="sr-only">
          <DialogTitle>הרשמה לקייטנת אומץ לב</DialogTitle>
        </DialogHeader>

        <div className="relative z-10 p-4 pt-10">
          <AnimatePresence mode="wait">
            {submitStatus === "success" ? (
              <SummerCampModalSuccess key="success" />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
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
      </DialogContent>
    </Dialog>
  );
};

export default SummerCampModal;
