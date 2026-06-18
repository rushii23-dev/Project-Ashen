import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VoicesEvidence from './VoicesEvidence';

describe('VoicesEvidence', () => {
  it('renders the evidence section with its video cards', () => {
    render(<VoicesEvidence />);
    expect(screen.getByLabelText(/Play video from Sephra's Green Show/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Play video from Parcham Classes/i)).toBeInTheDocument();
  });

  it('unmutes and restarts a card video on hover/focus, then re-mutes on leave/blur', () => {
    render(<VoicesEvidence />);
    const card = screen.getByLabelText(/Play video from Sephra's Green Show/i);
    const video = card.querySelector('video') as HTMLVideoElement;
    Object.defineProperty(video, 'currentTime', { configurable: true, writable: true, value: 5 });

    fireEvent.mouseEnter(card);
    expect(video.muted).toBe(false);
    expect(video.currentTime).toBe(0);

    fireEvent.mouseLeave(card);
    expect(video.muted).toBe(true);

    fireEvent.focus(card);
    expect(video.muted).toBe(false);

    fireEvent.blur(card);
    expect(video.muted).toBe(true);
  });
});
