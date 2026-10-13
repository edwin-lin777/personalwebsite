# Edwin Lin — portfolio

A real Next.js App Router project based on the selected portfolio direction: Chalk gallery's compact project grid, Stone index's warm colors, and a serif name. The homepage combines four projects with an About note and photography link. Project details have their own shareable routes.

## Start locally

Install a current Node.js LTS release (Node 20.9 or later is required), then open this folder in VS Code or Codex:

```sh
npm ci
npm run dev
```

Open `http://localhost:3000` in your browser. Stop the server with Ctrl+C.

```sh
npm run typecheck
npm run build
npm start
```

`npm start` serves the production build after `npm run build`. No API keys or environment variables are needed. The lockfile records the installed dependency versions.

## Continue with Codex

Open this folder as the Codex workspace. Start with `CODEX_HANDOFF.md`, then use `AGENTS.md` for the design and content constraints. The starter is already implemented; ask Codex to refine the actual app rather than generate another competing design.

Suggested first message:

> Read AGENTS.md and CODEX_HANDOFF.md. Run this Next.js portfolio locally and review it at laptop and mobile sizes. Preserve the warm Chalk/Stone design and compact homepage. Refine spacing, typography, image crops, and subtle interactions based on what you observe. Keep project facts grounded in the data file. Tell me what changed and show the running app.

## Files to edit

| File | Purpose |
| --- | --- |
| `src/data/projects.ts` | Project descriptions, stacks, screenshots, code links, recording links, and future live-app URLs |
| `src/data/site.ts` | Contact links, optional résumé URL, photo collection |
| `src/app/globals.css` | Palette, typography, spacing, responsive layouts, motion |
| `src/app/page.tsx` | Compact homepage layout |
| `src/app/projects/[slug]/page.tsx` | Reusable project detail page |
| `src/components/project-gallery.tsx` | Screenshot selection |
| `src/components/photo-collection.tsx` | Photo grid and keyboard-accessible lightbox |
| `design/combined-reference.html` | Self-contained design reference; open directly in a browser |

## Add the final résumé

Place the approved PDF at `public/resume.pdf`, then set `site.resume` to `"/resume.pdf"` in `src/data/site.ts`. The résumé link appears automatically in the navigation and About page. No outdated résumé is bundled or linked.

## Add photography

Put your selected image files in `public/photos` and add entries to `photos` in `src/data/site.ts`:

```ts
{
  src: "/photos/your-photo.jpg",
  alt: "An accurate description of your photograph",
  caption: "Your caption",
  location: "Optional location",
  width: 1800,
  height: 1200,
}
```

Use each file's actual dimensions. The empty collection is intentionally labeled as coming soon. Once photos are added, the grid and lightbox activate automatically. Escape closes the lightbox; left/right arrow keys switch photos.

## Project demos

- AIPM currently has three screenshots, with working screenshot-selection buttons.
- MIT and Navi$ have stills from the user's recordings and external **Watch recording** links to Dropbox.
- The Go engine has a labeled project illustration and a real GitHub link, not a fabricated application screenshot.
- `liveUrl` is optional. Add a deployed app URL to show **Open live app** on that project's page.
- Recordings are videos, not live interactive apps. Nothing silently embeds or autoplays.
- A future iframe demo should be an explicit follow-up: verify the app allows embedding, provide a sample-data session, and load only on request. Each project remains in its own repo/deployment.

## Save to your GitHub

No remote repository has been created or connected. After extracting the ZIP and reviewing the files, you can initialize a local repo:

```sh
git init
git add .
git commit -m "Build initial portfolio"
```

Create your own empty portfolio repository and connect its URL. Keep project applications in their existing repos. The portfolio can later be deployed separately through Vercel's normal Next.js workflow; this package has not been published.

## Implementation notes

- Next.js, React, TypeScript, plain CSS. No UI framework or animation library is required for the current design.
- System sans-serif and Georgia avoid a font-network dependency.
- Images are local assets and rendered with Next Image.
- Standard page links support browser Back/Forward, refresh, and sharing.
- Reduced-motion preferences, focus outlines, semantic navigation, and a skip link are included.
- There is no backend, database, authentication, analytics, or personal-data form.
- Setup reference: https://nextjs.org/docs/app/getting-started/installation

See `VALIDATION.md` for the checks completed on this package and remaining review work.
