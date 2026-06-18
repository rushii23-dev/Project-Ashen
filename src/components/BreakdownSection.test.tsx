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
    const buttons = screen.getAllByRole('button');
    // First button is active by default
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');

    fireEvent.mouseEnter(buttons[1]);
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });
});
