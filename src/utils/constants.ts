/**
 * Application-wide named constants.
 *
 * Every "magic number" in the codebase is extracted here with a clear
 * explanation of its source and rationale.
 */

// ─── Carbon Calculation Engine ───────────────────────────────────────────────

/**
 * Baseline personal carbon footprint in metric tons of CO₂ per year.
 * Represents the unavoidable emissions from housing, basic utilities,
 * and public infrastructure that every individual contributes to.
 * Source: EPA Individual Emissions Calculator baseline.
 */
export const BASE_FOOTPRINT_TONS = 2.0;

/**
 * Average annual CO₂ absorption per mature tree in metric tons.
 * A single mature tree absorbs approximately 21 kg (0.021 metric tons)
 * of CO₂ per year under optimal conditions.
 * Source: European Environment Agency (EEA) forestry data.
 */
export const CO2_ABSORPTION_PER_TREE_TONS = 0.021;

// ─── Header / AQI Simulation ────────────────────────────────────────────────

/**
 * Initial Air Quality Index displayed in the header.
 * Set to 168 (categorised as "Unhealthy" by EPA standards) to represent
 * a typical urban Indian city baseline before live fluctuation kicks in.
 */
export const INITIAL_AQI = 168;

/**
 * Maximum valid AQI value on the EPA scale.
 */
export const MAX_AQI = 500;

/**
 * Minimum valid AQI value.
 */
export const MIN_AQI = 0;

/**
 * Interval in milliseconds between simulated AQI updates.
 * Set to 4200ms to feel organic — not too fast (distracting),
 * not too slow (static).
 */
export const AQI_UPDATE_INTERVAL_MS = 4200;

/**
 * Maximum random fluctuation (+/-) applied per AQI tick.
 */
export const AQI_FLUCTUATION_RANGE = 5;

/**
 * Offset applied to center the random fluctuation around zero.
 * With a range of 5, values 0–4 become -2 to +2.
 */
export const AQI_FLUCTUATION_OFFSET = 2;

// ─── Hero Video ─────────────────────────────────────────────────────────────

/**
 * Cinematic playback rate for the hero background video.
 * 0.8× creates a subtle slow-motion effect that enhances the
 * contemplative aesthetic of the landing experience.
 */
export const HERO_PLAYBACK_RATE = 0.8;

// ─── Carbon Calculator ──────────────────────────────────────────────────────

/**
 * Delay in milliseconds before auto-advancing to the next calculator step
 * after the user selects an option. Provides brief visual feedback
 * before transitioning.
 */
export const AUTO_ADVANCE_DELAY_MS = 400;

// ─── Hash Router ────────────────────────────────────────────────────────────

/**
 * Delay in milliseconds before scrolling to a same-page anchor after a hash
 * change. Gives lazily-loaded sections a brief moment to mount so the target
 * element exists before we attempt to scroll to it.
 */
export const ANCHOR_SCROLL_DELAY_MS = 100;
