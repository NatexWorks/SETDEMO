export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  kicker: string;
  category: string;
  summary: string;
  status: string;
  url?: string;
  urlLabel?: string;
  stack: string[];
  challenge: string;
  approach: string;
  details: string[];
  note?: string;
  outcome: string;
  kind: "inventory" | "cafe" | "search";
};

export const projects: Project[] = [
  {
    slug: "inventory-management",
    title: "Inventory Management System",
    shortTitle: "Inventory system",
    kicker: "FEATURED BUILD / 001",
    category: "Business application",
    summary: "An inventory and point-of-sale application connecting product records, stock visibility, barcode-assisted lookup, orders, and reporting workflows.",
    status: "Live demo",
    url: "https://inventory-system-mu-puce.vercel.app/",
    urlLabel: "Open the live demo",
    stack: ["Next.js", "React", "MongoDB", "Mongoose", "ZXing"],
    challenge: "Retail work connects several small but important tasks: organising products, checking quantities, finding an item, and recording a sale. When those tasks are separated, it becomes harder to keep the catalogue, stock, and order history in step.",
    approach: "The source application uses a Next.js App Router interface with authenticated API routes and service modules. Product and category records provide the catalogue; stock levels, barcode records, orders, returns, and reporting connect the wider workflow.",
    details: [
      "Create, edit, search, and organise product records by category, SKU, description, and barcode",
      "Review quantities and low-stock products; the current dashboard query treats five units or fewer as low stock",
      "Use camera-assisted barcode scanning for supported formats, subject to browser camera support and permission",
      "Create orders for approval, complete or cancel them, and process returns through the order workflow",
      "Review dashboard summaries, recent orders, category analytics, and completed-order revenue"
    ],
    note: "These capabilities are present in the public source repository. The linked live deployment may differ by commit, environment, or configuration, so verify the exact enabled flows in the demo before relying on them operationally. Portfolio interface artwork and sample figures are illustrative, not captured application screenshots or business results.",
    outcome: "A live demo and public source repository are available for review. No customer adoption, revenue increase, time saved, or production-impact metric is claimed.",
    kind: "inventory"
  },
  {
    slug: "cafe-presence",
    title: "Neswef Café",
    shortTitle: "Café Presence",
    kicker: "WEBSITE PROJECT / 002",
    category: "Business website preview",
    summary: "A warm, café-led website preview shaped around atmosphere, menu discovery, and clear visit information.",
    status: "Website preview",
    url: "https://natexworks.github.io/Neswef/",
    urlLabel: "Visit the website preview",
    stack: ["Semantic HTML", "CSS", "Vanilla JavaScript"],
    challenge: "A café website needs to do more than display a logo. Visitors should be able to get a feel for the place, explore the menu, and find the information needed for a visit without searching through an unstructured page.",
    approach: "The website uses an editorial, photo-led direction with a warm paper, forest-green, and terracotta palette. The homepage connects the story, ambience, menu highlights, and visit information; a separate menu page supports category browsing and search.",
    details: [
      "Photo-led homepage with café identity, story, ambience, and visit-oriented sections",
      "Separate menu page with category navigation, live search, and 25 sample menu entries",
      "Responsive page layouts and a mobile navigation menu with keyboard Escape support",
      "Reservation request form with native validation and an email-draft handoff"
    ],
    note: "This is a website preview, not a connected restaurant operations or booking system. The project's README explicitly identifies the menu, prices, address, opening hours, email, and social details as sample content to replace. The reservation form opens an email draft; it does not store a request or confirm a booking.",
    outcome: "The website preview and its separate menu page are available to inspect. No confirmed reservations, customer enquiries, footfall, analytics, or commercial outcome is claimed.",
    kind: "cafe"
  },
  {
    slug: "local-search-concept",
    title: "Local Search & Maps Concept",
    shortTitle: "Local discovery",
    kicker: "EXPLORATION / 003",
    category: "Concept direction",
    summary: "A visual exploration of how a local business can present consistent information across its website and local-search touchpoints.",
    status: "Concept only",
    stack: ["Local SEO", "Google Business Profile", "Information design"],
    challenge: "People often discover nearby businesses through a mix of search results, maps, reviews, and the business website. Inconsistent details make the next step harder.",
    approach: "Treat the website and business listing as connected parts of one customer journey. Make the essential information easy to scan, keep contact and location details consistent, and give visitors a clear next action.",
    details: [
      "Clear business information hierarchy",
      "Website-to-listing consistency",
      "Illustrative map and local-result presentation"
    ],
    note: "This is a concept, not a live SEO campaign. The map and listing artwork is illustrative; it does not represent a real search position or guaranteed ranking.",
    outcome: "The deliverable shown here is a concept presentation only. No campaign, live listing improvement, or ranking result is claimed.",
    kind: "search"
  }
];

export const services = [
  {
    number: "01",
    title: "Business websites",
    lead: "A clear first impression, built around what customers need to know.",
    description: "Responsive websites for service businesses and local brands. Explain the offer, establish trust, and make it easy to call, enquire, or visit.",
    outcomes: ["Clear service and product presentation", "Mobile-first page structure", "Contact and enquiry paths", "Search-friendly foundations"],
    symbol: "↗"
  },
  {
    number: "02",
    title: "Custom web applications",
    lead: "Practical software shaped around the way work actually happens.",
    description: "Dashboards, inventory tools, internal portals, and focused web applications that connect records and repeatable workflows.",
    outcomes: ["Purpose-built interfaces", "Structured data and useful views", "Workflow rules matched to the brief", "Room to extend as needs evolve"],
    symbol: "▦"
  },
  {
    number: "03",
    title: "Interface refinement",
    lead: "Make an existing digital product easier to use and easier to trust.",
    description: "Responsive improvements, layout refinements, interaction fixes, and performance-minded frontend work across mobile, tablet, and desktop.",
    outcomes: ["Responsive layout corrections", "More consistent interface patterns", "Accessible interaction states", "Measured motion and polish"],
    symbol: "⌁"
  },
  {
    number: "04",
    title: "Local SEO foundations",
    lead: "Help nearby customers understand who you are and how to reach you.",
    description: "On-page SEO, local information structure, and Google Business Profile improvements designed to support discovery. Rankings are never guaranteed.",
    outcomes: ["Search-ready page structure", "Consistent business information", "Google Business Profile guidance", "Clear location and contact details"],
    symbol: "◎"
  }
] as const;
