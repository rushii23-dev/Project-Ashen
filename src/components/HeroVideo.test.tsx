import { render, screen, cleanup } from '@testing-library/react';
import HeroVideo from './HeroVideo';
import { describe, it, expect, vi, afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

// Mock matchMedia to prevent framer-motion errors in jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('HeroVideo Component', () => {
  it('renders without crashing', () => {
    render(<HeroVideo />);
    // Wait for the video element to be in the document
    const videoElements = document.getElementsByTagName('video');
    expect(videoElements.length).toBeGreaterThan(0);
  });

  it('renders the typography overlay', () => {
    render(<HeroVideo />);
    const heading = screen.getByText(/The weight of the/i);
    expect(heading).toBeInTheDocument();
  });
});
