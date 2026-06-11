import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock intersection observer for framer-motion and viewport animations
const mockIntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;
vi.stubGlobal('scrollTo', vi.fn());

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
