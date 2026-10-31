import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/projects";
import { absoluteSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Business websites, custom web applications, interface refinement, and practical local SEO foundations from NatexWorks.",
  alternates: { canonical: absoluteSiteUrl("/services") },
  openGraph: { url: absoluteSiteUrl("/services") }
};

const journey = [
  { stage: "01 / UNDERSTAND", title: "Start with the actual work.", copy: "Clarify who the product or website is for, what currently feels difficult, and what a useful next step should look like.", tags: ["Audience", "Problem", "Priorities"] },
  { stage: "02 / SHAPE", title: "Give the solution a clear structure.", copy: "Turn the requirements into an understandable page flow, interface, or workflow before adding visual complexity.", tags: ["Content", "Interface", "System"] },
  { stage: "03 / BUILD", title: "Make it work in the real world.", copy: "Develop, check responsive behaviour, refine the details, and keep essential content usable when motion or advanced visuals are unavailable.", tags: ["Development", "Testing", "Refinement"] }
];

export default function ServicesPage() {
  return (
    <main id="main">
      <section className="inner-hero services-page-hero">
        <div className="inner-hero-inner">
          <p className="eyebrow"><span className="eyebrow-dot" /> SERVICES / WHAT I DO</p>
          <h1>Digital work<br />with a <em>clear job.</em></h1>
          <p>From a focused business website to a custom application, the aim is the same: make important information and the next action easier to understand.</p>
          <div className="inner-hero-meta"><span>01 — WEBSITES</span><span>02 — WEB APPLICATIONS</span><span>03 — REFINEMENT & DISCOVERY</span></div>
        </div>
      </section>
      <section className="services-list" aria-labelledby="services-list-title">
        <div className="services-list-inner">
          <div className="services-list-heading">
            <p className="eyebrow">CAPABILITIES / 04 AREAS</p>
            <h2 id="services-list-title">Choose the work<br /><em>you actually need.</em></h2>
          </div>
          {services.map((service) => (
            <article className="service-row" key={service.number} data-reveal>
              <span className="service-row-number">{service.number}</span>
              <div><h2>{service.title}</h2><p className="service-row-lead">{service.lead}</p></div>
              <div className="service-row-detail">
                <p>{service.description}</p>
                <ul>{service.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="services-journey" data-services-journey aria-labelledby="journey-title">
        <div className="journey-layout">
          <div className="journey-copy">
            <p className="eyebrow">HOW A PROJECT MOVES</p>
            <h2 id="journey-title">A simple path<br /><em>from need to useful.</em></h2>
            <p>Three connected stages keep the work grounded. On larger screens, the stages transition as one scroll-led sequence; on smaller screens, they remain in a natural reading flow.</p>
            <div className="journey-progress" aria-hidden="true"><span className="journey-progress-fill" /></div>
          </div>
          <div className="journey-stage">
            {journey.map((item, index) => (
              <article className="journey-card" data-journey-card key={item.stage}>
                <div className="journey-card-top"><span>{item.stage}</span><b>0{index + 1} / 03</b></div>
                <h3>{item.title}</h3><p>{item.copy}</p>
                <div className="journey-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="services-bottom-cta">
        <div className="services-bottom-inner">
          <p className="eyebrow">NOT SURE WHICH SERVICE FITS?</p>
          <h2>Describe the problem.<br /><em>We can shape the scope.</em></h2>
          <p>Start with what is not working, what needs to be easier, or what you are planning to launch.</p>
          <Link className="button button-dark" href="/contact">Discuss a project <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
