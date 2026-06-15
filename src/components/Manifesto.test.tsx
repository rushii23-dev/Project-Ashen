
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import Manifesto from './Manifesto';

beforeAll(() => {
  window.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe('Manifesto', () => {
  it('renders all screens correctly', () => {
    render(<Manifesto />);
    expect(screen.getByText(/We refuse to let the invisible remain unaccountable./i)).toBeInTheDocument();
    expect(screen.getByText(/The cloud is a myth./i)).toBeInTheDocument();
    expect(screen.getByText(/Leave/i)).toBeInTheDocument();
  });
});
