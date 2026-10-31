import type { Metadata } from "next";
import Link from "next/link";
import { absoluteSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Manish and learn about the practical approach behind NatexWorks: building websites and digital tools around real business problems.",
  alternates: { canonical: absoluteSiteUrl("/about") },
  openGraph: { url: absoluteSiteUrl("/about") }
};

const principles = [
  ["01", "Understand before building", "A clear brief starts with the people using the product and the work they need to complete. The right answer is not always the most complex one."],
  ["02", "Make complexity easier to see", "Good structure and useful language help people understand what a website or application does before they need to learn how it works."],
  ["03", "Build for real conditions", "Responsive layouts, accessible controls, performance, and reliable content matter as much as a polished desktop screenshot."],
  ["04", "Be precise about the result", "Show actual work, label concepts honestly, and avoid making claims that cannot be supported by the project itself."]
];

const capabilities = ["Business websites", "Custom web applications", "React & Next.js", "MERN-stack experience", "Responsive interfaces", "Local SEO foundations", "Interaction design", "Performance-aware frontend"];

export default function AboutPage() {
  return (
    <main id="main">
      <section className="inner-hero about-page-hero">
        <div className="inner-hero-inner">
          <p className="eyebrow"><span className="eyebrow-dot" /> ABOUT / THE PERSON BEHIND NATEXWORKS</p>
          <h1>Curious by nature.<br />Practical by <em>design.</em></h1>
          <p>I’m Manish, an independent web developer in India. I build custom websites and digital tools that solve real business problems.</p>
          <div className="inner-hero-meta"><span>INDEPENDENT WEB DEVELOPER</span><span>INDIA</span><span>DESIGN · DEVELOPMENT · DELIVERY</span></div>
        </div>
      </section>
      <section className="about-intro">
        <div className="about-intro-inner">
          <div className="about-marker">THE POINT OF VIEW / 001</div>
          <div className="about-statement">
            <h2>More than websites. <em>Useful digital solutions.</em></h2>
            <p>I enjoy the challenge of building complete products—from the interface and data flow to the logic behind the scenes. A useful experience should make work clearer for the person using it, not simply add another screen to manage.</p>
            <p>My work spans business websites, custom web applications, and practical search-visibility foundations. The problems are different, but the aim stays consistent: understand what needs to happen, shape a clear experience, and build the right functionality around it.</p>
            <p>Inventory Management explores connected product, stock, barcode, and order workflows. Neswef Café is a website preview focused on identity, menu discovery, and visit information. The local-search work is a concept. Each is labelled for what it actually represents.</p>
          </div>
        </div>
      </section>
      <section className="about-principles">
        <div className="about-principles-inner">
          <div><p className="eyebrow">HOW I APPROACH THE WORK</p><h2>Clear thinking.<br /><em>Useful execution.</em></h2></div>
          <div className="principle-list">
            {principles.map(([number, title, description]) => (
              <article key={number} data-reveal><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-capabilities">
        <div className="page-width">
          <p className="eyebrow">TOOLS & AREAS OF WORK</p>
          <h2 className="capabilities-heading">A practical toolkit.<br /><em>Chosen for the job.</em></h2>
        </div>
        <div className="capability-grid">{capabilities.map((item) => <span key={item}>{item}</span>)}</div>
        <p className="capabilities-note">The technology used on a project depends on its requirements; this list describes areas of work and experience, not a claim that every tool is used on every build.</p>
      </section>
      <section className="about-bottom-cta">
        <div><p className="eyebrow">A GOOD PLACE TO START</p><h2>What needs to work<br /><em>better?</em></h2></div>
        <Link className="button button-dark" href="/start-project">Tell me about it <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
