/**
 * ScrollTextReveal — the single, canonical text-reveal animation component.
 *
 * Previously duplicated across InternalSections, CarbonCalculator,
 * BreakdownSection, VoicesEvidence, and Page3Architecture.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { textContainerVariant, textChildVariant } from '../utils/animationVariants';

export interface ScrollTextRevealProps {
  /** The text to reveal — supports `\n` for line-breaks. */
  text: string;
  /** Optional className for the root container element. */
  className?: string;
  /**
   * The HTML element to render as the root container.
   * Must be a valid framer-motion element key (e.g. `"h2"`, `"p"`, `"span"`).
   * @default "div"
   */
  as?: keyof typeof motion | string;
  /**
   * Per-word className overrides, indexed by the word's global position
   * across all lines (e.g. for italicising a specific word).
   */
  wordsClassName?: string[];
  /**
   * When `true`, the reveal animation only fires once.
   * @default false
   */
  once?: boolean;
}

export default React.memo(function ScrollTextReveal({
  text,
  className,
  as = "div",
  wordsClassName = [],
  once = false,
}: ScrollTextRevealProps) {
  const lines = text.split("\n");
  const MotionComponent = motion[as as keyof typeof motion] as React.ElementType;

  let wordIndexCounter = 0;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      variants={textContainerVariant}
      className={className}
    >
      {lines.map((line, lineIndex) => {
        const words = line.trim().split(/\s+/);
        return (
          <React.Fragment key={lineIndex}>
            {words.map((word, i) => {
              if (!word) return null;
              const currentIndex = wordIndexCounter++;
              return (
                <motion.span
                  key={i}
                  variants={textChildVariant}
                  className={`inline-block mr-[0.25em] ${wordsClassName[currentIndex] ?? ""}`}
                >
                  {word}
                </motion.span>
              );
            })}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </MotionComponent>
  );
});
