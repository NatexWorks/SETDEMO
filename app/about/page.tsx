import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — A practical approach to digital work",
  description: "Learn about the NatexWorks approach to business websites, custom tools, responsive interfaces, and local discovery.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero page-hero--about section-pad">
        <div className="section-kicker"><span>ABOUT / THE APPROACH</span><span>THOUGHTFUL BY DESIGN</span></div>
        <p className="eyebrow"><span className="eyebrow__dot" /> ABOUT NATEXWORKS</p>
        <h1>Curious by nature.<br /><em>Practical by design.</em></h1>
        <div className="page-hero__bottom">
          <p>NatexWorks builds websites and digital tools that solve real business problems—from inventory workflows to online presence and local discovery.</p>
          <span>THE THINKING BEHIND THE WORK ↓</span>
        </div>
      </section>

      <section className="about-statement section-pad">
        <div className="section-kicker"><span>THE BELIEF</span><span>USEFULNESS BEFORE COMPLEXITY</span></div>
        <div className="about-statement__grid">
          <h2>A good interface<br />is not the whole<br /><em>answer.</em></h2>
          <div className="about-statement__copy">
            <p className="about-statement__lead">The right experience begins with understanding what a person is trying to get done.</p>
            <p>A website may need to explain a service. A business tool may need to organise stock. A local-search journey may need to make accurate information easier to find. The form changes; the standard stays the same: clear purpose, considered structure, useful details.</p>
            <p>The work is approached as a connected problem—content, interface, behaviour, and the underlying logic—not as decoration added at the end.</p>
          </div>
        </div>
      </section>

      <section className="about-visual-story section-pad">
        <div className="about-visual-story__top"><span>HOW THE WORK TAKES SHAPE</span><span>01 — 04</span></div>
        <div className="about-visual-story__canvas">
          <div className="about-visual-story__grid" />
          <div className="about-visual-story__shape" data-parallax="18"><span>N×</span></div>
          <div className="about-visual-story__side-note" data-parallax="8">QUESTION<br />→ STRUCTURE<br />→ SYSTEM<br />→ USEFULNESS</div>
          <span className="about-visual-story__caption">A GOOD SOLUTION SHOULD MAKE THE WORK FEEL LIGHTER.</span>
        </div>
      </section>

      <section className="about-method section-pad">
        <div className="section-kicker"><span>THE METHOD</span><span>FOUR CLEAR MOVES</span></div>
        <div className="about-method__list">
          <article><span>01</span><div><h3>Understand before proposing.</h3><p>Start with the goal, audience, current process, and the problem that needs attention.</p></div></article>
          <article><span>02</span><div><h3>Agree on the right scope.</h3><p>Set the structure, content, key features, timing, and visual direction before implementation.</p></div></article>
          <article><span>03</span><div><h3>Build with the details in mind.</h3><p>Develop the agreed experience, then review the important interactions and responsive behaviour.</p></div></article>
          <article><span>04</span><div><h3>Verify and hand over clearly.</h3><p>Check essential flows, accessibility, and screen sizes; resolve agreed fixes and explain what is delivered.</p></div></article>
        </div>
      </section>

      <section className="about-last section-pad">
        <p className="eyebrow">NO INFLATED PROMISES</p>
        <h2>Good work should<br /><em>hold up in use.</em></h2>
        <p>That means useful content, accessible interactions, responsive layouts, and a clear understanding of what is—and is not—included.</p>
        <Link className="button button--dark" href="/work">See the work <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  );
}
