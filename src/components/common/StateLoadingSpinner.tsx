import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import type { StateLoadingSpinnerProps } from "../../types/state_loading_spinner";

export default function StateLoadingSpinner({
  title = "טוען...",
  description,
  size = "md",
}: StateLoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col items-center justify-center min-h-[400px] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Loader2
              className={`${sizeClasses[size]} text-primary animate-spin mb-4`}
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            {description && (
              <p className="text-gray-600 max-w-md">{description}</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
