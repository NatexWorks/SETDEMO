import { chromium } from "playwright";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";
const origin = new URL(baseURL).origin;
const sameOrigin = (url) => { try { return new URL(url).origin === origin; } catch { return false; } };
const failures = [];
const warnings = [];
const navigationResults = [];
const buttonInventory = {};
const networkEvents = [];
const browser = await chromium.launch({ headless: true });

function monitor(page, label) {
  page.on("pageerror", (error) => failures.push(label + ": page error: " + error.message));
  page.on("console", (message) => {
    if (message.type() === "error") failures.push(label + ": console error: " + message.text());
  });
  page.on("requestfailed", (request) => {
    const issue = {
      type: "requestfailed",
      url: request.url(),
      error: request.failure()?.errorText || "unknown",
    };
    networkEvents.push({ ...issue, page: label });
    if (sameOrigin(request.url())) failures.push(label + ": same-origin request failed: " + issue.url + " (" + issue.error + ")");
    else warnings.push(label + ": third-party request failed: " + issue.url + " (" + issue.error + ")");
  });
  page.on("response", (response) => {
    if (response.status() < 400) return;
    const issue = { type: "http-error", url: response.url(), status: response.status() };
    networkEvents.push({ ...issue, page: label });
    if (sameOrigin(response.url())) failures.push(label + ": same-origin HTTP " + response.status() + ": " + response.url());
    else warnings.push(label + ": third-party HTTP " + response.status() + ": " + response.url());
  });
}

