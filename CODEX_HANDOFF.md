# Portfolio handoff

## What Edwin wants

A clean, personal portfolio for SWE/quant recruiting. It should feel like a small interactive personal website, with all selected projects easy to see, rather than a long scrolling blog or a marketing landing page. The homepage should fit within roughly one or two laptop screens. Mobile can naturally stack.

## Design decisions already made

- Photography now uses 15 frames from the six collage sheets Edwin supplied (matching his Downloads photo ZIP). Originals are unchanged in public/photos; CSS frame coordinates and descriptive captions live in src/data/photos.ts. The gallery has After dark, Outside, and Good company collections, with an accessible keyboard-controlled lightbox. Homepage photography preview uses his shoreline sunset. Do not infer locations from the collage titles. Individual full-resolution originals can replace sheets later.

- Personal project cards no longer display “Personal project”; technology names appear in compact outlined badges with restrained charcoal, teal, and blue tones. Hackathon event labels remain.

- Latest copy approved directly by Edwin: AIPM is now “Quantitative Portfolio Engine” with “Risk decomposition, factor screening and institutional flow analysis for an equity book I trade with my own capital.” Stack: Next.js + FastAPI + PostgreSQL. Rewards Engine is now “Credit Card Rewards Simulator” with “A concurrent Monte Carlo simulator evaluating credit-card rewards across 50,000 synthetic households and 286 wallet combinations.” Stack: Go + Docker. These supplied facts supersede the older conservative copy below. Existing route slugs are retained. Card metadata includes the stack after Personal project. “Now playing” uses an italic serif.

- Spotify spacing: social-to-music gap is now 8px on desktop/mobile. Spotify's internal Preview label is not customizable via its supported embed options; retain it alongside the external Now playing label. Discussed short muted project recordings as a possible next step; no new recordings supplied or video implementation requested yet.

- Latest typography refinement: “Now playing” has no solid background and sits 4px above the Spotify player. The math-at-Waterloo line is darker and semibold, without its inherited soft text shadow.

- Current refinement: remove the solid intro box and all Ferrari pointer movement. The background is static, retaining its 1120px desktop car width; a blurred photo layer fills the sides instead of flat white edges. A soft radial wash supports readable text without a rectangular panel. Music label is “Now playing” (the supplied fixed track, not live listening status).

- Latest cleanup: removed the Up next line and redundant Spotify label/listen link. Social circles are 34px with expanded touch targets. Intro has a light reading surface and dark text; Favourite song retains its own readable label. Searched alternative Ferrari photos and retained the current wider image after inspecting a more cluttered alternative.

- Current refinement: scale the car independently of the full-width backdrop (1120px maximum), blend the surrounding space into a muted gray background, and use a balanced overlay instead of heavy white on the left. Remove the tall intro minimum height; the desktop project window follows the intro with a 28px gap. Keep the compact Spotify player and translucent work window.

- Latest refinement: Spotify is labeled “Favourite song” and uses the compact 80px embed. Ferrari photo now spans the viewport with stronger color and a vertical fade instead of an oval mask; a light overlay protects intro readability. The work window has a translucent top, background blur, and softer shadow to blend into the photo-to-charcoal transition. Image movement is clipped at viewport edges to avoid horizontal overflow.

- Current direction: Ferrari restored to the top above the work window and made more visible in red. The homepage background fades from white into charcoal asphalt below the projects, with subtle track curves near the footer. The photo credit stays at the bottom; the car retains pointer movement and reduced-motion support.

- Current Ferrari position: lowered into the middle behind the Projects/Hackathons window, visible around the panels; stays red with attribution at the bottom.

- Latest refinement: Edwin approved the direction and requested the Ferrari near the top, in red. It now sits behind the intro/Spotify area, retains pointer parallax, and has no color-toggle UI. Photo credit remains at the bottom of the homepage.

- Latest update: remove homepage header navigation and duplicate name; keep one large “Edwin Lin.” and the social icon dock. Projects and Hackathons are now separate tabs inside a horizontally scrolling work window, replacing the earlier 2×2 grid at Edwin's request. The homepage has a sourced Daytona SP3 background with pointer parallax, optional red color reveal, reduced-motion support, and photo attribution. Photo metadata lives in `src/data/background.ts`; it is not Edwin's photography. Desktop/mobile browser previews and the core controls have now been checked in local headless Chrome.

