import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { levels, getVideosByLevel } from "../../../data/videos";
import { Button } from "../../ui/button";

interface LevelFilterProps {
  selectedLevel: string;
  onLevelChange: (levelId: string) => void;
}

const LevelFilter = ({ selectedLevel, onLevelChange }: LevelFilterProps) => {
  const getLevelColorClasses = (color: string) => {
    const colorMap = {
      slate: "bg-slate-500 text-white",
      green: "bg-green-500 text-white",
      yellow: "bg-yellow-500 text-white",
      red: "bg-red-500 text-white",
      purple: "bg-purple-500 text-white",
    };
    return (
      colorMap[color as keyof typeof colorMap] || "bg-slate-500 text-white"
    );
  };

  return (
    <section className="py-8 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-6">
            <Filter className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              סינון לפי רמה
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {levels.map((level) => (
              <Button
                key={level.id}
                onClick={() => onLevelChange(level.id)}
                variant={selectedLevel === level.id ? "default" : "outline"}
                className={`${
                  selectedLevel === level.id
                    ? getLevelColorClasses(level.color)
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {level.name}
                <span className="mr-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {getVideosByLevel(level.id).length}
                </span>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LevelFilter;
