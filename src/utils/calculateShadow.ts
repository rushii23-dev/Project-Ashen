export interface Choice {
  label: string;
  value: number;
}

export interface StepData {
  stepIndex: number;
  question: string;
  choices: Choice[];
}

// Deeply frozen to prevent client-side mutation of multiplier values
export const STEPS_DATA: StepData[] = Object.freeze([
  Object.freeze({
    stepIndex: 1,
    question: "How do you usually travel every day?",
    choices: Object.freeze([
      Object.freeze({ label: "Walk or Bicycle", value: 0.1 }),
      Object.freeze({ label: "Bus or Train", value: 1.2 }),
      Object.freeze({ label: "Personal Car or Bike", value: 3.5 })
    ]) as Choice[]
  }),
  Object.freeze({
    stepIndex: 2,
    question: "What does your daily food look like?",
    choices: Object.freeze([
      Object.freeze({ label: "Mostly Plants & Veggies", value: 1.5 }),
      Object.freeze({ label: "Mix of Meat & Veggies", value: 2.5 }),
      Object.freeze({ label: "Meat Every Day", value: 3.3 })
    ]) as Choice[]
  }),
  Object.freeze({
    stepIndex: 3,
    question: "How often do you buy new clothes or gadgets?",
    choices: Object.freeze([
      Object.freeze({ label: "Rarely. I use things until they break.", value: 0.5 }),
      Object.freeze({ label: "Sometimes. A few times a year.", value: 1.5 }),
      Object.freeze({ label: "Often. I like buying new trends.", value: 3.2 })
    ]) as Choice[]
  })
]) as StepData[];

export interface CalculatorResult {
  totalTons: number;
  treesNeeded: number;
}

export function calculateShadow(selections: { [key: number]: Choice }): CalculatorResult {
  const baseFootprint = 2.0;
  const totalTons = baseFootprint 
    + (selections[1]?.value || 0) 
    + (selections[2]?.value || 0) 
    + (selections[3]?.value || 0);

  const treesNeeded = Math.ceil(totalTons / 0.021);
  
  return { totalTons, treesNeeded };
}
