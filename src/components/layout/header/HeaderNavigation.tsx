import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Heart, Award, BookOpen, Users, Home } from "lucide-react";
import { cn } from "../../../lib/utils";

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface HeaderNavigationProps {
  isMobile?: boolean;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  isMobile = false,
}) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: "/", label: "דף הבית", icon: Home },
    { path: "/therapy", label: "כלבנות טיפולית", icon: Heart },
    { path: "/training", label: "אילוף כלבים", icon: BookOpen },
    { path: "/coaching", label: "אימון אישי", icon: Award },
    { path: "/schools", label: "תכנית גפן", icon: Users },
  ];

  if (isMobile) {
    return (
      <div className="space-y-3">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link
                to={item.path}
                className={cn(
                  "flex items-center space-x-4 space-x-reverse px-6 py-4 mx-3 rounded-2xl font-semibold text-lg transition-all duration-300",
                  isActive
                    ? "bg-primary-100 text-primary-700 shadow-md"
                    : "text-slate-700 hover:bg-primary-50 hover:text-primary-600"
                )}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="hidden xl:flex items-center space-x-4 space-x-reverse flex-1 justify-center">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <motion.div
            key={item.path}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={item.path}
              className={cn(
                "flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-xl font-medium text-sm transition-all duration-300",
                isActive
                  ? "bg-primary-100 text-primary-700 shadow-md"
                  : "text-slate-700 hover:bg-primary-50 hover:text-primary-600 hover:shadow-sm"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HeaderNavigation;
