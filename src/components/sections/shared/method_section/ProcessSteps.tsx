import type { ProcessStepsProps } from "../../../../types/method";
import PreciseTimeline from "./PreciseTimeline";

const ProcessSteps = ({ config: stepConfig }: ProcessStepsProps) => {
  return <PreciseTimeline config={stepConfig} />;
};

export default ProcessSteps;
