# NatexWorks — premium portfolio rebuild

This branch contains a new NatexWorks portfolio built from a fresh App Router page architecture. The existing website is treated as a separate legacy project and is not used as the layout or visual template.

**Active rebuild branch:** `rebuild/premium-portfolio`  
**Production branch:** `main` (left unchanged by this work)

## Creative direction

The new site uses an editorial warm-neutral canvas, ink typography, cobalt accents, and restrained coral details. It is intentionally separate from the previous olive/lime portfolio.

The previous HTML/CSS remains in the repository as legacy source material only. Automatic `predev` and `prebuild` hooks have been removed so the new app no longer extracts or injects the old page markup during normal development or builds.

## Routes

- `/` — Home
- `/services` — Services and process transformation
- `/work` — Selected projects
- `/work/[slug]` — Individual case studies
- `/about` — Practice and working approach
- `/contact` — Project enquiry
- `/inventory.html` — Redirects to the new inventory case study

## Motion and 3D systems

- **Home:** pinned brief → interface → system story on wide screens.
- **Hero 3D:** lazy-loaded React Three Fiber / Three.js network visual. It loads only near the hero on fine-pointer desktop screens when reduced motion is not requested. It uses demand-driven rendering and a CSS fallback.
- **Services:** a pinned brief → interface → connected workflow assembly. The explanatory process cards remain readable; the visual changes with scroll progress.
- **Work:** horizontal editorial gallery on wide screens; native touch scrolling on tablet and mobile.
- **Case studies:** layered sticky panels on larger screens; normal document flow on small screens.

GSAP owns scroll-linked timelines and pins. CSS owns layout, typography, responsive behaviour, focus states, and fallback artwork. The existing GSAP and React Three Fiber dependencies are reused. Motion, Lenis, Drei, and a route-transition framework are not added.

Reduced-motion visitors receive normal document flow and do not load the decorative WebGL scene. Mobile and touch-first visitors keep natural scrolling.

## Project facts retained

- **Inventory Management System:** MERN-stack build with an existing live demo link. Portfolio preview data is illustrative; verify enabled features in the live demo. No adoption, revenue, time-saved, or production-impact metrics are claimed.
- **Neswef Café:** existing website preview link, without invented commercial outcomes.
- **Local Search & Maps:** concept presentation only, not a live SEO campaign or ranking result.
- **Contact:** `natexworks@gmail.com`.

Every case study includes challenge, approach, work included, and an outcome/evidence statement describing what can actually be claimed.

## Local development

Use the repository's existing lockfile.

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Validation commands:

```bash
npm run lint
npm run typecheck
npm run build
```

The GitHub Actions workflow `.github/workflows/portfolio-ci.yml` is configured to run lint, type checking, and a production build on pushes to `rebuild/**` and on pull requests to `main`. Check the Actions run before promoting the branch.

## SEO and indexing controls

Set `SITE_URL` to the full production origin before deployment. Set `SITE_INDEXABLE=true` only after the production host and content are approved. Until then, metadata remains noindex, robots disallows crawling, and the sitemap is empty.

Optionally set `GOOGLE_SITE_VERIFICATION` to the verification token supplied by Search Console. Do not invent a token.

## Deployment

This is a Next.js App Router application intended for a Node-compatible host such as Vercel. GitHub Pages static hosting is not configured for this server-capable App Router build. No production deployment has been performed.

Before deployment:
1. Choose the canonical production host and set `SITE_URL`.
2. Verify the host supports the Next.js App Router runtime.
3. Review every project link and confirm live demo features.
4. Test the full responsive matrix, keyboard flow, reduced motion, and WebGL fallback.
5. Run lint, type checking, production build, and Lighthouse on the deployed preview.
6. Set `SITE_INDEXABLE=true` only after approval.

## Research and handoff

- `docs/reference-analysis.md` — seven-reference evidence matrix and inspection limitations.
- `docs/creative-direction.md` — visual system, architecture, motion systems, technology ownership, SEO, and content-truth rules.