- Latest direction (2026-10-12): Edwin rejected the ivory/slate palette. Use white, black, and neutral gray with color from project screenshots and Spotify artwork. Keep a compact personal workspace rather than a blog. Header branding is the full “Edwin Lin.”, never “el”. Prominent circular GitHub, LinkedIn, and email links sit above the Spotify player. Edwin supplied the featured track URL now stored in `src/data/site.ts`; this is a featured song, not live listening status.

- 2026-10-12 refinement: Edwin liked the personal desktop layout but requested a more minimal, professional palette and less playful styling. Current styling uses ivory, charcoal, and muted slate; a serif name; straight cards; and plain labels without handwritten fonts, tape, or the dotted project background. Preserve the project filters and personal sidebar. Browser review is still pending.

- Initial favorite: Pocket desktop — compact project cards plus personal/hobby space.
- Later favorites: Chalk gallery and Stone index.
- Current direction: Chalk gallery's 2×2 project grid and right sidebar, Stone's warm off-white/taupe palette, and a large serif “Edwin Lin.”
- Palette is in `:root` in `src/app/globals.css`. Keep it calm and professional.
- Keep actual thumbnails small on the homepage. Show larger previews and fuller descriptions on project pages.
- Keep personal projects and hackathons together for now. The event label distinguishes them. A filter is only worth adding when there are enough projects.
- Photography should become a real collection, not a generic stock-photo gallery.
- Use restrained hover and page-entry motion. Avoid animated backgrounds, terminal gimmicks, custom cursors, autoplay, excessive badges, or a long list of generic “skills.”

The draft reference in `design/combined-reference.html` is the selected design's direction, not a requirement to preserve every pixel. The Next.js app is the implementation to refine.

## Implemented

- `/`: compact project grid, short intro, personal sidebar, photography link, contact/social links.
- `/projects/aipm`: three real screenshots with local selection controls.
- `/projects/rewards-engine`: project overview and GitHub link.
- `/projects/steel-imports`: actual recording still, project/contribution copy, Dropbox recording link.
- `/projects/navis`: actual recording still, team project description, Dropbox recording link.
- `/about`: education, short bio, Sartorial Wealth summary.
- `/photography`: 15 supplied photographs, grouped gallery, and keyboard-accessible lightbox.
- Custom not-found page, metadata, keyboard-visible focus, reduced-motion support, mobile styles.

## Facts and assets

- Edwin Lin: Honours Mathematics at Waterloo, Statistics specialization; from Vancouver.
- Email/GitHub/LinkedIn are in `src/data/site.ts`.
- AIPM: Next.js, Python/FastAPI, Postgres; risk analytics, screening, institutional research. Screenshots supplied by user. Do not add investment-performance claims.
- Go rewards engine: Canadian credit-card rewards evaluation. Public repo is `https://github.com/edwin-lin777/credit-card`. Avoid old unverified Kubernetes/performance claims. Current copy is intentionally conservative; inspect the repo if richer technical copy is requested.
- MIT: Emissions vs. Shipping Cost Optimizer, Team Diluted, partner Array Technologies. Edwin built frontend/dashboards and integrated FastAPI.
- Navi$: Hack the Globe, third of 50 teams. Individual contribution has not been specified precisely; the page describes the team product rather than inventing Edwin's role.
- Hobbies: photography/video/mountain biking; Fujifilm X100VI. Six photo collage sheets supplied and added to the collection.
- LA AI Hacks and Cal Hacks: only add their projects after they exist and Edwin supplies details.

## Remaining content decisions

1. Edwin should approve the short intro and descriptions.
2. Add the final résumé PDF. Do not silently use an older résumé from another task.
3. Add selected original photographs, accurate captions, and dimensions.
4. Add AIPM's public demo/repo URLs if Edwin wants them exposed.
5. Confirm Navi$'s individual contribution before adding a “My contribution” claim.
6. Optional: add UU Farm as a second experience once its approved résumé copy is provided.

## First development pass in Codex

1. Install from the lockfile with `npm ci`.
2. Run `npm run dev` and review the actual app at 1440×900, 1366×768, and 390px widths.
3. Adjust observed spacing/cropping/accessibility issues while preserving the selected direction.
4. Review project links, screenshot controls, Back/Forward, direct project URLs, and empty photography state.
5. Run `npm run typecheck` and `npm run build` after edits.
6. Once approved, help Edwin connect a portfolio GitHub repo and deploy to Vercel.

Do not copy the complete application code from AIPM or hackathon repos into this portfolio. Each app keeps its own deployment. An iframe, if added later, is a controlled preview of that separate deployed app.

