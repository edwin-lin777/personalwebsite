# Project preview sources — 2026-10-13

- **AIPM:** original user-supplied screenshots in `public/projects`. Homepage crop focuses on portfolio metrics and position weights; full screenshots remain in its gallery.
- **BS Liquidity:** captured from `https://bs-liquidity.com/` and its public `/positioncalculuator` route using `design/capture-bs.cjs`. Calculator screenshot uses illustrative inputs: 1% risk, 10,000 account size, 20,000 entry, 19,950 stop-loss, 20,100 take profit. The displayed result is the site's actual calculation. This is an example, not a claim about Edwin's account or an actual trade. The market screenshot is a captured snapshot, not live data in the portfolio.
- **Steel Imports:** native 2448×1440 frames at 22s (map) and 94s (recommendation) from the existing MIT recording linked in `src/data/projects.ts`.
- **Navi$:** native 1920×1080 frames at 58s (benefits) and 99s (program dashboard) from the existing demo recording linked in `src/data/projects.ts`. Numbers visible in these frames belong to the demo; they are not added as project outcome claims.
- **Rewards simulator:** original SVG workflow illustration, explicitly labeled as an illustration. Uses only the previously supplied 50,000 synthetic households and 286 wallet combinations; bar lengths are decorative, not simulation results.

Captures are unchanged. `ProjectScreenshot` applies the viewports declared in `src/data/projects.ts` and clips content outside them, preserving aspect ratios. Recording browser chrome is excluded by these viewports. The downloaded video working copies were removed after extracting frames; recordings remain hosted at their existing URLs.

BS Liquidity's stack was verified against the matching local `finance-dashboard` package/source (Next.js, TypeScript, Tailwind CSS). No application code was imported into the portfolio.
