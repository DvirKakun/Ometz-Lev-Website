import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Award,
  BookOpen,
  Users,
  Home,
  Database,
  ChevronDown,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import type { HeaderNavigationProps } from "../../../types/headers";
import type { NavItem } from "../../../types/navigation_item";
import { useState } from "react";

export default function HeaderNavigation({
  isMobile = false,
  onItemClick,
}: HeaderNavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  /* ---------- 1. absolute paths ---------- */
  const items: NavItem[] = [
    { to: "/home", label: "דף הבית", icon: Home },
    { to: "/therapy", label: "כלבנות טיפולית", icon: Heart },
    { to: "/training", label: "אילוף כלבים", icon: BookOpen },
    { to: "/activities", label: "פעילויות", icon: Award },
    { to: "/schools", label: "תכנית גפן", icon: Users },
    {
      label: "מאגרי מידע",
      icon: Database,
      submenu: [
        { to: "/therapy-videos-library", label: "סרטוני טיפול" },
        { to: "/therapy-articles-library", label: "מאמרי טיפול" },
        { to: "/training-videos-library", label: "סרטוני אילוף" },
        { to: "/training-articles-library", label: "מאמרי אילוף" },
        { to: "/products", label: "מוצרים" },
      ],
    },
  ];

  /* ---------- MOBILE LIST ---------- */
  if (isMobile) {
    return (
      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={item.to || item.label}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.06, duration: 0.25 }}
          >
            {item.submenu ? (
              <div>
                <button
                  onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                  className="flex items-center justify-between space-x-4 space-x-reverse px-5 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 w-full text-slate-700 hover:bg-primary-50 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      openDropdown === i ? "rotate-180" : ""
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 mr-9 space-y-1">
                        {item.submenu.map((subItem) => (
                          <NavLink
                            key={subItem.to}
                            to={subItem.to}
                            onClick={onItemClick}
                            className={({ isActive }) =>
                              cn(
                                "block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                                isActive
                                  ? "bg-primary-100 text-primary-700"
                                  : "text-slate-600 hover:bg-primary-50 hover:text-primary-600"
                              )
                            }
                          >
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                to={item.to!}
                end={item.to === "/home"}
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
            )}
          </motion.div>
        ))}
      </div>
    );
  }

  /* ---------- DESKTOP ROW ---------- */
  return (
    <div className="hidden xl:flex items-center space-x-2 space-x-reverse ml-4">
      {items.map((item, i) => (
        <motion.div
          key={item.to || item.label}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {item.submenu ? (
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown(i)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={cn(
                  "flex items-center space-x-2 space-x-reverse px-2.5 py-2 rounded-lg font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                  "text-slate-700 hover:text-primary-600 focus-visible:bg-primary-50 focus-visible:text-primary-600"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="whitespace-nowrap">{item.label}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              <AnimatePresence>
                {openDropdown === i && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50"
                  >
                    {item.submenu.map((subItem) => (
                      <NavLink
                        key={subItem.to}
                        to={subItem.to}
                        className={({ isActive }) =>
                          cn(
                            "block px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:text-primary-600 focus-visible:outline-none focus-visible:bg-primary-50 focus-visible:text-primary-600",
                            isActive
                              ? "bg-primary-100 text-primary-700"
                              : "text-slate-700"
                          )
                        }
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLink
              to={item.to!}
              end={item.to === "/home"}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-2 space-x-reverse px-2.5 py-2 rounded-lg font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                  isActive
                    ? "bg-primary-100 text-primary-700 shadow-md"
                    : "text-slate-700  hover:text-primary-600 focus-visible:bg-primary-50 focus-visible:text-primary-600"
                )
              }
            >
              <item.icon className="w-4 h-4" />
              <span className="whitespace-nowrap">{item.label}</span>
            </NavLink>
          )}
        </motion.div>
      ))}
    </div>
  );
}
