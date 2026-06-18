import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroVideo from './HeroVideo';
import { HERO_PLAYBACK_RATE } from '../utils/constants';

/** Helper: render the hero and return its single <video> element. */
function renderHero(): HTMLVideoElement {
  const { container } = render(<HeroVideo />);
  const video = container.querySelector('video');
  if (!video) throw new Error('expected a <video> element');
  return video;
}

describe('HeroVideo Component', () => {
  it('renders the video element', () => {
    expect(renderHero()).toBeInTheDocument();
  });

  it('renders the typography overlay heading', () => {
    render(<HeroVideo />);
    expect(screen.getByText(/The weight of the/i)).toBeInTheDocument();
  });

  it('marks the decorative video as hidden from assistive tech', () => {
    expect(renderHero()).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies the cinematic playback rate once metadata has loaded', () => {
    const video = renderHero();
    fireEvent.loadedMetadata(video);
    expect(video.playbackRate).toBe(HERO_PLAYBACK_RATE);
  });

  it('loops back to the start once the clip reaches its end (single-clip sequence)', () => {
    const video = renderHero();
    // Past the clip end (15s); the handler should rewind to the start (0).
    Object.defineProperty(video, 'currentTime', { configurable: true, writable: true, value: 16 });
    fireEvent.timeUpdate(video);
    expect(video.currentTime).toBe(0);
  });

  it('does not rewind before the clip end is reached', () => {
    const video = renderHero();
    Object.defineProperty(video, 'currentTime', { configurable: true, writable: true, value: 3 });
    fireEvent.timeUpdate(video);
    expect(video.currentTime).toBe(3);
  });

  it('handles the ended event without throwing', () => {
    const video = renderHero();
    expect(() => fireEvent.ended(video)).not.toThrow();
  });
});
