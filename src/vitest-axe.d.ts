import 'vitest';
import type { AxeMatchers } from 'vitest-axe/matchers';

// Teach Vitest's `expect` about the axe-core accessibility matcher.
declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion extends AxeMatchers {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
