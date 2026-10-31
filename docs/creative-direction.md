# NatexWorks — new creative direction

## Positioning

NatexWorks is presented as an independent web development practice in India focused on business websites, custom web applications, interface refinement, and local SEO foundations.

Core message: **The web should work for your business.**

The experience should communicate practical capability, considered design, and trustworthy project context—not visual noise or invented scale.

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
- /services — Four clear service descriptions and a three-stage process sequence.
- /work — Selected project index with horizontal editorial motion on larger screens and natural touch scrolling on mobile.
- /work/[slug] — Individual project notes, challenge, approach, scope, and a grounded outbound link where available.
- /about — Working approach and capabilities without invented biography, timeline, awards, or client roster.
- /contact — Clear email contact and an enquiry form that prepares a message for the visitor's mail app.

## Four motion systems

1. **Pinned transformation story — Home.** Three frames move from brief to interface to system. GSAP ScrollTrigger maps the sequence to actual scroll progress. On smaller screens / reduced-motion preferences, each frame remains in document flow.
2. **Pinned service journey — Services.** Understand → Shape → Build. Each panel describes a real project stage; it does not hide core service information.
3. **Horizontal editorial gallery — Work.** A horizontal project rail maps vertical scroll progress to the gallery on larger screens. Touch devices can swipe the rail naturally.
4. **Layered case-study panels — Project detail.** CSS sticky panels create a quiet sense of depth while reading challenge, approach, and scope. On small screens they return to normal flow.

Simple reveals and hover feedback are supporting motion, not additional headline interaction systems.

## Technology ownership

- Next.js App Router and React Server Components provide route structure and essential content.
- Client components are reserved for the mobile navigation, contact form, and GSAP motion coordinator.
- GSAP owns scroll-linked timelines and pins.
- CSS owns layout, static perspective mockups, hover, focus, and responsive changes.
- Three.js / React Three Fiber are available in the dependency set but are not loaded into the new experience by default. Introduce them only when a real 3D scene has a storytelling or interaction reason.
- Motion and Lenis are not added; native scrolling remains the default.

## Accessibility and performance rules

- Respect prefers-reduced-motion; essential content never depends on animation.
- Scroll-linked pinning activates only on wide screens with motion permitted.
- Mobile navigation is keyboard-operable and has explicit expanded state.
- Use semantic landmarks, labelled controls, visible focus, descriptive links, and form validation.
- Avoid decorative canvas-only text and unnecessary continuous render loops.
- Keep project previews lightweight CSS compositions; replace them with optimised real media only after approval.
- Verify actual Core Web Vitals and Lighthouse in the deployment environment. Targets are goals, not claimed measurements.

## Content truth

- Inventory Management System: existing portfolio describes a MERN-stack build and links to a live demo. Sample interface data is illustrative; live demo functionality must be checked in the demo.
- Neswef Café: presented as an existing website preview. No client outcome or commercial claim is added.
- Local Search & Maps: explicitly labelled as a concept. Map pins and result layout are illustrative and do not claim rankings.
- Email: natexworks@gmail.com.
