import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScrollTextReveal from './ScrollTextReveal';

describe('ScrollTextReveal', () => {
  it('renders text split into word spans', () => {
    render(<ScrollTextReveal text="Hello world test" as="div" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('world')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('handles newlines by splitting into separate lines', () => {
    render(<ScrollTextReveal text={"Line one\nLine two"} as="p" />);
    expect(screen.getAllByText('Line')).toHaveLength(2);
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });

  it('applies per-word classNames via wordsClassName prop', () => {
    render(
      <ScrollTextReveal 
        text="styled word here" 
        wordsClassName={["", "italic", ""]} 
      />
    );
    const styledWord = screen.getByText('word');
    expect(styledWord.className).toContain('italic');
  });
});
