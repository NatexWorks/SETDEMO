import Link from "next/link";
import ProjectArt from "@/components/project-art";
import type { Project } from "@/lib/projects";

export default function CafeCaseStudy({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <main id="main" className="case-study case-study--cafe">
      <section className="case-study-hero case-study-hero--cafe page-gutter">
        <div className="page-width case-study-hero__inner">
          <div className="case-study-hero__copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> {project.kicker}</p>
            <h1>A warmer digital home<br />for <em>Neswef Café.</em></h1>
            <p>{project.summary}</p>
            <div className="case-study-meta">
              <span>{project.category}</span><span>{project.status}</span><span>BRAND · MENU · VISIT</span>
            </div>
            <a className="button button-primary" href={project.url} target="_blank" rel="noopener noreferrer">
              Visit the website preview <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="case-study-hero__visual">
            <ProjectArt kind="cafe" />
            <p className="case-art-disclaimer">PORTFOLIO WEBSITE STUDY · ILLUSTRATIVE ARTWORK, NOT A CAPTURED PAGE</p>
          </div>
        </div>
      </section>

      <section className="case-study-intro page-gutter" data-case-story-step>
        <div className="page-width case-study-intro__inner">
          <p className="eyebrow">THE EXPERIENCE / 002</p>
          <div>
            <h2>A café website should make the visit feel easy to imagine.</h2>
            <p>Before a visitor arrives, the website can introduce the atmosphere, give the menu a clear place, and make practical visit information easy to find. This preview is organised around that simple journey.</p>
          </div>
        </div>
      </section>

      <section className="case-study-chapters case-study-chapters--cafe page-gutter">
        <div className="page-width">
          <div className="case-study-section-heading">
            <p className="eyebrow">FROM FIRST IMPRESSION TO MENU</p>
            <h2>A little more than<br /><em>a landing page.</em></h2>
          </div>
          <div className="case-study-chapter-grid">
            <article className="case-study-chapter" data-case-story-step>
              <span className="case-study-chapter__number">01 / BUSINESS CONTEXT</span>
              <h3>Help someone decide to visit.</h3>
              <p>The site is structured to answer the early questions: what kind of place is this, what can I explore, and where do I find the menu and visit details?</p>
              <span className="case-study-chapter__tag">ATMOSPHERE · INFORMATION · NEXT STEP</span>
            </article>
            <article className="case-study-chapter case-study-chapter--cafe-dark" data-case-story-step>
              <span className="case-study-chapter__number">02 / DESIGN DIRECTION</span>
              <h3>Warm materials. Clear editorial rhythm.</h3>
              <p>The source README describes a warm paper, forest-green, and terracotta palette. Photography, serif display type, restrained labels, and generous sections give the café a recognisable visual mood.</p>
              <span className="case-study-chapter__tag">PAPER · FOREST GREEN · TERRACOTTA</span>
            </article>
            <article className="case-study-chapter" data-case-story-step>
              <span className="case-study-chapter__number">03 / HOMEPAGE EXPERIENCE</span>
              <h3>Tell the story, then guide the visit.</h3>
              <p>The homepage includes a photo-led hero, featured menu cards, story and ambience sections, visit information, and a footer that keeps the site&apos;s main paths available.</p>
              <span className="case-study-chapter__tag">HERO · STORY · AMBIENCE · VISIT</span>
            </article>
            <article className="case-study-chapter" data-case-story-step>
              <span className="case-study-chapter__number">04 / MENU DISCOVERY</span>
              <h3>Give the menu its own space.</h3>
              <p>A separate menu page contains 25 sample entries, category navigation, and live search. Its category controls help visitors narrow the list without requiring a full page reload.</p>
              <span className="case-study-chapter__tag">25 SAMPLE ITEMS · CATEGORY FILTER · SEARCH</span>
              <a className="case-inline-link" href="https://natexworks.github.io/Neswef/menu.html" target="_blank" rel="noopener noreferrer">Explore the separate menu preview ↗</a>
            </article>
            <article className="case-study-chapter" data-case-story-step>
              <span className="case-study-chapter__number">05 / VISIT JOURNEY</span>
              <h3>Keep practical information discoverable.</h3>
              <p>Navigation links connect the story, menu, and visit sections. The project includes visit details, but its README marks the address and opening hours as sample information that must be replaced with verified café details.</p>
              <span className="case-study-chapter__tag">NAVIGATION · VISIT DETAILS</span>
            </article>
            <article className="case-study-chapter case-study-chapter--cafe-dark" data-case-story-step>
              <span className="case-study-chapter__number">06 / ENQUIRY & RESPONSIVE DESIGN</span>
              <h3>Make the request path clear—and honest.</h3>
              <p>The reservation form uses native validation and opens an email draft. It is not connected to a booking backend and does not store requests or confirm reservations. The source also includes responsive layouts, mobile navigation, and reduced-motion support.</p>
              <span className="case-study-chapter__tag">EMAIL DRAFT · MOBILE NAV · REDUCED MOTION</span>
            </article>
          </div>
        </div>
      </section>

      <section className="case-study-evidence case-study-evidence--cafe page-gutter" data-case-story-step>
        <div className="page-width case-study-evidence__inner">
          <span className="case-study-evidence__mark">i</span>
          <div>
            <p className="eyebrow">PREVIEW STATUS & CONTENT NOTES</p>
            <h2>A website preview—not a live booking operation.</h2>
            <p>The public source describes this as a concept website. Its menu items, prices, address, opening hours, email, and social handle are sample details and must be replaced before the site is used with real customers. No actual bookings, enquiry volume, footfall, analytics, or commercial outcome is claimed.</p>
            <div className="case-study-evidence__links">
              <a href="https://github.com/NatexWorks/Neswef" target="_blank" rel="noopener noreferrer">Inspect website source ↗</a>
              <a href={project.url} target="_blank" rel="noopener noreferrer">Visit website preview ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section className="case-study-next case-study-next--cafe page-gutter">
        <div className="page-width case-study-next__inner">
          <div><p className="eyebrow">NEXT / ANOTHER KIND OF DIGITAL PRODUCT</p><h2>{nextProject.title}</h2><p>{nextProject.summary}</p></div>
          <div className="case-study-next__actions">
            <Link className="button button-light" href={"/work/" + nextProject.slug}>Explore the project <span aria-hidden="true">↗</span></Link>
            <Link className="text-action" href="/start-project?project=cafe-presence">Discuss a business website <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
