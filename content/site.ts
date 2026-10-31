export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  status: "Working product" | "Concept";
  summary: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  technology: string[];
  note: string;
  art: "inventory" | "discovery" | "cafe";
};

export const services = [
  {
    number: "01",
    title: "Business websites",
    kicker: "A clearer first impression",
    description: "Responsive websites that explain what your business does and make the next step easy—whether that is calling, messaging, booking, or visiting.",
    details: ["Landing pages and multi-page sites", "Mobile-first layouts", "Contact and location paths", "Basic on-page SEO structure"],
  },
  {
    number: "02",
    title: "Custom web applications",
    kicker: "Tools shaped around the work",
    description: "Purpose-built tools for workflows that are awkward to manage with scattered spreadsheets or manual processes. The feature set is shaped around the actual problem.",
    details: ["Dashboards and admin panels", "Inventory and product workflows", "Database-backed features", "Responsive interfaces"],
  },
  {
    number: "03",
    title: "SEO & Google Maps visibility",
    kicker: "Stronger foundations for discovery",
    description: "Improve the foundations that help search engines and nearby customers understand a business, including accurate business details and a website that supports local intent.",
    details: ["On-page SEO fundamentals", "Google Business Profile review", "Consistent business information", "Local landing-page recommendations"],
  },
  {
    number: "04",
    title: "Interface fixes & responsive polish",
    kicker: "Make an existing site easier to use",
    description: "Improve an existing website's layout, navigation, usability, and behaviour across different screen sizes without rebuilding everything unnecessarily.",
    details: ["Mobile and tablet layout fixes", "Navigation and interaction improvements", "Visual consistency and accessibility basics", "Focused UI refinements"],
  },
];

export const projects: Project[] = [
  {
    slug: "inventory-management",
    number: "01",
    title: "Inventory management system",
    category: "Product build",
    status: "Working product",
    summary: "A MERN-stack business app bringing product records, stock visibility, and inventory insights into one workspace.",
    challenge: "Small retailers can lose time when product details, stock counts, and billing-related tasks sit in separate places. This project explores a more connected workspace for repeatable day-to-day work.",
    approach: "The experience brings product and category records, inventory visibility, billing-related workflows, and reporting concepts closer together. Barcode-assisted lookup is included as a supported workflow where compatible scanner setup is available.",
    deliverables: ["Product and category records", "Stock-level visibility and low-stock cues", "Billing-related workflows", "Barcode-assisted product lookup", "Inventory insight and reporting concepts"],
    technology: ["MERN stack"],
    note: "The live demo is the source of truth for currently enabled flows. Some business-specific features may require configuration or further implementation before production use. No sales, time-saving, or financial outcome is claimed here.",
    art: "inventory",
  },
  {
    slug: "local-discovery",
    number: "02",
    title: "Local discovery",
    category: "Experience concept",
    status: "Concept",
    summary: "A concept for helping local customers understand a business through a clearer website, accurate business information, and a useful path to contact or visit.",
    challenge: "A nearby customer should not have to piece together business details from inconsistent pages or outdated listings.",
    approach: "This concept explores a joined-up journey between useful on-page information, Google Business Profile details, location context, and clear contact paths.",
    deliverables: ["Local-intent page structure", "Business information hierarchy", "Contact and directions pathways", "Google Business Profile improvement checklist"],
    technology: [],
    note: "Concept exploration only. It is not a client case study, a verified Google Business Profile, or evidence of ranking improvements.",
    art: "discovery",
  },
  {
    slug: "cafe-presence",
    number: "03",
    title: "Café digital presence",
    category: "Website concept",
    status: "Concept",
    summary: "A warm, mobile-friendly website concept with clear menu, location, contact paths, and a foundation for local discovery.",
    challenge: "A café website should help a visitor quickly answer the practical questions: what is served, where the café is, and how to visit.",
    approach: "The concept uses an editorial visual direction and a simple information hierarchy, with menu, story, and visit paths kept easy to find.",
    deliverables: ["Responsive homepage direction", "Menu and visit information structure", "Contact and location pathways", "Local-discovery foundations"],
    technology: [],
    note: "Visual concept only. It is not a commissioned client project or a claim about a real café's results.",
    art: "cafe",
  },
];

export const process = [
  { number: "01", title: "Understand", text: "Clarify the goal, audience, constraints, and what a useful outcome should look like." },
  { number: "02", title: "Shape", text: "Agree on structure, content, scope, timing, and visual direction before building." },
  { number: "03", title: "Build & refine", text: "Develop the agreed experience and review the details that matter." },
  { number: "04", title: "Verify & hand over", text: "Check key flows, accessibility, and screen sizes; resolve agreed fixes and hand over clearly." },
];
