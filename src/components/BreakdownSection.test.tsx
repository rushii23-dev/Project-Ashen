import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BreakdownSection from './BreakdownSection';

describe('BreakdownSection', () => {
  it('renders section title', () => {
    render(<BreakdownSection />);
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
  });

  it('activates a layer on mouse enter', () => {
    render(<BreakdownSection />);
    const [first, second] = screen.getAllByRole('button');
    if (!first || !second) throw new Error('expected at least two layer buttons');

    // First button is active by default
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'false');

    fireEvent.mouseEnter(second);
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });

  it('activates a layer on click and collapses again on mouse leave', () => {
    const { container } = render(<BreakdownSection />);
    const [first, , third] = screen.getAllByRole('button');
    if (!first || !third) throw new Error('expected three layer buttons');

    fireEvent.click(third);
    expect(third).toHaveAttribute('aria-expanded', 'true');
    expect(first).toHaveAttribute('aria-expanded', 'false');

    // Leaving the grid resets the active layer back to the first.
    const grid = third.parentElement;
    if (!grid) throw new Error('expected a grid wrapper');
    fireEvent.mouseLeave(grid);
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(container).toBeInTheDocument();
  });
});
