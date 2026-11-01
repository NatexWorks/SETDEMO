# NatexWorks — Master Quality Assurance Prompt

Act as a senior QA engineer, accessibility specialist, frontend reliability engineer, and performance auditor. Audit the complete NatexWorks website—not only the page currently being edited.

## Mission

Verify that every route, internal navigation link, visible button, form, menu, interactive control, animation fallback, and important external handoff behaves as intended. Find and fix real bugs. Do not make visual redesigns or change page copy unless a defect requires it. Preserve desktop/tablet/mobile layouts and existing interactions.

## Routes in scope

- /
- /services
- /work
- /work/inventory-management
- /work/local-discovery
- /work/cafe-presence
- /about
- /contact
- /start-project

## Required test layers

1. **Vitest** — fast unit and component-level test runner.
2. **React Testing Library + user-event + jest-dom** — exercise UI through accessible roles, labels, keyboard actions, and realistic form interactions. Test the mobile navigation and enquiry form contracts.
3. **Playwright** — real-browser end-to-end checks across Chromium, desktop/mobile widths, routes, links, buttons, forms, keyboard paths, reduced motion, console errors, page errors, redirects, and request failures. Click each meaningful control and assert its expected result; do not merely assert that an element exists.
4. **axe-core via @axe-core/playwright** — automated WCAG A/AA checks on every route at mobile and desktop sizes, including states opened by interaction.
5. **Lighthouse CI** — audit performance, accessibility, best practices, and SEO on representative production-build routes. Store JSON/HTML reports as CI artifacts.

Use Playwright's native request routing to simulate blocked, timed-out, and failed browser resources and confirm that the interface degrades gracefully. Do not add a network-mocking layer that the application does not need: the current portfolio has no runtime fetch/XHR API, and its enquiry forms intentionally open a prefilled mail draft rather than submit to a server. Add MSW only when the application gains an actual API-backed flow that needs request/response contract tests.

## Behavioural coverage

- Check every route returns the expected final URL and a successful status; verify intentional redirect chains terminate within a small limit and never loop or escape to an unexpected host.
- Validate all internal links and click primary navigation, project cards, service proof links, footer actions, and CTAs. Internal navigation should use Next.js client-side navigation where appropriate; ensure it does not unexpectedly reload the whole document.
- Exercise the mobile menu open/close flow, Escape key, focus restoration, active route state, and link selection.
- Exercise forms with empty, malformed, and valid data. Confirm native validation, correct field labels, query-string prefill, the mailto draft content, and the explicit no-server-submission disclosure. Never send real enquiries during tests.
- Check every visible button is enabled/disabled appropriately and has an expected outcome. Do not blindly click destructive or external actions; define an assertion for each action first.
- Check responsive overflow at 320, 360, 390, 430, 768, 1024, 1280, and 1440px.
- Check browser console errors, unhandled page exceptions, same-origin failed requests, HTTP 4xx/5xx responses, missing assets, and failed external resources. Separate actionable same-origin failures from third-party warnings; never silently discard either.
- Test reduced-motion mode and graceful fallbacks when WebGL or remote Earth textures fail.
- Verify that no click causes a blank page, broken route, unexpected full reload, JavaScript exception, or stuck loading state.
- Keep visual regression snapshots for key layouts where stable baselines exist. Do not update snapshots merely to hide an unexplained visual change.

## Fix and report

For every issue: reproduce it, identify the root cause, fix it at the correct layer, and add a regression test. Do not hide failures with broad timeouts, disabled assertions, blanket route exclusions, or ignored console errors. Keep a documented allowlist only for known, non-critical third-party failures, with an explanation and owner.

Run lint, typecheck, production build, unit/component tests, browser E2E tests, accessibility checks, responsive checks, network/redirect checks, and Lighthouse CI. Report exact commands, route/viewport coverage, issue fixes, remaining risks, and pass/fail counts. Never claim a test passed unless its result was observed in CI or in a real local run.


## Running the suite

The QA-only tools are installed without changing the production dependency lockfile:

```bash
npm ci
npm run qa:install
npx playwright install chromium
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run start
npm run test:browser
npm run test:interactions
CHROME_PATH="$(node -e 'process.stdout.write(require("playwright").chromium.executablePath())')" npm run test:lighthouse
```

The CI workflow runs the same stages against a production build and stores browser screenshots and Lighthouse reports under `artifacts/`. The website currently has no server API or fetch/XHR submission flow; the forms intentionally create `mailto:` drafts. For that reason, network failure simulation uses Playwright's real-browser routing and request events instead of adding MSW to mock an endpoint that does not exist. If a real API is introduced, add MSW handlers and contract tests for that API at that time.
