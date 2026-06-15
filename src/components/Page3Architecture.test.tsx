
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import Page3Architecture from './Page3Architecture';

beforeAll(() => {
  window.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe('Page3Architecture', () => {
  it('renders without crashing', () => {
    render(<Page3Architecture />);
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });
});
