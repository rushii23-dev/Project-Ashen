/**
 * Custom hardware-accelerated smooth scroll utility using requestAnimationFrame
 * and a cinematic easeInOutCubic easing curve to ensure a perfect 120Hz/144Hz scroll rate.
 */

// Easing function: easeInOutCubic
// Starts slow, accelerates, then gracefully decelerates to a stop
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function smoothScrollTo(targetId: string, duration: number = 1500) {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const targetRect = targetElement.getBoundingClientRect();

  // Calculate the exact target Y position to align the element perfectly in the center of the viewport
  const targetPosition =
    targetRect.top + window.scrollY - window.innerHeight / 2 + targetRect.height / 2;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  // The engine that ties to monitor refresh rate
  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;

    // Cap progress at 1 to prevent overshooting
    const progress = Math.min(timeElapsed / duration, 1);

    // Apply the mathematical easing
    const easing = easeInOutCubic(progress);

    // Apply strict translation
    window.scrollTo(0, startPosition + distance * easing);

    // Loop until duration is met
    if (timeElapsed < duration) {
      window.requestAnimationFrame(animation);
    }
  }

  window.requestAnimationFrame(animation);
}
