# NatexWorks Portfolio

A responsive, dark portfolio website for NatexWorks, built with semantic HTML, CSS, and vanilla JavaScript.

## Preview

Open the live site after enabling GitHub Pages:
**Settings → Pages → Deploy from a branch → main → /(root) → Save**

The staging preview URL is: https://natexworks.github.io/SETDEMO/ (GitHub Pages URLs may be case-sensitive; confirm deployment status in Actions).

## Features

- Responsive layout for mobile, tablet, and desktop
- Dark olive/charcoal palette with lime accents
- Animated hover states and subtle scroll-reveal effects
- Mobile navigation with keyboard Escape support
- Respects the operating system's `prefers-reduced-motion` setting
- Semantic sections, skip link, focus-visible styles, and labelled navigation
- No framework or build step required

## Files

- `index.html` — main portfolio, services, and featured projects
- `style.css` — responsive layout, glass navigation, visual system, and motion
- `script.js` — menu interactions, typewriter effect, and reveal effects
- `inventory.html` — dedicated Inventory Management System case study
- `inventory.css` — responsive product preview, comparison table, and case-study styling
- `inventory.js` — glass menu, scroll reveals, and editable cost/time estimate calculator

## Before publishing

1. Verify every project link and demo capability.
2. Replace illustrative inventory metrics and sample café branding with verified product screenshots/details when available. The inventory case-study dashboard is a code-built preview, not a captured screenshot of the live app.
3. Add real case studies and only publish outcomes you can substantiate.
4. Test navigation, email link, keyboard focus, reduced motion, and layouts at 320px, 375px, 768px, and 1280px widths.
5. Check contrast and run Lighthouse or another accessibility/performance audit.
6. Enable GitHub Pages using the steps above.

## Motion and usability

Motion is intentionally subtle and used to support feedback and hierarchy—not to pressure visitors or hide information. Scroll reveals are disabled when reduced motion is requested. Important content remains in the document without JavaScript.

## Contact

natexworks@gmail.com


## Experimental motion stack (SETDEMO)

- GSAP 3.15.0 + ScrollTrigger: scroll-linked workflow card entrances and the section handoff on the inventory case study; libraries load only on eligible mobile devices.
- Lenis 1.3.27: mobile-only smooth scrolling, synchronized with the GSAP ticker; native desktop/tablet scrolling is preserved.
- Three.js 0.186.1: a decorative 3D wireframe accent in the homepage preview, loaded only after desktop pointer or keyboard focus intent. Mobile and reduced-motion visitors retain a lightweight inline SVG fallback.
- Lucide icon artwork: the selected icons are embedded as inline SVGs, avoiding the full icon-library runtime on every page.
- Open Graph and Twitter preview metadata use the shared `og-image.svg` artwork. SETDEMO pages carry `noindex` metadata and retain Portfolio canonicals so the staging copy is not intended for search indexing.

All third-party scripts are CDN-loaded; the project still has no build step. When a CDN is unavailable, existing CSS/native-scroll fallbacks remain available.


## Lighthouse-focused refinements (staging)

- Kept the existing page layouts and card order; contrast fixes adjust only secondary-label colors.
- Replaced typewriter `aria-label` attributes on non-interactive spans/paragraphs with visually hidden full text plus an `aria-hidden` animated visual copy.
- Removed unnecessary animation libraries from the homepage and services page; inventory motion dependencies are requested only on eligible mobile devices, with a native-scroll fallback.
- Reduced the featured café image payload using responsive `srcset` sizes and a smaller encoded rendition.
- Deferred the optional 3D accent until desktop pointer/focus intent; mobile keeps a static SVG fallback.
- The staging site intentionally remains `noindex,nofollow`; Lighthouse's crawlability/SEO check therefore stays flagged until the staging copy is promoted to the canonical production host.
