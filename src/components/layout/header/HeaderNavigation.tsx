import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Award, BookOpen, Users, Home } from "lucide-react";
import { cn } from "../../../lib/utils";

interface NavItem {
  to: string; // ABSOLUTE path
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface HeaderNavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export default function HeaderNavigation({
  isMobile = false,
  onItemClick,
}: HeaderNavigationProps) {
  /* ---------- 1. absolute paths ---------- */
  const items: NavItem[] = [
    { to: "/home", label: "דף הבית", icon: Home },
    { to: "/therapy", label: "כלבנות טיפולית", icon: Heart },
    { to: "/training", label: "אילוף כלבים", icon: BookOpen },
    { to: "/coaching", label: "אימון אישי", icon: Award },
    { to: "/schools", label: "תכנית גפן", icon: Users },
  ];

  /* ---------- MOBILE LIST ---------- */
  if (isMobile) {
    return (
      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={item.to}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.06, duration: 0.25 }}
          >
            <NavLink
              to={item.to}
              end={item.to === "/"} /* 2 */
              onClick={onItemClick}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-4 space-x-reverse px-5 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                  isActive
                    ? "bg-primary-100 text-primary-700 shadow-sm"
                    : "text-slate-700 hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100 focus-visible:bg-primary-50 focus-visible:text-primary-600"
                )
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </div>
    );
  }

  /* ---------- DESKTOP ROW ---------- */
  return (
    <div className="hidden xl:flex items-center space-x-2 space-x-reverse ml-4">
      {items.map((item) => (
        <motion.div
          key={item.to}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink
            to={item.to}
            end={item.to === "/"} /* 2 */
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-2 space-x-reverse px-2.5 py-2 rounded-lg font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                isActive
                  ? "bg-primary-100 text-primary-700 shadow-md"
                  : "text-slate-700 hover:bg-primary-50 hover:text-primary-600 hover:shadow-sm focus-visible:bg-primary-50 focus-visible:text-primary-600"
              )
            }
          >
            <item.icon className="w-4 h-4" />
            <span className="whitespace-nowrap">{item.label}</span>
          </NavLink>
        </motion.div>
      ))}
    </div>
  );
}
