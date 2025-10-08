import { motion } from "framer-motion";

interface Step {
  step: string;
  title: string;
  desc: string;
}

interface DesktopTimelineProps {
  steps: Step[];
  animationStep: number;
}

const DesktopTimeline = ({ steps, animationStep }: DesktopTimelineProps) => {
  const stepCount = steps.length;
  const stepPositions = steps.map((_, index) => ({
    x: 930 - index * (850 / (stepCount - 1)),
    y: 150,
  }));

  const generatePath = () => {
    if (stepPositions.length === 0) return "";

    let path = `M${stepPositions[0].x},${stepPositions[0].y}`;

    for (let i = 1; i < stepPositions.length; i++) {
      const prev = stepPositions[i - 1];
      const curr = stepPositions[i];
      const midX = (prev.x + curr.x) / 2;

      if (i % 2 === 1) {
        path += ` Q${midX},${prev.y - 120} ${curr.x},${curr.y}`;
      } else {
        path += ` Q${midX},${prev.y + 120} ${curr.x},${curr.y}`;
      }
    }

    return path;
  };

  const pathData = generatePath();

  return (
    <div className="hidden lg:block max-w-7xl mx-auto">
      <div className="relative h-64">
        {/* SVG Timeline Layer with the PERFECT connector logic */}
        <svg
          viewBox="0 0 1000 320"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background path (always visible, subtle) */}
          <motion.path
            d={pathData}
            stroke="#e2e8f0"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.3}
          />

          {/* Animated path segments - the PERFECT logic */}
          {steps.map((_, index) => {
            if (index === steps.length - 1) return null;

            const start = stepPositions[index];
            const end = stepPositions[index + 1];
            const midX = (start.x + end.x) / 2;

            const segmentPath =
              index % 2 === 0
                ? `M${start.x},${start.y} Q${midX},${start.y - 120} ${end.x},${
                    end.y
                  }`
                : `M${start.x},${start.y} Q${midX},${start.y + 120} ${end.x},${
                    end.y
                  }`;

            return (
              <motion.path
                key={index}
                d={segmentPath}
                stroke="#da9a52"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: animationStep >= (index + 1) * 2 ? 1 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(218, 154, 82, 0.3))",
                }}
              />
            );
          })}

          {/* Step squares with content */}
          {steps.map((step, index) => {
            const pos = stepPositions[index];
            const isActive = animationStep >= index * 2 + 1;
            const squareSize = 210;

            return (
              <motion.g
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isActive
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.9, opacity: 1 }
                }
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              >
                {/* Square */}
                <rect
                  x={pos.x - squareSize / 2}
                  y={pos.y - squareSize / 2}
                  width={squareSize}
                  height={squareSize}
                  rx="12"
                  fill="white"
                  stroke={isActive ? "#da9a52" : "#e2e8f0"}
                  strokeWidth="3"
                  style={{
                    filter: isActive
                      ? "drop-shadow(0 4px 12px rgba(218, 154, 82, 0.4))"
                      : "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.1))",
                  }}
                />

                {/* Circle with step number */}
                <circle
                  cx={pos.x + squareSize / 2}
                  cy={pos.y - squareSize / 2}
                  r="24"
                  fill={isActive ? "#da9a52" : "#64748b"}
                />

                <text
                  x={pos.x + squareSize / 2}
                  y={pos.y - squareSize / 2 + 4}
                  textAnchor="middle"
                  className="text-base font-bold fill-white"
                  opacity={isActive ? 1 : 0.8}
                >
                  {step.step}
                </text>

                {/* Title */}
                <text
                  x={pos.x}
                  y={pos.y - 20}
                  textAnchor="middle"
                  className="text-xl font-bold"
                  fill={isActive ? "#1e293b" : "#64748b"}
                  opacity={isActive ? 1 : 0.7}
                >
                  {step.title}
                </text>

                {/* Description */}
                <text
                  x={pos.x}
                  y={pos.y + 10}
                  textAnchor="middle"
                  className="text-base"
                  fill="#64748b"
                  opacity={isActive ? 1 : 0.6}
                >
                  {step.desc
                    .split(" ")
                    .reduce((lines: string[], word: string, index: number) => {
                      const lineIndex = Math.floor(index / 3);
                      if (!lines[lineIndex]) lines[lineIndex] = "";
                      lines[lineIndex] += (lines[lineIndex] ? " " : "") + word;
                      return lines;
                    }, [])
                    .map((line: string, lineIndex: number) => (
                      <tspan
                        key={lineIndex}
                        x={pos.x}
                        dy={lineIndex === 0 ? 0 : 16}
                      >
                        {line}
                      </tspan>
                    ))}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default DesktopTimeline;
