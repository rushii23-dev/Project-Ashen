import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Header from './Header';
import { INITIAL_AQI, AQI_UPDATE_INTERVAL_MS } from '../utils/constants';

vi.stubGlobal('scrollTo', vi.fn());

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('Header Component', () => {
  it('renders the brand title', () => {
    render(<Header />);
    expect(screen.getByText('Ashen.')).toBeInTheDocument();
  });

  it('renders the primary navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Calculator')).toBeInTheDocument();
    expect(screen.getByText('Manifesto')).toBeInTheDocument();
  });

  it('shows the initial AQI telemetry value', () => {
    render(<Header />);
    expect(screen.getByText(`INDIA AQI: ${INITIAL_AQI}`)).toBeInTheDocument();
  });

  it('updates the simulated AQI on each interval tick within valid bounds', () => {
    vi.useFakeTimers();
    // Force a deterministic downward fluctuation: floor(0 * range) - offset = -2.
    vi.spyOn(Math, 'random').mockReturnValue(0);

    render(<Header />);
    act(() => {
      vi.advanceTimersByTime(AQI_UPDATE_INTERVAL_MS);
    });

    expect(screen.getByText(`INDIA AQI: ${INITIAL_AQI - 2}`)).toBeInTheDocument();
  });

  it('reveals the magnetic hover pill when a link is hovered', () => {
    render(<Header />);
    const calculator = screen.getByText('Calculator');
    const link = calculator.closest('a');
    if (!link) throw new Error('expected Calculator to be inside an anchor');
    fireEvent.mouseEnter(link);
    // The hovered link becomes fully white (text-white class applied).
    expect(calculator).toHaveClass('text-white');
  });

  it('clears the telemetry interval on unmount', () => {
    vi.useFakeTimers();
    const clearSpy = vi.spyOn(globalThis, 'clearInterval');
    const { unmount } = render(<Header />);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});
