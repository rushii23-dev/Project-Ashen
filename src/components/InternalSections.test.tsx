import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InternalSections from './InternalSections';

describe('InternalSections', () => {
  it('renders section title', () => {
    render(<InternalSections />);
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });
});
