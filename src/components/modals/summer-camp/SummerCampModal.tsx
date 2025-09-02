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

const SummerCampModal = ({ isOpen, onClose }: SummerCampModalProps) => {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSuccess = () => {
    setSubmitStatus("success");
    // Close modal after success
    setTimeout(() => {
      onClose();
      setSubmitStatus("idle");
    }, 8000); // Longer timeout to read the success message
  };

  const handleError = () => {
    setSubmitStatus("error");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg w-[90vw] max-h-[90vh] p-0 border-0 text-slate-900 overflow-hidden rounded-2xl">
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
              className="bg-white rounded-2xl overflow-hidden"
            >
              {/* Header - Fixed */}
              <div className="p-4 pt-6">
                <SummerCampModalHeader />
              </div>

              {/* Content - Scrollable when needed */}
              <div
                className="overflow-y-auto bg-white"
                dir="ltr"
                style={{
                  WebkitOverflowScrolling: "touch",
                  maxHeight: "calc(90vh - 120px)",
                }}
              >
                <div dir="rtl" className="p-4 pt-0 pb-8">
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
                        <SummerCampModalForm
                          onSuccess={handleSuccess}
                          onError={handleError}
                        />
                        {submitStatus === "error" && <SummerCampModalError />}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default SummerCampModal;
