import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CarbonCalculator from './CarbonCalculator';
import { describe, it, expect } from 'vitest';

describe('CarbonCalculator Component', () => {
  it('renders the first step correctly', () => {
    render(<CarbonCalculator />);
    expect(screen.getByText('CONSEQUENCE.')).toBeInTheDocument();
    expect(screen.getByText('Step 01 — Matrix')).toBeInTheDocument();
  });

  it('progresses to the next step when an option is selected', async () => {
    render(<CarbonCalculator />);
    
    // Select first choice
    const walkButton = screen.getAllByText('Walk or Bicycle')[0];
    fireEvent.click(walkButton);
    
    // Should proceed to step 2 after delay
    await waitFor(() => {
      expect(screen.getByText('Step 02 — Matrix')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
