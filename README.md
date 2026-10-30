# NatexWorks Portfolio

A responsive, dark portfolio website for NatexWorks, built with semantic HTML, CSS, and vanilla JavaScript.

## Preview

Open the live site after enabling GitHub Pages:
**Settings → Pages → Deploy from a branch → main → /(root) → Save**

The URL will be: https://natexworks.github.io/Portfolio/ (GitHub Pages URLs may be case-sensitive; confirm the URL in repository Settings → Pages).

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

- GSAP 3.15.0 + ScrollTrigger: scroll-linked workflow card entrances and the section handoff on the inventory case study.
- Lenis 1.3.27: mobile-only smooth scrolling, connected to the GSAP ticker; native desktop/tablet scrolling is preserved.
- Three.js 0.186.1: a small decorative 3D wireframe accent in the homepage project preview. It is lazy-loaded and omitted for data-saver / low-memory devices.
- Lucide 1.64.0: consistent inline SVG icons.
- Open Graph and Twitter preview metadata use the shared `og-image.svg` artwork. SETDEMO pages carry `noindex` metadata and retain Portfolio canonicals so the staging copy is not intended for search indexing.

All third-party scripts are CDN-loaded; the project still has no build step. When a CDN is unavailable, existing CSS/native-scroll fallbacks remain available.
