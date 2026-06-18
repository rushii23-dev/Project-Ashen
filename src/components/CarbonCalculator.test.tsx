import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CarbonCalculator from './CarbonCalculator';

/** Returns the first element matching `label`, failing loudly if absent. */
function firstByText(label: string): HTMLElement {
  const [el] = screen.getAllByText(label);
  if (!el) throw new Error(`expected to find an element with text "${label}"`);
  return el;
}

/** Clicks the choice button whose label matches and waits for the next step. */
async function chooseAndAdvance(label: string, nextStepLabel: string) {
  fireEvent.click(firstByText(label));
  await waitFor(() => expect(screen.getByText(nextStepLabel)).toBeInTheDocument(), {
    timeout: 3000,
  });
}

describe('CarbonCalculator Component', () => {
  it('renders the first step correctly', () => {
    render(<CarbonCalculator />);
    expect(screen.getByText('CONSEQUENCE.')).toBeInTheDocument();
    expect(screen.getByText('Step 01 — Matrix')).toBeInTheDocument();
  });

  it('progresses to the next step when an option is selected', async () => {
    render(<CarbonCalculator />);
    await chooseAndAdvance('Walk or Bicycle', 'Step 02 — Matrix');
  });

  it('walks the full 3-step flow and reveals the result payoff', async () => {
    render(<CarbonCalculator />);

    await chooseAndAdvance('Walk or Bicycle', 'Step 02 — Matrix');
    await chooseAndAdvance('Mostly Plants & Veggies', 'Step 03 — Matrix');

    fireEvent.click(firstByText('Rarely. I use things until they break.'));

    // Result screen surfaces the headline metric and the recalculate control.
    await waitFor(() => expect(screen.getByText(/TONS/)).toBeInTheDocument(), { timeout: 3000 });
    expect(
      screen.getByRole('button', { name: /recalculate your carbon footprint/i }),
    ).toBeInTheDocument();
  });

  it('resets back to the first step when Recalculate is pressed', async () => {
    render(<CarbonCalculator />);

    await chooseAndAdvance('Walk or Bicycle', 'Step 02 — Matrix');
    await chooseAndAdvance('Mix of Meat & Veggies', 'Step 03 — Matrix');
    fireEvent.click(firstByText('Often. I like buying new trends.'));

    await waitFor(() => expect(screen.getByText(/TONS/)).toBeInTheDocument(), { timeout: 3000 });

    fireEvent.click(screen.getByRole('button', { name: /recalculate your carbon footprint/i }));

    await waitFor(() => expect(screen.getByText('Step 01 — Matrix')).toBeInTheDocument());
  });

  it('exposes the pressed state on the selected choice for assistive tech', async () => {
    render(<CarbonCalculator />);
    const choice = firstByText('Bus or Train').closest('button');
    if (!choice) throw new Error('expected the choice label to be inside a button');
    fireEvent.click(choice);
    expect(choice).toHaveAttribute('aria-pressed', 'true');
  });
});
