import { Dialog, DialogContent } from "../../ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ContactModalHeader from "./ContactModalHeader";
import ContactModalForm from "./ContactModalForm";
import ContactModalSuccess from "./ContactModalSuccess";
import ContactModalError from "./ContactModalError";
import { DialogTitle } from "@radix-ui/react-dialog";
import type { ContactModalProps } from "../../../types/modals";

const ContactModal = ({ isOpen, onOpenChange }: ContactModalProps) => {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSuccess = () => {
    setSubmitStatus("success");
    // Close modal after success
    setTimeout(() => {
      onOpenChange(false);
      setSubmitStatus("idle");
    }, 2000);
  };

  const handleError = () => {
    setSubmitStatus("error");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[85vw] sm:max-w-md max-h-[90vh] p-0 border-0 text-slate-900 overflow-hidden rounded-2xl">
        <DialogTitle className="sr-only">צור קשר</DialogTitle>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                scale: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
              }}
              className="bg-white rounded-2xl overflow-hidden"
            >
              {/* Header - Fixed */}
              <div className="p-4 pt-6">
                <ContactModalHeader />
              </div>

              {/* Content - Scrollable when needed */}
              <div
                className="overflow-y-auto bg-white"
                dir="ltr"
                style={{
                  WebkitOverflowScrolling: "touch",
                  maxHeight: "calc(90vh - 160px)",
                }}
              >
                <div dir="rtl" className="p-4 pt-0 pb-6">
                  <AnimatePresence mode="wait">
                    {submitStatus === "success" ? (
                      <ContactModalSuccess key="success" />
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.95, rotateX: -10 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        <ContactModalForm
                          onSuccess={handleSuccess}
                          onError={handleError}
                        />
                        {submitStatus === "error" && <ContactModalError />}
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

export default ContactModal;
