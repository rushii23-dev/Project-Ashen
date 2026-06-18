# 🌍 Project Ashen

> **"You cannot reverse what you refuse to measure."**

Welcome to **Project Ashen**—a cinematic, highly interactive digital platform designed to bring absolute clarity to the invisible carbon footprint we leave behind every single day. Ashen is not just a calculator; it is an immersive, documentary-style experience that transforms complex environmental data into undeniable, visual realities.

By bridging the gap between daily human habits and their mathematical environmental impact, Ashen empowers users to stop guessing and start taking direct action.

---

## 🔥 The Core Experience & Features

### 🧮 The 3-Step Carbon Matrix

At the heart of Ashen lies a dynamic, real-time calculation engine. Rather than overwhelming you with endless forms, the matrix distills your life down to three critical pillars:

1. **Transit Dynamics:** Do you drive alone, take the bus, or cycle? Ashen instantly calculates the exhaust footprint of your commute.
2. **Dietary Impact:** From plant-based plates to high-meat diets, see exactly how much land, water, and methane your meals cost the planet.
3. **Consumption Velocity:** Are you a fast-fashion trendsetter or a minimalist? Measure the hidden environmental toll of the gadgets and clothes you buy.

### ⚡ Real-Time Impact Translation

Numbers alone don't change behavior—context does. As you make selections in the Carbon Matrix, Ashen runs complex algorithms to instantly translate your choices into:

- **Total Tons of CO₂:** Your raw annual planetary weight.
- **The Tree Offset Metric:** A striking, calculated number revealing exactly how many mature trees must be planted and grown to neutralize your specific lifestyle.

### 🛡️ "Hover-to-Heal" Prevention Grid

Knowledge without action is useless. Once your shadow is measured, Ashen hands you the tools to erase it. The **Hover-to-Heal** grid is a tactile, interactive 3D flip-card system that targets the largest polluters:

- **The Problem (Front):** Uncovers the brutal truth behind solo commuting, vampire electronics, and industrial meat.
- **The Solution (Back):** Flip the card to reveal immediate, actionable, and productive steps you can take _today_ to drastically cut the bleed. Tap to heal, and watch the matrix rewrite itself.

### 🎬 Cinematic Architecture

Ashen abandons the rigid, boring layouts of traditional climate calculators.

- **Scroll-Driven Typography:** Words physically react to your scroll speed, breaking apart and assembling to emphasize the weight of the climate crisis.
- **Fluid Parallax Interfaces:** Massive, documentary-style background visuals move dynamically as you navigate the page, pulling you deeper into the narrative.
- **Perfect Cinematic Glides:** We replaced native browser scrolling with a custom-built, physics-based engine that glides perfectly, giving the app a premium, high-end feel.

### 🗣️ The Voices of Evidence

A curated repository of hard-hitting, scientifically backed truths. This section cuts through the noise and delivers raw statistics on atmospheric CO₂, global temperature spikes, and ocean acidification, ensuring every user leaves with an undeniable understanding of the stakes.

---

## 🚀 The Mission

Project Ashen was built to prove that environmental accountability doesn't have to be a chore. It can be beautiful, fast, and relentlessly productive.

**Measure your shadow. Change your plate. Pull the plug. Leave nothing behind.**

---

## 🛠️ Engineering & Quality

Ashen is built to a production-grade standard. The entire quality gate runs with a single command:

```bash
npm run verify   # typecheck → lint → format → tests + coverage → audit → build
```

| Area                 | What we do                                                                                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Type safety**      | TypeScript in `strict` mode plus `noUncheckedIndexedAccess`, `noImplicitReturns`, `noImplicitOverride`, and `allowUnreachableCode: false`.               |
| **Linting & format** | ESLint (`typescript-eslint` strict) and Prettier, enforced on every commit via Husky + lint-staged and in CI.                                            |
| **Testing**          | Vitest + Testing Library unit/integration tests and a Playwright E2E flow. Coverage is gated (statements/lines ≈ 90%).                                   |
| **Accessibility**    | Automated `axe-core` assertions, a skip-to-content link, visible focus rings, ARIA live regions, and global `prefers-reduced-motion` support.            |
| **Performance**      | Route-level code-splitting, vendor chunking, lazy media, cross-origin `preconnect`, hidden source maps, gzip.                                            |
| **Security**         | Hardened CSP (no inline scripts), HSTS, COOP/CORP, an `npm audit` gate, and a **non-root** multi-stage Docker image. See [`SECURITY.md`](./SECURITY.md). |
| **CI/CD**            | GitHub Actions runs the full gate and builds the container image on every push and PR.                                                                   |
