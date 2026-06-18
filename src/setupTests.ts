import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';
// vitest-axe@0.1.0 ships the matcher as a runtime value but types it ambiguously
// under verbatimModuleSyntax, so import the module namespace and register it.
import * as axeMatchers from 'vitest-axe/matchers';

// Register the automated-accessibility matcher (axe-core) globally.
expect.extend(axeMatchers as unknown as Parameters<typeof expect.extend>[0]);

afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver for framer-motion and viewport animations
globalThis.IntersectionObserver = class MockIntersectionObserver {
  observe() {
    /* noop */
  }
  unobserve() {
    /* noop */
  }
  disconnect() {
    /* noop */
  }
} as unknown as typeof IntersectionObserver;

// jsdom does not implement matchMedia; framer-motion reads it on mount.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// jsdom stubs HTMLMediaElement playback as "not implemented" and logs noisy
// warnings. Provide quiet, predictable implementations so video components and
// their event handlers can be tested deterministically.
Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  writable: true,
  value: vi.fn().mockResolvedValue(undefined),
});
Object.defineProperty(window.HTMLMediaElement.prototype, 'load', {
  configurable: true,
  writable: true,
  value: vi.fn(),
});
Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  writable: true,
  value: vi.fn(),
});

// jsdom has no canvas backend; axe-core probes it for the color-contrast check.
// Returning null cleanly makes axe skip that rule without noisy warnings.
Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
  configurable: true,
  writable: true,
  value: () => null,
});
