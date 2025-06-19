import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface HeaderMobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className="xl:hidden p-3 rounded-2xl bg-primary-100 hover:bg-primary-200 text-primary-700 transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="xl:hidden overflow-hidden border-t border-primary-100/50 mt-2"
          >
            <div className="py-6 bg-white/50 backdrop-blur-sm rounded-2xl mt-4 shadow-soft">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderMobileMenu;
