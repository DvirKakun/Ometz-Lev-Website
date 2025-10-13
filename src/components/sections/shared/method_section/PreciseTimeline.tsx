import { useEffect, useState } from "react";
import type { ProcessStepsProps } from "../../../../types/method";
import useAnimateOnScroll from "../../../../hooks/useAnimateOnScroll";
import TimelineHeader from "./TimelineHeader";
import DesktopTimeline from "./DesktopTimeline";
import MobileTimeline from "./MobileTimeline";

const PreciseTimeline = ({ config: stepConfig }: ProcessStepsProps) => {
  const [timelineRef, startAnimation] = useAnimateOnScroll();
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (!startAnimation || animationStep >= stepConfig.steps.length * 7 - 6)
      return;

    const delay = animationStep % 2 === 0 ? 150 : 250; // 0.15s for step, 0.25s for line
    const timer = setTimeout(() => {
      setAnimationStep((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [startAnimation, animationStep, stepConfig.steps.length]);

  return (
    <section
      className="relative w-full pt-16 overflow-hidden"
      ref={timelineRef}
    >
      <TimelineHeader title={stepConfig.title} />

      <DesktopTimeline steps={stepConfig.steps} animationStep={animationStep} />

      <MobileTimeline steps={stepConfig.steps} animationStep={animationStep} />
    </section>
  );
};

export default PreciseTimeline;
