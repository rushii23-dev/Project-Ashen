import { BASE_FOOTPRINT_TONS, CO2_ABSORPTION_PER_TREE_TONS } from './constants';

export interface Choice {
  label: string;
  value: number;
}

export interface StepData {
  stepIndex: number;
  question: string;
  choices: readonly Choice[];
}

/** All calculator step definitions — deeply frozen to prevent runtime mutation. */
export const STEPS_DATA: readonly StepData[] = Object.freeze([
  Object.freeze({
    stepIndex: 1,
    question: "How do you usually travel every day?",
    choices: Object.freeze([
      Object.freeze({ label: "Walk or Bicycle", value: 0.1 }),
      Object.freeze({ label: "Bus or Train", value: 1.2 }),
      Object.freeze({ label: "Personal Car or Bike", value: 3.5 }),
    ]) as readonly Choice[],
  }),
  Object.freeze({
    stepIndex: 2,
    question: "What does your daily food look like?",
    choices: Object.freeze([
      Object.freeze({ label: "Mostly Plants & Veggies", value: 1.5 }),
      Object.freeze({ label: "Mix of Meat & Veggies", value: 2.5 }),
      Object.freeze({ label: "Meat Every Day", value: 3.3 }),
    ]) as readonly Choice[],
  }),
  Object.freeze({
    stepIndex: 3,
    question: "How often do you buy new clothes or gadgets?",
    choices: Object.freeze([
      Object.freeze({ label: "Rarely. I use things until they break.", value: 0.5 }),
      Object.freeze({ label: "Sometimes. A few times a year.", value: 1.5 }),
      Object.freeze({ label: "Often. I like buying new trends.", value: 3.2 }),
    ]) as readonly Choice[],
  }),
]) as readonly StepData[];

export interface CalculatorResult {
  totalTons: number;
  treesNeeded: number;
}

/**
 * Safely extracts and validates the numeric value from a selection.
 * Returns 0 for missing or non-finite values to prevent NaN propagation.
 */
function safeValue(choice: Choice | undefined): number {
  if (!choice) return 0;
  return Number.isFinite(choice.value) ? choice.value : 0;
}

/**
 * Calculates the user's annual carbon footprint and the number of
 * mature trees required to offset it over a decade.
 */
export function calculateShadow(selections: { [key: number]: Choice }): CalculatorResult {
  const totalTons =
    BASE_FOOTPRINT_TONS +
    safeValue(selections[1]) +
    safeValue(selections[2]) +
    safeValue(selections[3]);

  const treesNeeded = Math.ceil(totalTons / CO2_ABSORPTION_PER_TREE_TONS);

  return { totalTons, treesNeeded };
}
