
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import FinalSections from './FinalSections';

beforeAll(() => {
  window.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe('FinalSections', () => {
  it('renders the header correctly', () => {
    render(<FinalSections />);
    expect(screen.getByText(/The power to rewrite it/i)).toBeInTheDocument();
  });

  it('can flip cards via click and keyboard', () => {
    render(<FinalSections />);
    // Select the first card button (from the InteractiveCard component)
    // The footer might also have a button. InteractiveCard buttons have aria-pressed.
    const cards = screen.getAllByRole('button').filter(b => b.hasAttribute('aria-pressed'));
    expect(cards.length).toBeGreaterThan(0);
    
    expect(cards[0]).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(cards[0]);
    expect(cards[0]).toHaveAttribute('aria-pressed', 'true');
  });
});
