import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { configureAxe } from 'vitest-axe';
import Header from './components/Header';
import CarbonCalculator from './components/CarbonCalculator';
import BreakdownSection from './components/BreakdownSection';
import Manifesto from './components/Manifesto';
import PrivacyPolicy from './components/PrivacyPolicy';

// Each component is mounted in isolation (no surrounding <main>/<h1>), so we
// disable rules that only make sense for a complete document. Everything else —
// names, roles, contrast intent, ARIA correctness — is asserted strictly.
const axe = configureAxe({
  rules: {
    region: { enabled: false },
    'landmark-one-main': { enabled: false },
    'landmark-unique': { enabled: false },
    'page-has-heading-one': { enabled: false },
  },
});

describe('accessibility — axe-core has zero violations', () => {
  it('Header', async () => {
    const { container } = render(<Header />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('CarbonCalculator', async () => {
    const { container } = render(<CarbonCalculator />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('BreakdownSection', async () => {
    const { container } = render(<BreakdownSection />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Manifesto', async () => {
    const { container } = render(<Manifesto />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('PrivacyPolicy', async () => {
    const { container } = render(<PrivacyPolicy />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
