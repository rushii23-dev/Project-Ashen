import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FinalSections from './FinalSections';

describe('FinalSections', () => {
  it('renders the header correctly', () => {
    render(<FinalSections />);
    expect(screen.getByText(/The power to rewrite it/i)).toBeInTheDocument();
  });

  it('can flip cards via click and keyboard', () => {
    render(<FinalSections />);
    const cards = screen.getAllByRole('button').filter(b => b.hasAttribute('aria-pressed'));
    expect(cards.length).toBeGreaterThan(0);
    
    expect(cards[0]).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(cards[0]);
    expect(cards[0]).toHaveAttribute('aria-pressed', 'true');
  });
});
