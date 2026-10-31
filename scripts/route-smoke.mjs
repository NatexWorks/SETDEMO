const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");

const routes = [
  "/",
  "/services",
  "/work",
  "/work/inventory-management",
  "/work/cafe-presence",
  "/work/local-search-concept",
  "/about",
  "/contact",
  "/start-project"
];

async function request(path) {
  const response = await fetch(baseUrl + path, { redirect: "manual" });
  const html = await response.text();
  if (!response.ok) {
    throw new Error(`${path} returned HTTP ${response.status}`);
  }
  if (!html.includes("<title>") || !/<h1(?:\s|>)/i.test(html)) {
    throw new Error(`${path} did not render a document title and primary heading`);
  }
  if (html.includes("This page could not load")) {
    throw new Error(`${path} contains the previous page-load error message`);
  }
  return html;
}

let ready = false;
let lastError;
for (let attempt = 0; attempt < 30; attempt += 1) {
  try {
    await fetch(baseUrl + "/services");
    ready = true;
    break;
  } catch (error) {
    lastError = error;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

if (!ready) {
  throw new Error(`Next.js server did not become ready: ${lastError?.message || "unknown error"}`);
}

for (const route of routes) {
  await request(route);
  process.stdout.write(`PASS ${route}\n`);
}

const home = await request("/");
const workflowLabels = ["Catalog", "Stock", "Checkout", "Barcode"];
const positions = workflowLabels.map((label) => home.indexOf(`<h3>${label}</h3>`));
if (positions.some((position) => position < 0) || positions.some((position, index) => index > 0 && position <= positions[index - 1])) {
  throw new Error("Homepage workflow cards are missing or not in Catalog → Stock → Checkout → Barcode order");
}
process.stdout.write("PASS homepage workflow card order\n");
