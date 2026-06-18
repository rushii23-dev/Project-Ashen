import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { STEPS_DATA, calculateShadow } from '../utils/calculateShadow';
import type { Choice } from '../utils/calculateShadow';
import { AUTO_ADVANCE_DELAY_MS } from '../utils/constants';
import ScrollTextReveal from './ScrollTextReveal';

// --- Animated Counter Component ---

interface CounterProps {
  /** The starting value of the animated counter. */
  from: number;
  /** The target value the counter animates towards. */
  to: number;
}

function Counter({ from, to }: CounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => latest.toFixed(1));

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.5,
    });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
}

export default React.memo(function CarbonCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState<{ [key: number]: Choice }>({});

  // Tracks the pending auto-advance timer so it can always be cancelled,
  // preventing a step change from firing after unmount or a reset.
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending auto-advance timer when the component unmounts.
  useEffect(
    () => () => {
      if (advanceTimer.current !== null) clearTimeout(advanceTimer.current);
    },
    [],
  );

  /**
   * Handles user selection for a given step and auto-advances.
   */
  const handleSelect = useCallback(
    (choice: Choice) => {
      setSelections((prev) => ({ ...prev, [currentStep]: choice }));

      // Auto-advance after a very short delay for friction-less interaction.
      // Any previously scheduled advance is cancelled first to avoid double-steps.
      if (advanceTimer.current !== null) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => {
        advanceTimer.current = null;
        setCurrentStep((prev) => prev + 1);
      }, AUTO_ADVANCE_DELAY_MS);
    },
    [currentStep],
  );

  /**
   * Resets the calculator back to the first step.
   */
  const handleRecalculate = useCallback(() => {
    if (advanceTimer.current !== null) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    setSelections({});
    setCurrentStep(1);
  }, []);

  // Memoised calculation — only recomputes when selections actually change
  const { totalTons, treesNeeded } = useMemo(() => calculateShadow(selections), [selections]);

  // Memoised current step data lookup
  const currentStepData = useMemo(
    () => STEPS_DATA.find((s) => s.stepIndex === currentStep),
    [currentStep],
  );

  const treeElements = useMemo(
    () =>
      Array.from({ length: treesNeeded }).map((_, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { scaleY: 0, opacity: 0 },
            visible: {
              scaleY: 1,
              opacity: 1,
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="w-[3px] h-[16px] bg-white rounded-full opacity-60"
          style={{ transformOrigin: 'bottom' }}
        />
      )),
    [treesNeeded],
  );

  return (
    <section
      id="carbon-calculator"
      className="w-full min-h-[80vh] bg-[#000000] flex flex-col items-center py-[128px] px-6 relative overflow-hidden"
    >
      <div className="w-full max-w-[1000px] mx-auto relative flex flex-col justify-center min-h-[400px]">
        <AnimatePresence mode="wait">
          {currentStep <= 3 && currentStepData ? (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col w-full"
            >
              {/* Premium Calculator Header */}
              <div className="flex flex-col mb-16">
                <ScrollTextReveal
                  as="h2"
                  text="CONSEQUENCE."
                  className="font-serif font-medium text-[54px] sm:text-[80px] lg:text-[110px] uppercase tracking-[0.02em] text-white leading-[1.0] mb-4"
                />
                <ScrollTextReveal
                  as="p"
                  text="Every single click, meal, and mile leaves a permanent mark on the planet. Uncover your actual mathematical damage."
                  className="text-[#999999] text-[16px] md:text-[18px] max-w-[600px] font-light leading-relaxed mb-12"
                />
              </div>

              {/* Question / Step Header */}
              <div className="flex flex-col gap-4 mb-12">
                <span className="font-sans font-light text-[#999999] tracking-[0.1em] text-[12px] uppercase">
                  Step 0{currentStep} — Matrix
                </span>
                <ScrollTextReveal
                  key={`text-${currentStep}`}
                  as="h3"
                  text={currentStepData.question}
                  className="font-serif text-[32px] md:text-[48px] text-white leading-[1.1] max-w-[800px]"
                />
              </div>

              {/* Choices Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {currentStepData.choices.map((choice, i) => {
                  const isSelected = selections[currentStep]?.label === choice.label;
                  return (
                    <motion.button
                      key={choice.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: 'easeInOut' }}
                      type="button"
                      onClick={() => handleSelect(choice)}
                      aria-pressed={isSelected}
                      className={`
                        w-full h-full rounded-[10px] bg-[#202020] border p-6 cursor-pointer text-left flex flex-col justify-end items-start min-h-[120px]
                        transition-colors duration-300 group
                        ${
                          isSelected
                            ? 'border-white bg-white text-black'
                            : 'border-[#333333] hover:bg-white hover:text-black hover:border-white text-white'
                        }
                      `}
                    >
                      <span
                        className={`font-sans text-[18px] font-medium leading-[1.4] transition-colors duration-300 ${isSelected ? 'text-black' : 'text-white group-hover:text-black'}`}
                      >
                        {choice.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Result Payoff Screen */
            <motion.div
              key="result-payoff"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center min-h-[400px]"
              aria-live="polite"
              aria-atomic="true"
            >
              {/* The Heavy Metric */}
              <h2 className="font-serif text-[96px] md:text-[140px] text-white leading-none tracking-tighter">
                <Counter from={0} to={totalTons} /> TONS
              </h2>
              <span className="font-sans tracking-widest uppercase text-[#999999] text-[12px] mt-4 block">
                Your annual carbon exhaust.
              </span>

              {/* The Forest Grid (The Visualization) */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.015, delayChildren: 1.0 } },
                }}
                className="flex flex-wrap gap-2 max-w-[700px] mt-16 justify-center min-h-[100px]"
              >
                {treeElements}
              </motion.div>

              {/* The Resolution Text */}
              <div className="mt-12 flex flex-col items-center">
                <ScrollTextReveal
                  as="p"
                  text={`It will take exactly ${treesNeeded} adult trees a full decade of growth to neutralize this shadow entirely.`}
                  className="font-sans text-[20px] text-[#c0c0c0] text-center max-w-[700px] leading-[1.6]"
                />

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  type="button"
                  onClick={handleRecalculate}
                  aria-label="Recalculate your carbon footprint"
                  className="mt-12 rounded-full border border-white/30 px-8 py-3 text-[14px] font-sans text-white hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Recalculate
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});
