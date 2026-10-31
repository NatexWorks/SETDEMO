import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectArt from "@/components/project-art";
import { projects } from "@/lib/projects";
import { absoluteSiteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: absoluteSiteUrl("/work/" + project.slug) },
    openGraph: { title: project.title + " — NatexWorks", description: project.summary, type: "article", url: absoluteSiteUrl("/work/" + project.slug) }
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main id="main">
      <section className="case-hero">
        <div className="case-hero-inner">
          <div className="case-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> {project.kicker}</p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
            <div className="case-meta">
              <span>{project.category}</span><span>{project.status}</span>
              {project.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
            {project.url && <a className="button button-primary case-outbound" href={project.url} target="_blank" rel="noopener noreferrer">{project.urlLabel || "Open project"} <span aria-hidden="true">↗</span></a>}
          </div>
          <div className="case-visual"><ProjectArt kind={project.kind} /></div>
        </div>
      </section>
      <section className="case-sections">
        <div className="case-sections-inner">
          <div className="case-sections-title">
            <p className="eyebrow">PROJECT NOTES / 01</p>
            <h2>From the<br /><em>problem to the build.</em></h2>
            <p className="case-summary-note">A practical account of the project direction and the work represented here.</p>
          </div>
          <div className="case-panels">
            <article className="case-panel" data-reveal><p className="eyebrow">01 / THE CHALLENGE</p><h3>What needed attention?</h3><p>{project.challenge}</p></article>
            <article className="case-panel" data-reveal><p className="eyebrow">02 / THE APPROACH</p><h3>How the experience was shaped.</h3><p>{project.approach}</p></article>
            <article className="case-panel" data-reveal><p className="eyebrow">03 / WORK INCLUDED</p><h3>What this project explores.</h3><ul className="case-detail-list">{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></article>
          </div>
        </div>
        {project.note && <p className="case-note">{project.note}</p>}
      </section>
      <section className="case-next"><div className="case-next-inner"><span>NEXT / EXPLORE ANOTHER PROJECT</span><Link href={"/work/" + nextProject.slug}>{nextProject.title} ↗</Link></div></section>
    </main>
  );
}
