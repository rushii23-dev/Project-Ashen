/**
 * Shared Framer Motion animation variants used across multiple components.
 * Centralised here to enforce DRY and ensure a consistent kinetic aesthetic.
 */
import type { Variants } from 'framer-motion';

/** Easing curve used throughout the Ashen design language. */
export const ASHEN_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Parent variant that staggers the reveal of child word-spans.
 * Apply to the container element wrapping `textChildVariant` spans.
 */
export const textContainerVariant: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

/**
 * Child variant for individual word-spans.
 * Fades in from a blurred state using the Ashen easing curve.
 */
export const textChildVariant: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.4, ease: ASHEN_EASE as unknown as [number, number, number, number] },
  },
};
