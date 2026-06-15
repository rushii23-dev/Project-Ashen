
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import PrivacyPolicy from './PrivacyPolicy';

beforeAll(() => {
  window.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe('PrivacyPolicy', () => {
  it('renders privacy policy heading', () => {
    render(<PrivacyPolicy />);
    expect(screen.getAllByText(/Privacy Policy/i).length).toBeGreaterThan(0);
  });
});
