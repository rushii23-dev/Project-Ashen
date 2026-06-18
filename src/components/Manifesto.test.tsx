import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Manifesto from './Manifesto';

afterEach(() => vi.restoreAllMocks());

describe('Manifesto', () => {
  it('renders all screens correctly', () => {
    render(<Manifesto />);
    expect(
      screen.getByText(/We refuse to let the invisible remain unaccountable./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/The cloud is a myth./i)).toBeInTheDocument();
    expect(screen.getByText(/Leave/i)).toBeInTheDocument();
  });

  it('scrolls to top when the footer Manifesto control is pressed', () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(<Manifesto />);
    fireEvent.click(screen.getByRole('button', { name: 'Manifesto' }));
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
