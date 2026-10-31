# SETDEMO repository audit and implementation plan

Audit date: 31 October 2026

## Repository and architecture

- The active portfolio rebuild is a Next.js App Router application on the `rebuild/premium-portfolio` branch. The production `main` branch was left untouched by this implementation.
- The rebuild uses React 19, TypeScript, GSAP / ScrollTrigger, Three.js, and React Three Fiber. No additional animation dependency is required.
- No `AGENTS.md` / `agents.md` project instruction file was present in the inspected repository tree.
- Existing route architecture included Home, Services, Work, dynamic project details, About, Contact, and a legacy `/inventory.html` redirect. A dedicated `/start-project` route was missing.
- Existing contact handling was an email-draft handoff, not a server-side form submission.
- Existing GSAP pinning was restricted to wide desktop layouts. Mobile relied on static content and native scrolling.
- Portfolio project artwork is composed from HTML/CSS. No authentic application screenshots were present in the portfolio assets reviewed, so the artwork remains labelled as illustrative rather than being represented as a product screenshot.

## Inventory Management source verification

The linked public source repository is `NatexWorks/Inventory-Management-System`. Its current source tree verifies these capabilities:

- Product and category create/list/update flows, with product search covering name, description, category, SKU, and barcode.
- Product stock quantities and a dashboard query that flags stock of five units or fewer.
- Barcode records, camera scanning through ZXing, and support for EAN-13, EAN-8, UPC-A, and Code 128 formats in the scanner component.
- Order creation, pending approval, completion, cancellation, and return handling. Order completion decrements product stock; cancellation releases reserved barcodes.
- Dashboard and report summaries including recent orders, low-stock products, completed-order revenue, top products, and category analytics.
- Current package metadata identifies Next.js 16, React 19, MongoDB, Mongoose, and ZXing. The earlier portfolio label “MERN stack” is not repeated as a verified stack description because the inspected source package does not list Express.

The linked live deployment may not run the exact current source commit or contain the same configuration. The case study therefore distinguishes source-verified capabilities from the live demo state and does not claim business outcome metrics.

## Café Presence source verification

The linked public source repository is `NatexWorks/Neswef`. Its README and page sources verify:

- A responsive café website concept with a warm paper, forest-green, and terracotta visual direction.
- Homepage sections for brand, story, ambience, menu highlights, and visit details.
- A separate `menu.html` page with 25 sample menu entries, live search, and category browsing.
- Mobile navigation with Escape-key support and reduced-motion handling.
- A reservation request form that validates fields and opens an email draft.

The README explicitly says the menu, prices, address, opening hours, email, and social details are sample content to replace. The form does not store requests or confirm bookings. The portfolio describes this as a website preview, not a connected booking product or proven client result.

## Services route investigation

On the active rebuild branch, `app/services/page.tsx` is a server-rendered App Router page with local data imports. The inspected source does not show a browser-only API, a missing client boundary, or an external API dependency that would explain the earlier “This page could not load” screen. The previous runtime failure could not be reproduced through source inspection alone.

The route remains a server component and receives a production-build HTTP smoke test alongside the other important routes. A successful smoke test verifies that the built route responds; it does not identify the historical failure cause on a prior deployment.

## Implementation plan

1. Preserve the active Next.js rebuild and existing desktop interaction systems.
2. Add a mobile-only, progress-linked inventory workflow story in the exact order Catalog → Stock → Checkout → Barcode. Keep the cards in normal document flow unless motion support is available; retain all copy when reduced motion is requested.
3. Expand the inventory and café project details into separate case-study experiences using the verified source facts above.
4. Add a dedicated project enquiry route and make the distinction between opening an email draft and submitting/storing an enquiry explicit.
5. Complete navigation, About content, related-service links, and route metadata / sitemap coverage.
6. Add a production-server route smoke test to CI. Use CI results rather than claiming a local build or device test that was not run.
