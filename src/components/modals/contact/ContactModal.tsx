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
      <DialogContent className="max-w-[85vw] sm:max-w-md p-0 border-0 text-slate-900 overflow-hidden rounded-2xl">
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
                  damping: 30
                }
              }}
              className="bg-white rounded-2xl"
            >
              <div className="relative p-4 pt-10">
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
                      <ContactModalHeader />
                      <ContactModalForm
                        onSuccess={handleSuccess}
                        onError={handleError}
                      />
                      {submitStatus === "error" && <ContactModalError />}
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

export default ContactModal;
