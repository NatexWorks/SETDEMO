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
  kind: "inventory" | "cafe" | "search";
};

export const projects: Project[] = [
  {
    slug: "inventory-management",
    title: "Inventory Management System",
    shortTitle: "Inventory system",
    kicker: "FEATURED BUILD / 001",
    category: "Business application",
    summary: "A MERN-stack inventory management application exploring product records, stock visibility, and connected retail workflows.",
    status: "Live demo",
    url: "https://inventory-system-mu-puce.vercel.app/",
    urlLabel: "Open the live demo",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    challenge: "Small retail operations repeat the same connected tasks: finding products, checking available stock, and moving through a sale. This project explores how those tasks can sit inside one clear workspace.",
    approach: "Build the experience around the daily workflow rather than a feature checklist. Product and category records form the foundation; stock visibility, checkout concepts, and barcode-assisted lookup connect the next steps.",
    details: [
      "Product catalogue and category organisation",
      "Stock-level visibility and low-stock review",
      "POS and billing workflow exploration",
      "Barcode-assisted product lookup where scanner setup is supported"
    ],
    note: "The portfolio preview uses illustrative sample data. The live demo is the source of truth for currently enabled features; some business-specific flows may need configuration or further implementation before production use.",
    kind: "inventory"
  },
  {
    slug: "neswef-cafe",
    title: "Neswef Café",
    shortTitle: "Neswef",
    kicker: "WEBSITE PROJECT / 002",
    category: "Business website",
    summary: "A warm, café-led website direction built around atmosphere, menu discovery, and clear visit information.",
    status: "Website preview",
    url: "https://natexworks.github.io/Neswef/",
    urlLabel: "Visit the website",
    stack: ["Responsive design", "Editorial layout", "Web"],
    challenge: "A neighbourhood café needs more than a generic online brochure. Visitors should be able to understand the atmosphere, find the menu, and know how to visit without hunting through the page.",
    approach: "Use an image-led editorial layout, restrained typography, and clear paths to the menu, story, and location. The visual direction gives the café its own character instead of reusing a generic business template.",
    details: [
      "Café-focused visual identity and page composition",
      "Menu, story, and visit-oriented navigation",
      "Responsive presentation for smaller screens"
    ],
    note: "Presented as a website preview from the existing portfolio. No client name, commercial result, or business metric is claimed here.",
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
    kind: "search"
  }
];

export const services = [
  {
    number: "01",
    title: "Business websites",
    lead: "A clear first impression, built around what customers need to know.",
    description: "Responsive websites for service businesses and local brands. Explain the offer, establish trust, and make it easy to call, enquire, book, or visit.",
    outcomes: ["Clear service and product presentation", "Mobile-first page structure", "Contact and enquiry paths", "Search-friendly foundations"],
    symbol: "↗"
  },
  {
    number: "02",
    title: "Custom web applications",
    lead: "Practical software shaped around the way work actually happens.",
    description: "Dashboards, inventory tools, internal portals, and focused web applications that connect records and repeatable workflows.",
    outcomes: ["Purpose-built interfaces", "Structured data and useful views", "Role-aware workflows where needed", "Room to extend as needs evolve"],
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