## Delivery state

This is a local source handoff. No GitHub remote, public website, deployment, or domain has been created. Check `VALIDATION.md` for exact verification status.

- 2026-10-13: Edwin requested an ASCII Ferrari background inspired by ascii-magic.com. The original Daytona photograph is now converted into a static, red/charcoal SVG made of 4,833 ASCII glyphs, with the scenery masked out. Metadata lives in src/data/background.ts; regenerate with node design/generate-ascii-car.cjs. Softer shading behind the intro and a smaller, lighter mobile treatment keep copy readable. Existing layout and photo attribution retained; no deployment.

- 2026-10-13 animated ASCII refinement: Edwin asked for motion/rotation, clearer detail, and a lower position. The car now uses 7,524 glyphs with finer color shading, a 16-second perspective tilt, and a pause/resume button. Reduced-motion preference disables the animation and hides its control. Extra space below the intro exposes the full silhouette; mobile has a dedicated car gap before the music dock.

- 2026-10-13: Edwin requested a black-and-white car and higher project/photo panels. ASCII car now uses grayscale; desktop intro space is reduced by 80px, raising both panels together. Mobile spacing is reduced by 35px with a slightly smaller car. Motion and pause/reduced-motion behavior retained.

- 2026-10-13 motion refinement: car rotates left/right around its vertical axis from -18 to +18 degrees; removed vertical translation and Z-axis tilt. Existing 16-second easing, pause control, and reduced-motion support retained.

- 2026-10-13 photography/rotation: replaced the photography slogan with Photography, the camera model, and an original code-drawn X100VI-inspired ASCII SVG. Metadata is in src/data/photography.ts; rebuild via design/generate-ascii-camera.cjs. Car now completes a continuous 24-second 360-degree Y-axis spin. This rotates the flat artwork, not a 3D vehicle model; that distinction was explained to Edwin. Pause/reduced-motion support remains.

- 2026-10-13: Edwin rejected the flat-paper appearance of the full spin. Replaced it with a restrained -8 to +8 degree Y-axis turn over 16 seconds with smooth easing; no full flip, vertical bobbing, or Z tilt.

- 2026-10-13 caption/flash refinement: Edwin requested no photo captions and a Godox flash on the ASCII camera. Removed visible captions from gallery tiles and the lightbox; lightbox retains only its counter and controls, and descriptive alt/accessibility labels remain. Removed the homepage photo subtitle. Interpreted XT30Pro as Godox iT30Pro using Godox's official product reference and added a mounted flash to the original ASCII illustration. Collection navigation remains.

- 2026-10-13: removed the visible Godox/iT30Pro and X100VI labels from the ASCII illustration, along with the camera-model subtitle below Photography. The FUJIFILM marking remains.

- 2026-10-13: restored only X100VI as the small subtitle beneath Photography, per Edwin. Illustration model labels remain removed.

- 2026-10-13: removed the homepage ASCII / photo credit disclosure at Edwin's request. Existing source/license metadata remains in the asset and background data.

- 2026-10-13 cursor interaction: replaced all car rotation and the pause button with a still ASCII silhouette. A local 80px cursor influence gently displaces nearby glyphs up to 19px; they ease back when the pointer leaves. The SVG is a static fallback, and touch/reduced-motion stays still. Interactive foreground controls suppress the effect. Rendering stops once characters settle; listeners and frames are cleaned up on unmount.

- 2026-10-13 hover coverage and gallery titles: removed foreground-section exclusions from the passive ASCII pointer handler so it reacts over the photo card and in the space below Spotify. Links remain usable; the embedded Spotify document still owns its own pointer events. Edwin clarified to rename existing groups only: Japan & China, Hikes with friends, With friends. Kept all photos, grouping, and order unchanged (7/5/3).

- 2026-10-13 project refresh: added BS Liquidity as a personal project with a detail route and live link. Copy uses Edwin's index-CFD trading workflow, position sizing/risk/stop-loss/take-profit inputs, daily stock heatmap and news. Verified public calculator/dashboard and matching local stack without importing app code. All cards now use framed previews; AIPM gets a focused risk-panel crop, BS Liquidity gets genuine screenshots, hackathons get native-resolution recording frames with recording labels, and Rewards gets a clearly labeled workflow SVG. Crop/type metadata lives in src/data/projects.ts. See design/project-assets.md for sources. No deployment.

