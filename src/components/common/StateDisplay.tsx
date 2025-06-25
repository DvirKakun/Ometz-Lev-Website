import { motion } from "framer-motion";
import { Button } from "../ui/button";
import type { StateDisplayProps } from "../../types/state_display";

export default function StateDisplay({
  icon: Icon,
  title,
  description,
  iconClassName = "w-12 h-12 text-gray-400 mb-4",
  showAction = false,
  actionText,
  onAction,
  actionVariant = "default",
}: StateDisplayProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col items-center justify-center min-h-[400px] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className={iconClassName} />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {title}
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-md leading-relaxed">
              {description}
            </p>
            {showAction && actionText && onAction && (
              <Button
                onClick={onAction}
                variant={actionVariant}
                size="lg"
                className="font-medium"
              >
                {actionText}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
