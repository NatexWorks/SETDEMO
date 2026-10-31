import Link from "next/link";
import ProjectArt from "@/components/project-art";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <article className={`project-card project-card-${project.kind}`} data-reveal>
      <Link className="project-card-visual" href={`/work/${project.slug}`} aria-label={`Open ${project.title} project details`}>
        <ProjectArt kind={project.kind} />
        <span className="project-open-mark" aria-hidden="true">↗</span>
      </Link>
      <div className="project-card-info">
        <p className="eyebrow">{String(index + 1).padStart(2, "0")} / {project.category}</p>
        <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <div className="project-card-meta">
          <span>{project.status}</span>
          <Link href={`/work/${project.slug}`} aria-label={`Read about ${project.title}`}>Explore project ↗</Link>
        </div>
      </div>
    </article>
  );
}
