import type { Metadata } from "next";
import Link from "next/link";
import ProjectArt from "@/components/project-art";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Selected work",
  description: "Explore NatexWorks projects: a MERN-stack inventory application, a café website preview, and a clearly labelled local-search concept.",
  alternates: { canonical: "/work" }
};

export default function WorkPage() {
  return (
    <main id="main">
      <section className="inner-hero work-page-hero">
        <div className="inner-hero-inner">
          <p className="eyebrow"><span className="eyebrow-dot" /> WORK / SELECTED PROJECTS</p>
          <h1>Work that solves<br /><em>something real.</em></h1>
          <p>A small selection of application work, website presentation, and concept exploration. Each entry is labelled clearly so a preview is never mistaken for a client result.</p>
          <div className="inner-hero-meta"><span>01 — FEATURED BUILD</span><span>02 — WEBSITE PREVIEW</span><span>03 — CONCEPT WORK</span></div>
        </div>
      </section>
      <div className="work-rail-intro">
        <p className="eyebrow">SCROLL-LED PROJECT INDEX</p>
        <p>On wide screens, the project gallery moves horizontally as one editorial sequence. On touch screens, swipe naturally through the work.</p>
      </div>
      <section className="work-rail" data-work-scroll aria-label="Selected projects">
        <div className="work-rail-track" data-work-track>
          {projects.map((project, index) => (
            <article className="work-rail-card project-card" key={project.slug}>
              <Link className="project-card-visual" href={"/work/" + project.slug} aria-label={"Open " + project.title + " case study"}>
                <ProjectArt kind={project.kind} />
                <span className="project-open-mark" aria-hidden="true">↗</span>
              </Link>
              <div className="project-card-info">
                <p className="eyebrow">{project.kicker}</p>
                <h2><Link href={"/work/" + project.slug}>{project.title}</Link></h2>
                <p>{project.summary}</p>
                <div className="project-card-meta"><span>{project.status}</span><Link href={"/work/" + project.slug}>Read project ↗</Link></div>
              </div>
              <span className="work-index-number">0{index + 1}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="work-index-note">
        <p className="eyebrow">A NOTE ON PROJECT CONTEXT</p>
        <p>The inventory application is a working project with a live demo. Neswef is presented as a website preview. The local-search example is a concept only. Interface mockups may contain sample or illustrative details; use each project’s notes for context.</p>
        <Link className="arrow-link" href="/contact">Discuss a similar challenge <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
