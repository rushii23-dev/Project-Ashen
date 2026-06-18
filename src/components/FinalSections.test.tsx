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
    const [firstCard] = screen.getAllByRole('button').filter((b) => b.hasAttribute('aria-pressed'));
    if (!firstCard) throw new Error('expected at least one flip card');

    expect(firstCard).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(firstCard);
    expect(firstCard).toHaveAttribute('aria-pressed', 'true');
  });
});
