import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "../../../ui/card";
import type { ProcessStepsProps } from "../../../../types/method";

/* ───────────────────────── Main component ───────────────────────── */

const ProcessSteps = ({ config: stepConfig }: ProcessStepsProps) => {
  /* track highest-index step that has become visible */
  const [maxVisibleIdx, setMaxVisibleIdx] = useState(-1);
  const handleVisible = useCallback(
    (idx: number) => setMaxVisibleIdx((p) => (idx > p ? idx : p)),
    []
  );

  /* % progress for timelines */
  const progress = (maxVisibleIdx + 1) / stepConfig.steps.length;
  const progressPercent = `${progress * 100}%`;

  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* ── HEADER ─────────────────────────────────── */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="md:text-4xl text-2xl font-bold text-slate-800 mb-6">
          {stepConfig.title}
        </h3>
        <div className="w-16 md:w-20 h-1 bg-primary-500 rounded-full mx-auto" />
      </motion.div>

      {/* ── DESKTOP (ORIGINAL DESIGN) ────────────────────────────────── */}
      <div className="hidden lg:block relative max-w-6xl mx-auto px-10">
        {/* centre timeline */}
        <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-1 bg-slate-200">
          <motion.div
            className="w-full bg-primary-500 origin-top"
            style={{ height: progressPercent }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* alternating steps */}
        <div className="space-y-24 relative z-10">
          {stepConfig.steps.map((step, i) => (
            <StepDesktop
              key={i}
              step={step}
              index={i}
              isEven={i % 2 === 0}
              onVisible={handleVisible}
              active={i <= maxVisibleIdx}
            />
          ))}
        </div>
      </div>

      {/* ── MOBILE (Now matches desktop layout but smaller) ─────────────────────────────────── */}
      <div className="lg:hidden relative max-w-4xl mx-auto px-4">
        {/* center timeline */}
        <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-slate-200">
          <motion.div
            className="w-full bg-primary-500 origin-top"
            style={{ height: progressPercent }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* alternating steps (smaller scale) */}
        <div className="space-y-16 relative z-10">
          {stepConfig.steps.map((step, i) => (
            <StepMobile
              key={i}
              step={step}
              index={i}
              isEven={i % 2 === 0}
              onVisible={handleVisible}
              active={i <= maxVisibleIdx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────── Desktop step (ORIGINAL) ───────────────────────── */

const StepDesktop = ({
  step,
  index,
  isEven,
  onVisible,
  active,
}: {
  step: { step: string; title: string; desc: string };
  index: number;
  isEven: boolean;
  onVisible: (i: number) => void;
  active: boolean;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  /* notify parent once */
  useEffect(() => {
    if (inView) onVisible(index);
  }, [inView, index, onVisible]);

  return (
    <motion.div
      ref={ref}
      className={`flex items-center gap-16 ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* content */}
      <Card className="flex-1 max-w-md shadow-xl transition bg-primary-200/20 border-2 border-primary-200">
        <CardContent className="p-6">
          <h4 className="text-xl font-bold mb-3 transition-colors text-slate-800">
            {step.title}
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
        </CardContent>
      </Card>

      {/* circle */}
      <StepCircle num={step.step} active={active} />

      {/* empty side for balance */}
      <div className="flex-1 max-w-md" />
    </motion.div>
  );
};

/* ───────────────────────── Mobile step (desktop layout, smaller scale) ───────────────────────── */

const StepMobile = ({
  step,
  index,
  isEven,
  onVisible,
  active,
}: {
  step: { step: string; title: string; desc: string };
  index: number;
  isEven: boolean;
  onVisible: (i: number) => void;
  active: boolean;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  useEffect(() => {
    if (inView) onVisible(index);
  }, [inView, index, onVisible]);

  return (
    <motion.div
      ref={ref}
      className={`flex items-center gap-8 ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* content */}
      <Card className="flex-1 max-w-xs shadow-xl transition bg-primary-200/20 border-2 border-primary-200">
        <CardContent className="p-3">
          <h4 className="text-m font-bold mb-3 transition-colors text-slate-800">
            {step.title}
          </h4>
          <p className="text-slate-600 text-xs">{step.desc}</p>
        </CardContent>
      </Card>

      {/* circle */}
      <StepCircle num={step.step} active={active} />

      {/* empty side for balance */}
      <div className="flex-1 max-w-xs" />
    </motion.div>
  );
};

/* ───────────────────────── Shared StepCircle ───────────────────────── */

const StepCircle = ({ num, active }: { num: string; active: boolean }) => (
  <div className="relative flex-shrink-0">
    <motion.div
      className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
        active
          ? "bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-2xl shadow-primary-500/50"
          : "bg-white text-slate-500 border-4 border-slate-200 shadow-lg"
      }`}
      initial={false}
      animate={{
        scale: active ? 1.1 : 1,
        boxShadow: active
          ? "0 25px 50px -12px rgba(59, 130, 246, 0.5)"
          : "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {num}
    </motion.div>

    {/* Perfect Pulse Animation */}
    {active && (
      <>
        {/* Pulse ring #1 */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary-400/20 border-2 border-primary-400/40"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
            repeatDelay: 0.4,
          }}
        />

        {/* Pulse ring #2 */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary-300/15 border-2 border-primary-300/30"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
            repeatDelay: 0.4,
            delay: 0.9,
          }}
        />
      </>
    )}
  </div>
);

export default ProcessSteps;
