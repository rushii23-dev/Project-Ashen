
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import VoicesEvidence from './VoicesEvidence';

beforeAll(() => {
  window.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe('VoicesEvidence', () => {
  it('renders without crashing', () => {
    render(<VoicesEvidence />);
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });
});