try {
  // Walk every public route and inventory every visible button/control.
  const routes = [
    "/", "/services", "/work", "/work/inventory-management",
    "/work/local-discovery", "/work/cafe-presence",
    "/about", "/contact", "/start-project",
  ];

  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    monitor(page, route);
    const response = await page.goto(baseURL + route, { waitUntil: "domcontentloaded" });
    if (!response || response.status() !== 200) {
      failures.push(route + ": route did not return HTTP 200 (" + (response?.status() ?? "no response") + ")");
    }
    const resolved = new URL(page.url());
    if (resolved.origin !== origin || resolved.pathname !== route) {
      failures.push(route + ": unexpected redirect destination " + page.url());
    }

    const controls = await page.locator("button:visible").evaluateAll((buttons) =>
      buttons.map((button) => ({
        label: (button.getAttribute("aria-label") || button.innerText || "").trim().replace(/\s+/g, " "),
        type: button.getAttribute("type") || "implicit",
        disabled: button.disabled,
      })),
    );
    buttonInventory[route] = controls;
    for (const control of controls) {
      if (!control.label) failures.push(route + ": visible button has no accessible name");
    }

    const unsafeBlankLinks = await page.locator('a[target="_blank"]').evaluateAll((links) =>
      links
        .filter((link) => !/(^|\s)noopener(\s|$)/i.test(link.getAttribute("rel") || "") &&
          !/(^|\s)noreferrer(\s|$)/i.test(link.getAttribute("rel") || ""))
        .map((link) => link.href),
    );
    for (const href of unsafeBlankLinks) failures.push(route + ": target=_blank link is missing noopener/noreferrer: " + href);

    await page.close();
  }

  // These are real user journeys. The document sentinel detects hard reloads:
  // client-side Next.js navigation must preserve the current JS document.
  const navigationChecks = [
    { from: "/", selector: '.desktop-nav a[href="/services"]', to: "/services", label: "header Services" },
    { from: "/", selector: '.desktop-nav a[href="/work"]', to: "/work", label: "header Selected work" },
    { from: "/", selector: ".header-cta", to: "/start-project", label: "header Start a project" },
    { from: "/work", selector: 'a[href="/work/local-discovery"]', to: "/work/local-discovery", label: "Local Discovery project card" },
    { from: "/work/local-discovery", selector: '.case-next a[href="/contact"]', to: "/contact", label: "Local Discovery contact CTA" },
    { from: "/services", selector: 'a[href="/work/local-discovery"]', to: "/work/local-discovery", label: "Services local-discovery proof link" },
  ];

  for (const check of navigationChecks) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    monitor(page, check.label);
    await page.goto(baseURL + check.from, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => { window.__natexQaDocumentSentinel = "same-document"; });
    const link = page.locator(check.selector).first();
    if (!(await link.count())) {
      failures.push(check.label + ": control not found");
      await page.close();
      continue;
    }
    await link.click();
    await page.waitForURL((url) => url.origin === origin && url.pathname === check.to, { timeout: 15000 }).catch(() => {
      failures.push(check.label + ": click did not navigate to " + check.to + " (current: " + page.url() + ")");
    });
    const sentinel = await page.evaluate(() => window.__natexQaDocumentSentinel || null).catch(() => null);
    if (sentinel !== "same-document") failures.push(check.label + ": internal navigation caused a full document reload");
    if (!(await page.locator("main h1").count())) failures.push(check.label + ": destination has no main heading");
    navigationResults.push({ label: check.label, destination: page.url(), softNavigation: sentinel === "same-document" });
    await page.close();
  }

  // Mobile menu: open, Escape-close, restore focus, then choose a route.
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 820 }, isMobile: true });
    monitor(page, "mobile navigation");
    await page.goto(baseURL + "/about", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => { window.__natexQaDocumentSentinel = "same-document"; });
    const toggle = page.getByRole("button", { name: "Open navigation" });
    await toggle.click();
    if (await toggle.getAttribute("aria-expanded") !== "true") failures.push("Mobile menu did not open");
    await page.keyboard.press("Escape");
    if (await toggle.getAttribute("aria-expanded") !== "false") failures.push("Escape did not close mobile navigation");
    if (!(await toggle.evaluate((element) => element === document.activeElement))) failures.push("Escape did not return focus to the menu button");
    await toggle.click();
    await page.locator('#mobile-navigation a[href="/work"]').click();
    await page.waitForURL((url) => url.pathname === "/work", { timeout: 15000 }).catch(() => failures.push("Mobile Selected work link did not navigate"));
    if (await page.locator(".menu-toggle").getAttribute("aria-expanded") !== "false") failures.push("Selecting a mobile menu item did not close the menu");
    if (await page.evaluate(() => window.__natexQaDocumentSentinel || null) !== "same-document") failures.push("Mobile internal navigation caused a full document reload");
    await page.close();
  }

  // Form controls: validate empty and malformed input without opening a real mail app.
  for (const route of ["/contact", "/start-project"]) {
    const page = await browser.newPage();
    monitor(page, route + " form");
    await page.goto(baseURL + route, { waitUntil: "domcontentloaded" });
    const form = page.locator("form").first();
    const submit = form.locator('button[type="submit"]');
    if (!(await submit.count()) || !(await submit.isEnabled())) {
      failures.push(route + ": submit control is missing or disabled");
    } else {
      await submit.click();
      const validity = await form.evaluate((element) => ({
        valid: element.checkValidity(),
        invalidFields: element.querySelectorAll(":invalid").length,
      }));
      if (validity.valid || validity.invalidFields === 0) failures.push(route + ": empty form bypassed native validation");
      if (new URL(page.url()).pathname !== route) failures.push(route + ": invalid form caused an unexpected navigation");
    }

    if (route === "/contact") {
      await page.locator("#contact-name").fill("QA Test");
      await page.locator("#contact-email").fill("not-an-email");
      await page.locator("#contact-message").fill("A test message to validate the contact flow.");
      const emailValidity = await page.locator("#contact-email").evaluate((input) => input.validity.typeMismatch);
      if (!emailValidity) failures.push("Contact form accepted a malformed email address");
    } else {
      const prefilled = await page.locator("#project-type").inputValue();
      if (prefilled !== "") failures.push("Start-project form should not select a project when no query parameter is supplied");
      await page.goto(baseURL + "/start-project?project=local-discovery", { waitUntil: "domcontentloaded" });
      const selected = await page.locator("#project-type").inputValue();
      if (selected !== "Local SEO foundations") failures.push("Start-project query prefill did not select Local SEO foundations");
    }
    await page.close();
  }

  // The animated homepage CTA must scroll to the work section, not do nothing.
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 820 }, reducedMotion: "reduce" });
    monitor(page, "Enter experience action");
    await page.goto(baseURL + "/", { waitUntil: "domcontentloaded" });
    const enter = page.locator(".natex-enter");
    await enter.waitFor({ state: "visible", timeout: 12000 }).catch(() => failures.push("Enter experience button did not render"));
    if (await enter.count()) {
      await enter.click();
      await page.waitForFunction(() => window.scrollY > 0, undefined, { timeout: 5000 }).catch(() => failures.push("Enter experience button did not scroll the page"));
      if (!(await page.locator("#work").count())) failures.push("Enter experience target #work is missing");
    }
    await page.close();
  }

  // Verify compact Earth sizing and test its graceful fallback when the texture CDN fails.
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    monitor(page, "Local Discovery Earth");
    await page.goto(baseURL + "/work/local-discovery", { waitUntil: "domcontentloaded" });
    const earth = page.locator(".local-discovery-earth--compact");
    await earth.waitFor({ state: "visible" });
    const desktopBox = await earth.boundingBox();
    if (!desktopBox || desktopBox.width < 58 || desktopBox.width > 62) {
      failures.push("Compact Earth should be approximately 60px on desktop; got " + JSON.stringify(desktopBox));
    }
    await page.setViewportSize({ width: 390, height: 820 });
    const mobileBox = await earth.boundingBox();
    if (!mobileBox || mobileBox.width < 54 || mobileBox.width > 58) {
      failures.push("Compact Earth should be approximately 56px on mobile; got " + JSON.stringify(mobileBox));
    }
    await page.close();

    const blockedContext = await browser.newContext({ viewport: { width: 390, height: 820 } });
    await blockedContext.route("https://threejs.org/examples/textures/planets/**", (route) => route.abort("failed"));
    const blockedPage = await blockedContext.newPage();
    monitor(blockedPage, "Earth texture failure simulation");
    await blockedPage.goto(baseURL + "/work/local-discovery", { waitUntil: "domcontentloaded" });
    const viewport = blockedPage.locator(".local-discovery-earth__viewport");
    await viewport.waitFor({ state: "attached" });
    await blockedPage.waitForFunction(() => {
      const element = document.querySelector(".local-discovery-earth__viewport");
      return Boolean(element?.classList.contains("is-fallback") || element?.classList.contains("is-ready"));
    }, { timeout: 15000 }).catch(() => failures.push("Earth did not settle into a ready or fallback state after texture failure"));
    if (!(await viewport.evaluate((element) => element.classList.contains("is-fallback")))) {
      failures.push("Blocked Earth texture did not activate the static fallback");
    }
    await blockedContext.close();
  }

  const summary = {
    baseURL,
    routesAudited: Object.keys(buttonInventory).length,
    visibleButtonsByRoute: buttonInventory,
    navigationResults,
    networkEvents,
    thirdPartyWarnings: warnings,
    failures,
  };
  console.log(JSON.stringify(summary, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
}
