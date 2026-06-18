import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PrivacyPolicy from './PrivacyPolicy';

describe('PrivacyPolicy', () => {
  it('renders privacy policy heading', () => {
    render(<PrivacyPolicy />);
    expect(screen.getAllByText(/Privacy Policy/i).length).toBeGreaterThan(0);
  });
});
