import { describe, it, expect } from 'vitest';
import { calculateShadow } from './calculateShadow';
import type { Choice } from './calculateShadow';

describe('calculateShadow', () => {
  it('calculates the exact trees needed for a given set of choices', () => {
    // Math: base 2.0 + 3.5 + 3.3 + 3.2 = 12.0 tons
    // Trees: 12.0 / 0.021 = 571.42 => ceil => 572
    const selections: { [key: number]: Choice } = {
      1: { label: 'Personal Car or Bike', value: 3.5 },
      2: { label: 'Meat Every Day', value: 3.3 },
      3: { label: 'Often. I like buying new trends.', value: 3.2 }
    };

    const result = calculateShadow(selections);
    
    expect(result.totalTons).toBeCloseTo(12.0);
    expect(result.treesNeeded).toBe(572);
  });

  it('calculates accurately with the lowest footprints', () => {
    // Math: base 2.0 + 0.1 + 1.5 + 0.5 = 4.1 tons
    // Trees: 4.1 / 0.021 = 195.23 => ceil => 196
    const selections: { [key: number]: Choice } = {
      1: { label: 'Walk or Bicycle', value: 0.1 },
      2: { label: 'Mostly Plants & Veggies', value: 1.5 },
      3: { label: 'Rarely. I use things until they break.', value: 0.5 }
    };

    const result = calculateShadow(selections);
    
    expect(result.totalTons).toBeCloseTo(4.1);
    expect(result.treesNeeded).toBe(196);
  });
});
