import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";
const routes = [
  "/",
  "/services",
  "/work",
  "/work/inventory-management",
  "/work/local-discovery",
  "/work/cafe-presence",
  "/about",
  "/contact",
];
const widths = [320, 360, 390, 430, 768, 1024, 1280, 1440];
const failures = [];
const results = [];
const browserErrors = [];
await mkdir("artifacts/browser-qa", { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  for (const route of routes) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
    });
    page.on("pageerror", (error) => browserErrors.push(route + ": " + error.message));
    page.on("console", (message) => {
      if (message.type() === "error") browserErrors.push(route + ": " + message.text());
    });

    const response = await page.goto(baseURL + route, { waitUntil: "domcontentloaded" });
    if (!response || response.status() !== 200) {
      failures.push(route + ": expected HTTP 200, got " + (response?.status() ?? "no response"));
    }

    const title = await page.title();
    const h1Count = await page.locator("main h1").count();
    if (!title.trim()) failures.push(route + ": document title is empty");
    if (h1Count !== 1) failures.push(route + ": expected one main h1, got " + h1Count);

    const uniqueInternal = await page.locator('a[href^="/"]').evaluateAll((anchors) =>
      [...new Set(anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean))],
    );
    for (const href of uniqueInternal) {
      if (href.startsWith("//") || href.startsWith("/#")) continue;
      const check = await page.request.get(new URL(href, baseURL).toString(), { maxRedirects: 5 });
      if (!check.ok()) failures.push(route + ": internal link " + href + " returned " + check.status());
    }

    const viewportResults = [];
    for (const width of widths) {
      await page.setViewportSize({ width, height: width < 500 ? 820 : 1000 });
      await page.waitForTimeout(70);
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
        headingCount: document.querySelectorAll("main h1").length,
      }));
      const overflow = Math.max(dimensions.document, dimensions.body) - dimensions.viewport;
      viewportResults.push({ width, overflow: Math.max(0, overflow) });
      if (overflow > 1) failures.push(route + " at " + width + "px: horizontal overflow " + overflow + "px");
    }

    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: width < 500 ? 820 : 1000 });
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      for (const violation of axe.violations) {
        failures.push(route + " at " + width + "px: axe " + violation.id + " (" + violation.impact + "): " + violation.help);
      }
    }

    await page.setViewportSize({ width: 390, height: 820 });
    await page.screenshot({ path: "artifacts/browser-qa/" + route.replaceAll("/", "_").replace(/^_$/, "home") + "-390.png", fullPage: true });
    if (route === "/" || route === "/services" || route === "/work") {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.screenshot({ path: "artifacts/browser-qa/" + route.replaceAll("/", "_").slice(1) + "-1440.png", fullPage: true });
    }

    results.push({ route, title, viewports: viewportResults });
    await page.close();
  }

  const menuPage = await browser.newPage({ viewport: { width: 390, height: 820 } });
  await menuPage.goto(baseURL + "/about", { waitUntil: "domcontentloaded" });
  const toggle = menuPage.locator(".menu-toggle");
  await toggle.click();
  if (await toggle.getAttribute("aria-expanded") !== "true") failures.push("Mobile menu did not open");
  await menuPage.keyboard.press("Escape");
  if (await toggle.getAttribute("aria-expanded") !== "false") failures.push("Escape did not close the mobile menu");
  if (!(await toggle.evaluate((element) => element === document.activeElement))) failures.push("Escape did not return focus to the menu toggle");
  await menuPage.close();

  const reducedPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await reducedPage.goto(baseURL + "/", { waitUntil: "domcontentloaded" });
  await reducedPage.waitForTimeout(150);
  if (await reducedPage.locator(".hero-scene canvas").count() !== 0) {
    failures.push("Reduced-motion mode should use the static hero fallback");
  }
  await reducedPage.close();

  if (browserErrors.length) failures.push(...browserErrors.map((entry) => "Browser error: " + entry));

  const summary = {
    baseURL,
    routesChecked: routes.length,
    viewportWidths: widths,
    axeViewports: [390, 1440],
    reducedMotion: "checked",
    mobileMenuKeyboard: "checked",
    failures,
    results,
  };
  console.log(JSON.stringify(summary, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
}
