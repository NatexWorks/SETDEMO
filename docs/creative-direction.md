# NatexWorks — new creative direction

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

Typography:
- Space Grotesk for headlines, body, navigation, and interface labels.
- IBM Plex Mono for small technical annotations and section indices.
- Large headings use compact line-height and negative tracking; paragraphs stay comfortably readable.

Composition:
- Editorial grid, generous gutters, restrained borders, and clear content hierarchy.
- Asymmetric layouts only where they improve visual storytelling.
- Project imagery is purpose-built HTML/CSS artwork until approved genuine project screenshots are supplied.
- No stock image is presented as proof of client work.

## Site architecture

- / — Positioning, transformation story, services, selected work, approach, contact invitation.
- /services — Four service descriptions and a three-stage project process transformation.
- /work — Selected project index with a horizontal editorial rail on large screens and natural touch scrolling on tablet/mobile.
- /work/[slug] — Individual project notes: challenge, approach, work included, outcome/evidence, and grounded outbound link.
- /about — Working approach and capabilities without invented biography, timeline, awards, or client roster.
- /contact — Email-based enquiry form that prepares a message for the visitor's mail app. It does not transmit or store submissions.

## Four motion systems

1. **Pinned transformation story — Home.** Three frames progress from brief to interface to system. GSAP ScrollTrigger maps the sequence to scroll progress. On smaller screens / reduced-motion preferences, every frame remains in normal document flow.
2. **Scroll-driven assembly — Services.** A visual changes from project brief to interface to connected workflow. The text cards remain present; GSAP transforms the illustrative artwork and highlights the matching step. Mobile uses a normal-flow text sequence.
3. **Horizontal editorial gallery — Work.** A horizontal project rail maps vertical scroll progress on wide screens. Tablet/mobile visitors can swipe it naturally.
4. **Layered case-study panels — Project detail.** CSS sticky panels create a quiet sense of depth while reading challenge, approach, scope, and evidence. On small screens they return to normal flow.

About is intentionally editorial and content-led. Contact is intentionally straightforward. Simple reveals and hover feedback are supporting motion, not the page's main interaction.

## Technology ownership

- Next.js App Router and React Server Components provide routes and essential content.
- Client components are limited to the mobile navigation, contact form, motion coordinator, and lazy 3D loader.
- GSAP owns pinned timelines and scroll-linked transformations. It is imported only when a wide viewport permits motion.
- CSS owns layout, typography, panels, simple perspective artwork, hover, focus, and responsive fallbacks.
- React Three Fiber / Three.js render one decorative network visual on the homepage. It loads only near the hero on fine-pointer desktops with motion permitted; it uses `frameloop="demand"`, modest DPR, no continuously animated loop, and a CSS fallback.
- The existing React Three Fiber dependency is reused. Drei, Motion, and Lenis are not added.
- Native scrolling remains the default; no routing-transition library is introduced.

## Accessibility and performance rules

- Respect prefers-reduced-motion; essential content never depends on animation.
- Scroll pinning activates only at 1024px and above with motion permitted.
- The 3D hero is disabled for touch-first and reduced-motion contexts; no text is rendered only in canvas.
- Mobile navigation has expanded state and an Escape-key close behaviour.
- Use semantic landmarks, labelled controls, visible focus, descriptive links, and native form validation.
- R3F uses a demand-driven render mode and is loaded only near the visible hero.
- Project previews are lightweight CSS compositions until approved genuine project media is available.
- Verify actual Core Web Vitals and Lighthouse in the deployment environment. Targets are goals, not claimed measurements.

## SEO and deployment

- Page metadata, canonical URLs, Open Graph, Twitter cards, organization/website JSON-LD, robots, and sitemap are implemented.
- `SITE_URL` must be set to the final canonical origin before deployment.
- `SITE_INDEXABLE` defaults to false. Until explicitly enabled, metadata is noindex, robots disallow crawling, and the sitemap is empty.
- `GOOGLE_SITE_VERIFICATION` is optional and should contain only a token issued by Search Console.
- This is a Next.js App Router application intended for a Node-compatible host (for example Vercel). GitHub Pages static hosting is not configured for this App Router build.
- No deployment has been performed.

## Content truth

- Inventory Management System: the existing portfolio identifies a MERN-stack build and links to a live demo. Preview numbers are illustrative; the demo is the source of truth for currently enabled features. No adoption, revenue, time-saved, or production impact is claimed.
- Neswef Café: an existing website preview link is included. No analytics or commercial results are claimed.
- Local Search & Maps: explicitly labelled as a concept. Map pins and result layout are illustrative and do not claim rankings or campaign outcomes.
- Email: natexworks@gmail.com.
