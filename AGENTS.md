# Working on Edwin's portfolio

- Read `CODEX_HANDOFF.md` before changing the design or project copy.
- Preserve the compact homepage, warm palette, serif name, 2×2 project grid, and personal sidebar unless Edwin asks otherwise.
- Prefer Next.js App Router, TypeScript, and the current CSS. Avoid adding dependencies without a concrete need.
- Keep project/contact/photo content in `src/data`.
- Do not invent metrics, awards, individual contributions, completed hackathons, or photos.
- Label demo recordings as recordings. Do not imply screenshots are live interactive apps.
- Use semantic links for navigation, real buttons for local interaction, visible keyboard focus, and reduced-motion support.
- Keep existing projects in their own repositories/deployments. Do not import their backend code into the portfolio.
- Use `npm run typecheck` and `npm run build` to verify meaningful changes. Preview the site for visual changes when a browser is available.
- Add the final résumé and original photography only when provided/approved by Edwin.
- Deployment is a later step; do not deploy or connect a remote as part of an unrelated visual edit.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

