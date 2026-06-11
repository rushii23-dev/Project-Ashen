import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';

// Mock window.scrollTo to prevent errors in testing environment
vi.stubGlobal('scrollTo', vi.fn());

describe('Header Component', () => {
  it('renders the header title correctly', () => {
    render(<Header />);
    expect(screen.getByText('Ashen.')).toBeInTheDocument();
  });

  it('renders the calculator link', () => {
    render(<Header />);
    expect(screen.getAllByText('Calculator')[0]).toBeInTheDocument();
  });
});
