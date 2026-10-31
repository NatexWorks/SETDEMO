import type { Metadata } from "next";
import ProjectEnquiryForm from "@/components/project-enquiry-form";
import { absoluteSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell NatexWorks what you want to build, the problem you need to solve, and the kind of project support you are looking for.",
  alternates: { canonical: absoluteSiteUrl("/start-project") },
  openGraph: {
    title: "Start a project — NatexWorks",
    description: "Share the context for your next website or web application project.",
    url: absoluteSiteUrl("/start-project")
  }
};

type PageProps = {
  searchParams: Promise<{ project?: string }>;
};

const projectContexts: Record<string, string> = {
  "inventory-management": "Inventory / business application",
  "cafe-presence": "Café / business website",
  "local-search-concept": "Local SEO foundations"
};

export default async function StartProjectPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialProjectType = params.project ? projectContexts[params.project] || "" : "";

  return (
    <main id="main">
      <section className="inner-hero contact-page-hero">
        <div className="inner-hero-inner">
          <p className="eyebrow"><span className="eyebrow-dot" /> START A PROJECT / ENQUIRY</p>
          <h1>Start with the<br /><em>right context.</em></h1>
          <p>Tell me what you want to build, who it is for, and what is getting in the way. The details help shape a sensible first conversation—not an automatic quote.</p>
        </div>
      </section>
      <section className="contact-page-layout start-project-layout">
        <div className="contact-side">
          <p className="eyebrow">A USEFUL FIRST BRIEF</p>
          <h2>What are we<br /><em>trying to solve?</em></h2>
          <p>A little context is enough to begin. Share the core problem, the kind of experience you need, and a budget range only if you already have one in mind.</p>
          <div className="contact-detail"><small>EMAIL</small><a href="mailto:natexworks@gmail.com">natexworks@gmail.com ↗</a></div>
          <div className="contact-detail"><small>BASED IN</small><span>India</span></div>
          <p className="contact-process-note">This page opens a prefilled email draft in your email application. The site does not transmit or store form submissions. The enquiry is complete only after you review and send that email.</p>
        </div>
        <ProjectEnquiryForm initialProjectType={initialProjectType} />
      </section>
    </main>
  );
}
