import { Heart, BookOpen, Award, Users } from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface Service {
  path: string;
  title: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  hoverColor: string;
}

export const services: Service[] = [
  {
    path: "/therapy",
    title: "כלבנות טיפולית",
    icon: Heart,
    color: "from-red-400 to-pink-500",
    bgColor: "from-red-50 to-pink-50",
    hoverColor: "hover:shadow-red-200/50",
  },
  {
    path: "/training",
    title: "אילוף כלבים",
    icon: BookOpen,
    color: "from-primary-500 to-primary-600",
    bgColor: "from-primary-50 to-primary-100/50",
    hoverColor: "hover:shadow-primary-200/50",
  },
  {
    path: "/coaching",
    title: "אימון אישי",
    icon: Award,
    color: "from-accent-500 to-orange-500",
    bgColor: "from-accent-50 to-orange-50",
    hoverColor: "hover:shadow-accent-200/50",
  },
  {
    path: "/schools",
    title: "תכנית גפן",
    icon: Users,
    color: "from-purple-500 to-indigo-500",
    bgColor: "from-purple-50 to-indigo-50",
    hoverColor: "hover:shadow-purple-200/50",
  },
];
