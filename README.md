# NatexWorks — premium portfolio rebuild

This branch starts a new portfolio experience for NatexWorks using the existing Next.js App Router repository as the technical workspace.

Active rebuild branch: rebuild/premium-portfolio  
Production branch: main (left unchanged by this rebuild)

## Creative direction

The new site uses an editorial warm-neutral canvas, ink typography, cobalt accents, and restrained coral details. It is intentionally separate from the previous olive/lime portfolio.

The previous HTML/CSS source is not used as the new page template. It remains in the repository as a legacy source and as a reference for verifying business facts and existing project links.

## Routes

- / — Home
- /services — Services and project process
- /work — Selected work
- /work/[slug] — Individual project pages
- /about — Practice and working approach
- /contact — Project enquiry
- /inventory.html — Redirects to the inventory project case study

## Motion systems

- Home: pinned three-stage brief → interface → system transformation on supported desktop screens.
- Services: pinned understand → shape → build sequence.
- Work: horizontal editorial project rail on supported desktop screens; natural horizontal touch scrolling on mobile.
- Case studies: layered sticky reading panels, returning to normal flow on small screens.

GSAP owns scroll-linked timelines. CSS owns layout, static perspective artwork, and hover/focus feedback. Three.js and React Three Fiber remain available in the dependency set but are not loaded unless a real 3D requirement justifies them.

Reduced-motion preferences and small-screen layouts use non-pinned content and preserve essential information.

## Existing project facts retained

- Inventory Management System: MERN-stack project with an existing live demo link. Preview/sample numbers are labelled illustrative; live demo functionality is the source of truth.
- Neswef Café: presented as an existing website preview, without invented client outcomes.
- Local SEO & Maps: presented as a concept, not a live campaign or ranking result.
- Contact: natexworks@gmail.com.

## Local development

Use the lockfile and installed dependency versions in this repository.

npm ci
npm run dev

Validation commands:

npm run lint
npm run typecheck
npm run build

These commands are documented for local execution; this branch's GitHub files have not been executed in a local build environment as part of this handoff.

## SEO configuration

Set SITE_URL to the final canonical site URL in the deployment environment. The App Router metadata, robots route, and sitemap use this configured value (with a repository staging fallback).

The staging branch should not be indexed until it has a stable public URL and final content has been approved. Review canonical URLs, social preview images, sitemap output, and deployment behaviour before promoting the branch.

## Reference research and design notes

- docs/reference-analysis.md contains the seven-reference matrix, including browser inspection limitations.
- docs/creative-direction.md defines the new visual system, architecture, motion ownership, and content-truth rules.

## Important deployment note

No production deployment has been performed. Review the branch, run validation commands, configure SITE_URL, and deploy only after approving the completed implementation.
