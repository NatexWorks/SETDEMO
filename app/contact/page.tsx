import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";

const siteUrl = (process.env.SITE_URL || "https://natexworks.github.io/SETDEMO").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project conversation with NatexWorks about a business website, custom web application, interface refinement, or local SEO.",
  alternates: { canonical: siteUrl + "/contact" },
  openGraph: { url: siteUrl + "/contact" }
};

export default function ContactPage() {
  return (
    <main id="main">
      <section className="inner-hero contact-page-hero">
        <div className="inner-hero-inner">
          <p className="eyebrow"><span className="eyebrow-dot" /> CONTACT / START A PROJECT</p>
          <h1>Tell me what<br />needs to <em>work better.</em></h1>
          <p>Share the problem, the people it affects, and what you are hoping to make easier. A first conversation can help shape the right scope.</p>
        </div>
      </section>
      <section className="contact-page-layout">
        <div className="contact-side">
          <p className="eyebrow">A CLEAR START</p>
          <h2>Good projects<br /><em>start with context.</em></h2>
          <p>There is no need to arrive with a complete technical brief. Explain what you are trying to do, what is getting in the way, or what you want to launch.</p>
          <div className="contact-detail"><small>EMAIL</small><a href="mailto:natexworks@gmail.com">natexworks@gmail.com ↗</a></div>
          <div className="contact-detail"><small>BASED IN</small><span>India</span></div>
          <p className="contact-process-note">Submitting the form prepares an email in your default mail application. It does not send or store the enquiry on this website.</p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
