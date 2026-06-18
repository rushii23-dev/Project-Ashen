import { describe, it, expect, vi, afterEach } from 'vitest';
import { smoothScrollTo } from './smoothScroll';

describe('smoothScrollTo', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('does nothing and does not throw when the target element is missing', () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    expect(() => smoothScrollTo('does-not-exist')).not.toThrow();
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it('eases the scroll and lands exactly on the centered target position', () => {
    const el = document.createElement('div');
    el.id = 'target';
    document.body.appendChild(el);

    // Pin a deterministic geometry: element 500px down, 100px tall.
    el.getBoundingClientRect = () =>
      ({
        top: 500,
        height: 100,
        bottom: 600,
        left: 0,
        right: 0,
        width: 0,
        x: 0,
        y: 500,
        toJSON: () => ({}),
      }) as DOMRect;

    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    // Drive requestAnimationFrame deterministically: advance 600ms per frame.
    let now = 0;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      now += 600;
      cb(now);
      return 0;
    });

    smoothScrollTo('target', 1000);

    // targetPosition = top(500) + scrollY(0) - innerHeight/2 + height/2
    const expectedTarget = 500 + window.scrollY - window.innerHeight / 2 + 50;
    const lastCall = scrollSpy.mock.calls.at(-1);
    expect(scrollSpy).toHaveBeenCalled();
    expect(lastCall?.[0]).toBe(0);
    // Final frame has progress === 1 (easing === 1), so it lands exactly on target.
    expect(lastCall?.[1]).toBeCloseTo(expectedTarget, 5);
  });
});
