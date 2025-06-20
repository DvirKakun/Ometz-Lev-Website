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
}

export default function HeaderNavigation({
  isMobile = false,
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
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={item.to}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.08, duration: 0.25 }}
          >
            <NavLink
              to={item.to}
              end={item.to === "/"} /* 2 */
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-4 space-x-reverse px-6 py-4 mx-3 rounded-2xl font-semibold text-lg transition-all",
                  isActive
                    ? "bg-primary-100 text-primary-700 shadow-md"
                    : "text-slate-700 hover:bg-primary-50 hover:text-primary-600"
                )
              }
            >
              <item.icon className="w-6 h-6" />
              <span>{item.label}</span>
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
                "flex items-center space-x-2 space-x-reverse px-2.5 py-2 rounded-lg font-medium text-sm transition-all",
                isActive
                  ? "bg-primary-100 text-primary-700 shadow-md"
                  : "text-slate-700 hover:bg-primary-50 hover:text-primary-600 hover:shadow-sm"
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
