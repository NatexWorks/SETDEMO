import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import { absoluteSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact NatexWorks about a business website, custom web application, interface refinement, or local SEO.",
  alternates: { canonical: absoluteSiteUrl("/contact") },
  openGraph: { url: absoluteSiteUrl("/contact") }
};

export default function ContactPage() {
  return (
    <main id="main">
      <section className="inner-hero contact-page-hero">
        <div className="inner-hero-inner">
          <p className="eyebrow"><span className="eyebrow-dot" /> CONTACT / GET IN TOUCH</p>
          <h1>Start with what<br />needs to <em>work better.</em></h1>
          <p>Have a question or want to talk through an idea? Use the email form below, or share a little more detail through the dedicated project enquiry page.</p>
        </div>
      </section>
      <section className="contact-page-layout">
        <div className="contact-side">
          <p className="eyebrow">A CLEAR START</p>
          <h2>Good projects<br /><em>start with context.</em></h2>
          <p>There is no need to arrive with a complete technical brief. Explain what you are trying to do, what is getting in the way, or what you want to launch.</p>
          <div className="contact-detail"><small>EMAIL</small><a href="mailto:natexworks@gmail.com">natexworks@gmail.com ↗</a></div>
          <div className="contact-detail"><small>BASED IN</small><span>India</span></div>
          <p className="contact-process-note">The form opens an email draft in your default mail application. It does not send or store your enquiry on this website.</p>
          <Link className="arrow-link" href="/start-project">Use the project enquiry form <span aria-hidden="true">↗</span></Link>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
