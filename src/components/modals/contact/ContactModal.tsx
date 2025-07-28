import { Dialog, DialogContent } from "../../ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
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
      <DialogTitle className="sr-only">
        <DialogContent className="max-w-md w-[90vw] p-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 border-0 text-white overflow-hidden [&>button]:hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl transform -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl transform translate-x-12 translate-y-12" />
          </div>

          {/* Custom Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="relative z-10 p-4 pt-10">
            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <ContactModalSuccess key="success" />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
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
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
};

export default ContactModal;
