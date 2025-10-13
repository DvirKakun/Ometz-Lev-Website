import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Step {
  step: string;
  title: string;
  desc: string;
}

interface MobileTimelineProps {
  steps: Step[];
  animationStep: number;
}

const MobileTimeline = ({ steps, animationStep }: MobileTimelineProps) => {
  const stepCount = steps.length;
  const [isIPhone, setIsIPhone] = useState(false);

  useEffect(() => {
    // Detect iPhone (includes iPhone Safari and Chrome on iPhone)
    setIsIPhone(/iPhone/.test(navigator.userAgent));
  }, []);

  const stepPositions = steps.map((_, index) => ({
    x: 200,
    y: 80 + index * (600 / (stepCount - 1)), // Increased from 500 to 600 for more spacing
  }));

  return (
    <div className="lg:hidden max-w-sm mx-auto px-4">
      <div className="relative">
        <svg
          viewBox="0 -50 400 800"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Dog Paw Steps Animation - Mobile Vertical */}
          {steps.map((_, segmentIndex) => {
            if (segmentIndex === steps.length - 1) return null;

            const currentSquare = stepPositions[segmentIndex];
            const nextSquare = stepPositions[segmentIndex + 1];
            const squareRadius = 60; // Half of mobile square size

            // Connect from bottom edge of current square to top edge of next square
            const startY = currentSquare.y + squareRadius; // Bottom edge of current square
            const endY = nextSquare.y - squareRadius; // Top edge of next square
            const x = currentSquare.x; // Same X level

            // Create 4 paws between squares
            const paws = [];
            for (let i = 0; i < 4; i++) {
              const y = startY + ((endY - startY) / 5) * (i + 1) + 25; // Move down by 15px
              const pawX = x + (i % 2 === 0 ? 40 : 10); // More centered - reduced from ±8 to ±4
              paws.push({ x: pawX, y, index: i });
            }

            return paws.map((paw, pawIndex) => {
              const pawAnimationStep = segmentIndex * 7 + pawIndex + 4; // Same timing as desktop
              const isVisible = animationStep >= pawAnimationStep;

              return (
                <motion.g
                  key={`${segmentIndex}-${pawIndex}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isVisible
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 0.2,
                    ease: "backOut",
                    delay: isVisible ? pawIndex * 0.05 : 0,
                  }}
                  style={{ transformOrigin: `${paw.x}px ${paw.y}px` }}
                >
                  {/* Dog paw SVG - rotated for vertical movement */}
                  <g
                    transform={`translate(${paw.x - 12}, ${
                      paw.y - 12
                    }) scale(0.5) rotate(180)`}
                  >
                    <path
                      fill="#da9a52"
                      d="M39.041,36.843c2.054,3.234,3.022,4.951,3.022,6.742c0,3.537-2.627,5.252-6.166,5.252
                        c-1.56,0-2.567-0.002-5.112-1.326c0,0-1.649-1.509-5.508-1.354c-3.895-0.154-5.545,1.373-5.545,1.373
                        c-2.545,1.323-3.516,1.309-5.074,1.309c-3.539,0-6.168-1.713-6.168-5.252c0-1.791,0.971-3.506,3.024-6.742
                        c0,0,3.881-6.445,7.244-9.477c2.43-2.188,5.973-2.18,5.973-2.18h1.093v-0.001c0,0,3.698-0.009,5.976,2.181
                        C35.059,30.51,39.041,36.844,39.041,36.843z M16.631,20.878c3.7,0,6.699-4.674,6.699-10.439S20.331,0,16.631,0
                        S9.932,4.674,9.932,10.439S12.931,20.878,16.631,20.878z M10.211,30.988c2.727-1.259,3.349-5.723,1.388-9.971
                        s-5.761-6.672-8.488-5.414s-3.348,5.723-1.388,9.971C3.684,29.822,7.484,32.245,10.211,30.988z M32.206,20.878
                        c3.7,0,6.7-4.674,6.7-10.439S35.906,0,32.206,0s-6.699,4.674-6.699,10.439C25.507,16.204,28.506,20.878,32.206,20.878z
                        M45.727,15.602c-2.728-1.259-6.527,1.165-8.488,5.414s-1.339,8.713,1.389,9.972c2.728,1.258,6.527-1.166,8.488-5.414
                        S48.455,16.861,45.727,15.602z"
                    />
                  </g>
                </motion.g>
              );
            });
          })}

          {/* Step squares with content */}
          {steps.map((step, index) => {
            const pos = stepPositions[index];
            const isActive = animationStep >= index * 7 + 1; // Same timing as desktop
            const squareSize = 135;

            return (
              <motion.g
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.5,
                  ease: "backOut",
                  delay: isActive ? index * 0.2 : 0,
                }}
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

                {/* Circle with step number - filled with primary color */}
                <circle
                  cx={pos.x + squareSize / 2}
                  cy={pos.y - squareSize / 2}
                  r="16"
                  fill={isActive ? "#da9a52" : "#64748b"}
                />

                <text
                  x={pos.x + squareSize / 2}
                  y={pos.y - squareSize / 2 + 4}
                  textAnchor="middle"
                  className="text-xs font-bold fill-white"
                  opacity={isActive ? 1 : 0.8}
                >
                  {step.step}
                </text>

                {/* Title - centered at top of square */}
                <text
                  x={pos.x}
                  y={pos.y - squareSize / 2 + 25}
                  textAnchor="middle"
                  className="text-lg font-bold"
                  fill={isActive ? "#1e293b" : "#64748b"}
                  opacity={isActive ? 1 : 0.7}
                >
                  {step.title}
                </text>

                {/* Description */}
                {(() => {
                  const words = step.desc.split(" ");
                  const lines = [];
                  let currentLine = "";
                  const maxWordsPerLine = 3; // Max 3 words per line

                  for (let i = 0; i < words.length; i++) {
                    const testLine =
                      currentLine + (currentLine ? " " : "") + words[i];

                    // Check if we've reached max words or if adding this word would be too long
                    if (
                      currentLine.split(" ").length >= maxWordsPerLine ||
                      testLine.length > 25
                    ) {
                      if (currentLine) {
                        lines.push(currentLine);
                        currentLine = words[i];
                      } else {
                        lines.push(words[i]);
                      }
                    } else {
                      currentLine = testLine;
                    }
                  }

                  if (currentLine) {
                    lines.push(currentLine);
                  }

                  // iPhone fix: Use separate text elements instead of tspan
                  if (isIPhone) {
                    return lines.map((line: string, lineIndex: number) => (
                      <text
                        key={lineIndex}
                        x={pos.x}
                        y={pos.y - 10 + lineIndex * 14}
                        textAnchor="middle"
                        className="text-sm"
                        fill="#64748b"
                        opacity={isActive ? 1 : 0.6}
                        direction="rtl"
                      >
                        {line}
                      </text>
                    ));
                  }

                  // Standard approach for other devices
                  return (
                    <text
                      x={pos.x}
                      y={pos.y - 10}
                      textAnchor="middle"
                      className="text-sm"
                      fill="#64748b"
                      opacity={isActive ? 1 : 0.6}
                    >
                      {lines.map((line: string, lineIndex: number) => (
                        <tspan
                          key={lineIndex}
                          x={pos.x}
                          dy={lineIndex === 0 ? 0 : 14}
                        >
                          {line}
                        </tspan>
                      ))}
                    </text>
                  );
                })()}
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default MobileTimeline;
