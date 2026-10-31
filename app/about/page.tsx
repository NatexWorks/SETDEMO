import type { Metadata } from "next";
import Link from "next/link";
import { absoluteSiteUrl } from "@/lib/site";

const siteUrl = (process.env.SITE_URL || "https://natexworks.github.io/SETDEMO").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the practical approach behind NatexWorks: understanding the problem, making complexity clear, and building useful digital experiences.",
  alternates: { canonical: absoluteSiteUrl("/about") },
  openGraph: { url: absoluteSiteUrl("/about") }
};

const principles = [
  ["01", "Understand before building", "A clear brief starts with the people using the product and the work they need to complete. The right answer is not always the most complex one."],
  ["02", "Make complexity easier to see", "Good structure and useful language help people understand what a website or application does before they need to learn how it works."],
  ["03", "Build for real conditions", "Responsive layouts, accessible controls, performance, and reliable content matter as much as a polished desktop screenshot."],
  ["04", "Be precise about the result", "Show actual work, label concepts honestly, and avoid making claims that cannot be supported by the project itself."]
];

const capabilities = ["Business websites", "Custom web applications", "React & Next.js", "MERN stack", "Responsive interfaces", "Local SEO foundations", "Interaction design", "Performance-aware frontend"];

export default function AboutPage() {
  return (
    <main id="main">
      <section className="inner-hero about-page-hero">
        <div className="inner-hero-inner">
          <p className="eyebrow"><span className="eyebrow-dot" /> ABOUT / THE PRACTICE</p>
          <h1>Technology is useful<br />when it makes work<br /><em>feel simpler.</em></h1>
          <p>NatexWorks is an independent web development practice based in India, focused on business websites, custom web applications, and practical digital solutions.</p>
          <div className="inner-hero-meta"><span>INDEPENDENT PRACTICE</span><span>INDIA</span><span>DESIGN · DEVELOPMENT · DELIVERY</span></div>
        </div>
      </section>
      <section className="about-intro">
        <div className="about-intro-inner">
          <div className="about-marker">THE POINT OF VIEW / 001</div>
          <div className="about-statement">
            <h2>Not technology for its own sake. <em>Technology with a job to do.</em></h2>
            <p>The work begins with a practical question: what should become clearer, faster, or easier for the person using this website or tool?</p>
            <p>That could mean helping a customer understand a service, making a local business easier to contact, or bringing product and stock workflows into a more connected application. The interface and the underlying system should support the same goal.</p>
            <p>The portfolio is deliberately honest about its examples. A working application, a website preview, and a concept are different kinds of work—and are presented as such.</p>
          </div>
        </div>
      </section>
      <section className="about-principles">
        <div className="about-principles-inner">
          <div><p className="eyebrow">WORKING PRINCIPLES</p><h2>Clear thinking.<br /><em>Useful execution.</em></h2></div>
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
        <p className="capabilities-note">The technology used on a project depends on its requirements; this list describes areas of work, not a claim that every tool is used on every build.</p>
      </section>
      <section className="about-bottom-cta">
        <div><p className="eyebrow">A GOOD PLACE TO START</p><h2>What needs to work<br /><em>better?</em></h2></div>
        <Link className="button button-dark" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
