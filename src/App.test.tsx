import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import App from './App';

vi.stubGlobal('scrollTo', vi.fn());

afterEach(() => {
  window.location.hash = '';
  vi.restoreAllMocks();
});

describe('App Component (hash router)', () => {
  it('renders the home experience by default', () => {
    window.location.hash = '';
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
    // The fixed header is always present on the home view.
    expect(screen.getByText('Ashen.')).toBeInTheDocument();
  });

  it('exposes a skip-to-content link targeting the main landmark', () => {
    window.location.hash = '';
    render(<App />);
    const skip = screen.getByRole('link', { name: /skip to main content/i });
    expect(skip).toHaveAttribute('href', '#main-content');
    expect(document.getElementById('main-content')).toHaveProperty('tagName', 'MAIN');
  });

  it('routes to the Manifesto page on the #manifesto hash', async () => {
    window.location.hash = '#manifesto';
    render(<App />);
    // Manifesto is lazy-loaded, so wait for its unique copy to resolve.
    expect(await screen.findByText('THE GOAL')).toBeInTheDocument();
  });

  it('routes to the Privacy Policy page on the #privacy hash', async () => {
    window.location.hash = '#privacy';
    render(<App />);
    expect(await screen.findByText('Privacy Policy.')).toBeInTheDocument();
  });

  it('navigates back home and scrolls to an in-page anchor', async () => {
    const scrollIntoView = vi.fn();
    Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      writable: true,
      value: scrollIntoView,
    });

    render(<App />);

    act(() => {
      window.location.hash = '#manifesto';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    await screen.findByText('THE GOAL');

    act(() => {
      window.location.hash = '#carbon-calculator';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    // Returns to the home view, then attempts to scroll to the anchored section.
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());
  });
});
