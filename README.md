# NatexWorks — premium portfolio rebuild

This branch contains the Next.js App Router portfolio rebuild. The production `main` branch is not modified by the rebuild work.

## Routes

- `/` — Home, selected work, mobile inventory workflow story, services preview, and About preview
- `/services` — Service details, project process, and related work
- `/work` — Selected projects
- `/work/inventory-management` — Inventory product case study
- `/work/cafe-presence` — Neswef Café website-preview case study
- `/work/local-search-concept` — Local-search concept
- `/about` — Personal introduction and working approach
- `/contact` — Contact details and email-draft form
- `/start-project` — Structured project enquiry with optional project preselection
- `/inventory.html` — Legacy route redirect to the Inventory Management case study

## Motion and responsive behaviour

- Wide-screen Home and Services stories, Work gallery, and case panels use the existing GSAP / ScrollTrigger stack.
- The primary new mobile story uses four equal cards in the order Catalog → Stock → Checkout → Barcode. A short ScrollTrigger timeline maps the natural vertical scroll progress to diagonal card entrances, stacked card edges, and the transition into the next Services panel.
- Reduced-motion and JavaScript fallbacks retain every card in normal document flow.
- The R3F hero is loaded only near the viewport on supported fine-pointer desktop contexts; mobile and reduced-motion visitors receive the CSS fallback.
- No additional animation library is installed.

## Project facts

- **Inventory Management System:** the public source repository contains product/category management, stock review, camera barcode scanning, order state transitions, returns, and reporting. The live demo may differ from the source. No adoption, revenue, time-saved, or production-impact metrics are claimed.
- **Neswef Café:** a website preview with a separate menu page. Menu items, prices, address, hours, and contact details are sample content; the reservation form opens an email draft and does not confirm a booking.
- **Local Search & Maps:** concept only, not a live campaign or ranking claim.
- **Contact:** `natexworks@gmail.com`.

## Local development

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

The GitHub Actions workflow runs lint, type checks, a production build, and production-server route smoke tests. Read `docs/implementation-audit.md`, `docs/reference-analysis.md`, and `docs/creative-direction.md` for the audit, reference mapping, and motion/content rules.

## SEO and deployment

Set `SITE_URL` to the final production origin before deployment. Set `SITE_INDEXABLE=true` only after the canonical host and content are approved. Until then, the site remains noindex and its sitemap is empty. No production deployment has been performed.