- 2026-10-13 photo print frames: all gallery photos and the enlarged viewer use ivory Polaroid-style mats with deeper bottom borders and subtle shadows. Six portraits show sample aperture/shutter/ISO strips, explicitly requested by Edwin after confirming supplied collages lack exposure metadata. These are labeled Sample settings, stored in src/data/photos.ts, and are not real EXIF. Existing captions remain hidden; original crops and groups remain intact.

- 2026-10-13 favicon: added a custom serif E. in ivory on charcoal, echoing the homepage name and monochrome palette. src/app/icon.svg is the vector master; design/generate-favicon.cjs produces a 16/32/48px ICO and 180px Apple icon. Next file-based metadata registers the icons globally.

- 2026-10-13 project naming: renamed BS Liquidity to Index CFD Position Calculator across portfolio titles and descriptive copy. Existing route and external deployment URL retained.

- 2026-10-13 cleanup: removed visible Sample settings labels at Edwin's request; exposure values remain decorative and identified as samples in data/accessibility text. Simplified favicon to a single geometric white E on charcoal, removing serif details and dot; regenerated ICO and Apple icon.

- 2026-10-13 favicon refinement: pure black circular background with white geometric E and period; transparent corners. Regenerated ICO and Apple versions.

- 2026-10-14: Removed the homepage Away from the keyboard note and Vancouver roots / Waterloo days footer slogan at Edwin's request. Refined the black circular E. favicon with a larger custom serif letter and regenerated ICO/Apple assets. Typecheck and build passed; browser preview could not connect to headless Chrome.

- 2026-10-14: Added Edwin's supplied photography history beneath the homepage photo card: Taking photos since I was 15. / Canon R10, now Fujifilm X100VI. Copy lives in src/data/photography.ts and reuses the existing note styling. Typecheck and build passed.

- 2026-10-14 favicon revision: replaced the serif E. with a clean geometric EL monogram inside the existing black circle. Regenerated ICO and Apple assets and visually reviewed 16/32/64px raster previews in design/favicon-sizes.png. Typecheck and production build passed.

- 2026-10-14 favicon direction: Edwin rejected initials and invited a different symbol. Replaced EL with an original white outline camera and lens inside the black circle, referencing his photography. Regenerated all icon formats, inspected 16/32/64px previews, and passed typecheck/build.

- 2026-10-14 favicon direction: Edwin rejected the camera. Replaced it with an abstract tilted elliptical orbit and central dot in white on the black circle. Updated SVG, ICO, and Apple icon; inspected 16/32/64px previews. Typecheck and build passed.

- 2026-10-14: Hackathons now precedes Projects and is the default homepage collection; keyboard Home/End follow the new order. Added user-supplied placement badges from src/data/projects.ts: MIT Energy and Climate Hacks - Semi-finalists; Hack the Globe - 3rd.

- 2026-10-14 photo favicon: Edwin supplied a childhood photograph and requested a face crop. Built-in image editor produced a face-and-blue-hat crop (AI-processed, not a pixel-exact original crop), saved in design/favicon-face-source.png. Replaced icon.svg with icon.png and regenerated ICO/Apple icons. ICO generation now ensures RGBA for Next's decoder. Reviewed 16/32/64px previews; typecheck/build passed.

- 2026-10-14 placement emphasis: moved Semi-finalists and 3rd from card metadata onto the top-left of their preview images, below the Route map / Recording still bar. Larger bold text and pale-gold badges improve visibility. Typecheck and build passed; browser preview remains unavailable.

- 2026-10-14 placement correction: placement text now replaces Route map / Energy benefits in the preview header itself: Semi-finalists and 3rd place. Removed the image overlay badges; Recording still remains on the right. Typecheck and build passed.

- 2026-10-14 Pooh favicon: used Edwin's Downloads/download (1).jpg in full, resized proportionally with white padding and no cropping or AI edits. Original copied to design/favicon-pooh-source.jpg; updated icon.png, favicon.ico, and apple-icon.png. Inspected small-size previews; typecheck and build passed.

- 2026-10-14 Pooh crop: Edwin requested a tighter crop after the full-image version. Favicon generator now extracts a 72px square at (44,0) from the supplied JPG, focusing on Pooh's face and ears without AI edits. Source stays intact; all icon formats regenerated, small-size previews checked, typecheck/build passed.

- 2026-10-14: Undid the tight Pooh crop at Edwin's request. Restored the full supplied artwork, proportionally fitted with white padding, across all favicon formats.
