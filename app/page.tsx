import Link from "next/link";
import ProjectCard from "@/components/project-card";
import HeroSystemCanvas from "@/components/hero-system-canvas";
import { projects, services } from "@/lib/projects";

export default function HomePage() {
  return (
    <main id="main">
      <section className="home-hero page-gutter">
        <div className="hero-layout page-width">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> INDEPENDENT WEB DEVELOPMENT <span className="eyebrow-divider" /> INDIA</p>
            <h1>The web should<br />work <em>for</em> your<br /><span className="headline-accent">business.</span></h1>
            <p className="hero-intro">Websites, custom applications, and practical digital systems—designed around real work, not generic templates.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/work">Explore selected work <span aria-hidden="true">↘</span></Link>
              <Link className="text-action" href="/contact">Have a project in mind? <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="hero-footnote"><span>01 / DIGITAL CRAFT</span><span>DESIGN · DEVELOPMENT · DELIVERY</span></div>
          </div>

          <div className="hero-art" aria-label="Illustration of a connected digital workspace">
            <div className="hero-art-grid" aria-hidden="true" />
            <div className="hero-orbit orbit-one" aria-hidden="true" />
            <div className="hero-orbit orbit-two" aria-hidden="true" />
            <HeroSystemCanvas />
            <div className="hero-interface">
              <div className="interface-topbar"><span>NW / WORKSPACE</span><span className="interface-live"><i /> SYSTEM VIEW</span></div>
              <div className="interface-body">
                <aside className="interface-rail"><b>N×</b><i>▦</i><i>⌁</i><i>◷</i><i>◎</i></aside>
                <div className="interface-content">
                  <div className="interface-heading"><div><small>BUSINESS SYSTEM / 001</small><strong>One connected view.</strong></div><span>↗</span></div>
                  <div className="interface-metrics"><div><small>CATALOGUE</small><b>01</b><i>Organised</i></div><div><small>WORKFLOW</small><b>02</b><i>Connected</i></div></div>
                  <div className="interface-chart"><span /><span /><span /><span /><span /><span /><span /><span /></div>
                  <div className="interface-footer"><span>PRODUCTS</span><span>STOCK</span><span>CHECKOUT</span></div>
                </div>
              </div>
            </div>
            <div className="hero-float-note note-top"><span>✳</span><div><b>Built around needs</b><small>Not feature noise</small></div></div>
            <div className="hero-float-note note-bottom"><span>↗</span><div><b>Made to be useful</b><small>From first click onward</small></div></div>
            <div className="hero-art-index">NATEXWORKS <span>—</span> DIGITAL SYSTEMS</div>
          </div>
        </div>
        <div className="hero-scroll-line page-width"><span>SCROLL TO EXPLORE</span><i /><span>01 — 04</span></div>
      </section>

      <section className="principle-strip">
        <div className="page-width principle-inner">
          <span>GOOD DIGITAL WORK IS</span>
          <b>Clear by design</b><i>✳</i><b>Useful in practice</b><i>✳</i><b>Built to adapt</b>
        </div>
      </section>

      <section className="home-story page-gutter" data-home-story>
        <div className="page-width story-layout">
          <div className="story-copy">
            <p className="eyebrow">01 / FROM IDEA TO SYSTEM</p>
            <h2>A better digital<br />experience starts<br /><em>with the problem.</em></h2>
            <p>Good work connects the need, the interface, and the underlying system. Each layer should make the next step easier—not add another thing to manage.</p>
            <Link className="arrow-link" href="/about">How the work gets done <span aria-hidden="true">↗</span></Link>
            <div className="story-count"><span>01</span><i /><span>03</span></div>
          </div>
          <div className="story-stage">
            <div className="story-orbit" aria-hidden="true"><i /><i /><i /></div>
            <article className="story-frame story-frame-brief" data-story-frame>
              <div className="story-frame-head"><span>STAGE / 01</span><b>Understand</b></div>
              <div className="story-document">
                <small>PROJECT BRIEF</small><strong>Start with<br /><em>the real need.</em></strong>
                <div className="story-lines"><i /><i /><i /></div>
                <div className="story-document-tag">PROBLEM → CLARITY</div>
              </div>
              <span className="story-side-label">LISTEN · MAP · PRIORITISE</span>
            </article>
            <article className="story-frame story-frame-interface" data-story-frame>
              <div className="story-frame-head"><span>STAGE / 02</span><b>Design</b></div>
              <div className="story-ui">
                <div className="story-ui-nav"><b>N×</b><span>Overview　Work　Settings</span></div>
                <div className="story-ui-main"><small>YOUR WORKSPACE</small><strong>Make the<br /><em>next step</em> obvious.</strong><div className="story-ui-modules"><i /><i /><i /></div></div>
              </div>
              <span className="story-side-label">STRUCTURE · HIERARCHY · FLOW</span>
            </article>
            <article className="story-frame story-frame-system" data-story-frame>
              <div className="story-frame-head"><span>STAGE / 03</span><b>Build</b></div>
              <div className="story-system">
                <div className="system-node node-a">INPUT</div><div className="system-link link-a" /><div className="system-node node-b">PROCESS</div><div className="system-link link-b" /><div className="system-node node-c">OUTCOME</div>
                <p>One flow. Fewer loose ends.</p>
              </div>
              <span className="story-side-label">DEVELOP · TEST · REFINE</span>
            </article>
          </div>
        </div>
      </section>

      <section className="home-services page-gutter">
        <div className="page-width">
          <div className="section-intro" data-reveal>
            <div><p className="eyebrow">02 / WHAT I BUILD</p><h2>Useful work.<br /><em>Thoughtfully made.</em></h2></div>
            <p>Choose the right level of digital support—from a focused website to a system that handles a more involved workflow.</p>
          </div>
          <div className="service-preview-grid">
            {services.map((service) => (
              <Link className="service-preview" href="/services" key={service.number} data-reveal>
                <span className="service-symbol">{service.symbol}</span>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.lead}</p>
                <span className="service-more">Explore service <b>↗</b></span>
              </Link>
            ))}
          </div>
          <div className="section-end-link"><span>FROM THE FIRST PAGE TO THE FULL WORKFLOW</span><Link href="/services">See all services ↗</Link></div>
        </div>
      </section>

      <section className="home-work page-gutter">
        <div className="page-width">
          <div className="section-intro" data-reveal>
            <div><p className="eyebrow">03 / SELECTED WORK</p><h2>Real builds.<br /><em>Honest context.</em></h2></div>
            <p>A featured application, a business website preview, and a clearly labelled concept. Each project is presented for what it is—without invented client claims or results.</p>
          </div>
          <div className="home-project-grid">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
          <div className="section-end-link"><span>MORE ABOUT THE APPROACH AND DETAILS</span><Link href="/work">Explore the work index ↗</Link></div>
        </div>
      </section>

      <section className="home-approach page-gutter">
        <div className="page-width approach-layout">
          <div data-reveal><p className="eyebrow">04 / A PRACTICAL APPROACH</p><h2>Less theatre.<br /><em>More intention.</em></h2></div>
          <div className="approach-list">
            <article data-reveal><span>01</span><div><h3>Understand before building</h3><p>Clarify the audience, the problem, and what the work needs to make easier.</p></div></article>
            <article data-reveal><span>02</span><div><h3>Make complexity legible</h3><p>Use structure, content, and interface design to reduce unnecessary decisions.</p></div></article>
            <article data-reveal><span>03</span><div><h3>Refine what matters</h3><p>Test responsive behaviour, accessibility, and performance—not just the first impression.</p></div></article>
          </div>
        </div>
      </section>

      <section className="home-contact page-gutter">
        <div className="page-width contact-ribbon" data-reveal>
          <div><p className="eyebrow">HAVE A PROJECT IN MIND?</p><h2>Let’s make something<br /><em>work better.</em></h2></div>
          <Link className="button button-dark" href="/contact">Tell me what you need <span aria-hidden="true">↗</span></Link>
          <span className="contact-ribbon-mark" aria-hidden="true">N×</span>
        </div>
      </section>
    </main>
  );
}
