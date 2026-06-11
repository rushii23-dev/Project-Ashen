import '@testing-library/jest-dom/vitest';

const mockIntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;
