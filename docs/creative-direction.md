# NatexWorks — premium portfolio creative direction

## Positioning

NatexWorks is presented as an independent web development practice in India focused on business websites, custom web applications, interface refinement, and local SEO foundations.

Core message: **The web should work for your business.**

The experience communicates practical capability, considered design, and trustworthy project context—not visual noise or invented scale.

## Visual identity

| Token | Value | Role |
|---|---|---|
| Paper | #f2f0e9 | Main canvas |
| Paper deep | #e9e6dc | Alternate editorial bands |
| White | #fbfaf6 | Interface and cards |
| Ink | #171a22 | Main typography and footer |
| Muted | #73756f | Supporting copy |
| Line | #d4d1c7 | Rules and borders |
| Cobalt | #3358df | Primary action and emphasis |
| Deep cobalt | #2443bd | Hover / active |
| Coral | #f07859 | Small contrast accent |
| Mint | #b8d8c9 | Reserved secondary accent |

Typography uses Space Grotesk for display/body and IBM Plex Mono for technical labels. Composition uses an editorial grid, generous gutters, restrained borders, and asymmetric layouts only where they improve the story.

## Routes

- `/` — Positioning, introduction, selected work, a four-card inventory workflow story, services preview, About preview, and project CTA.
- `/services` — Four service descriptions, process transformation, related work, and a project CTA.
- `/work` — Selected project index.
- `/work/inventory-management` — Independent inventory product case study based on source-verified functionality.
- `/work/cafe-presence` — Independent Neswef Café website-preview case study.
- `/work/[slug]` — The remaining concept case study.
- `/about` — Personal introduction and working approach based on existing portfolio content.
- `/contact` — Contact details and an explicitly labelled email-draft handoff.
- `/start-project` — Structured enquiry with project context preselection.

## Motion systems

1. **Home transformation story.** On wide screens, a GSAP ScrollTrigger timeline moves from brief to interface to connected system. Smaller screens preserve natural flow.
2. **Services assembly.** A scroll-linked visual moves through brief, interface, and workflow stages. The supporting text stays available without animation.
3. **Work index.** The horizontal editorial rail is reserved for wide screens; touch screens use natural horizontal swipe.
4. **Mobile workflow narrative.** Corn Revolution's documented continuous-scroll storytelling is reinterpreted as a mobile-first sequence: Catalog → Stock → Checkout → Barcode. Four same-size cards enter alternately from the sides and stack with visible edge spacing. The progress-linked stack tilts and scales back as the following Services panel rises into the foreground. This uses a short native vertical scroll range, not forced horizontal scrolling or scroll-event counters.
5. **Project details.** Inventory and Café Presence have different content structures and visual accents. Mobile project chapters reveal progressively while all content remains readable in normal flow.

GSAP owns scroll-progress timelines. CSS owns layout, typography, card dimensions, shadows, focus states, and static fallbacks. No new animation library is introduced. The existing Three.js/R3F hero remains lazy-loaded only for fine-pointer desktop contexts; mobile and reduced-motion contexts use the CSS fallback.

## Mobile and accessibility rules

- The dedicated four-card animation is limited to small viewports and `prefers-reduced-motion: no-preference`.
- The scroll range is progress-linked and uses a sticky visual stage while the document continues to scroll naturally.
- Every card remains in the HTML and is shown in normal flow if JavaScript, GSAP, or motion preference disables the animation.
- No essential copy, route, or action depends on the animated state.
- Mobile does not load the 3D hero canvas. No device rotation, long-press, or horizontal scroll requirement is introduced.
- Animation contexts and ScrollTriggers are reverted on teardown and media-query changes.
- Preserve the existing desktop/tablet layout and interaction systems outside the newly requested page content.

## SEO and deployment

- Each route has a distinct title, description, and canonical URL.
- Open Graph and Twitter metadata, Organization/WebSite structured data, robots, and sitemap are provided.
- `SITE_URL` must be set to the final canonical origin before deployment.
- `SITE_INDEXABLE` defaults to false. Until explicitly enabled, metadata is noindex, robots disallow crawling, and the sitemap is empty.
- No production deployment or Lighthouse/Core Web Vitals measurement is claimed.

## Content truth

- Inventory Management: capabilities are checked against its public source repository. The live deployment may differ; the project reports no business outcome metrics. CSS portfolio artwork is illustrative.
- Neswef Café: the website preview is based on the source repository. Menu, price, address, opening-hour, and contact fields are sample details; the reservation form opens an email draft and is not a booking backend.
- Local Search & Maps: concept only. Illustrative map pins do not represent live rankings or campaign results.
- Contact: `natexworks@gmail.com`. Forms open a mail draft; no server-side submission or storage is configured.
