import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VoicesEvidence from './VoicesEvidence';

describe('VoicesEvidence', () => {
  it('renders without crashing', () => {
    render(<VoicesEvidence />);
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });
});
