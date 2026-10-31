import Link from "next/link";
import ProjectArt from "@/components/project-art";
import type { Project } from "@/lib/projects";

export default function InventoryCaseStudy({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <main id="main" className="case-study case-study--inventory">
      <section className="case-study-hero page-gutter">
        <div className="page-width case-study-hero__inner">
          <div className="case-study-hero__copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> {project.kicker}</p>
            <h1>Know what you have.<br /><em>See what needs attention.</em></h1>
            <p>{project.summary}</p>
            <div className="case-study-meta">
              <span>{project.category}</span><span>{project.status}</span><span>PRODUCT · STOCK · ORDERS</span>
            </div>
            <a className="button button-primary" href={project.url} target="_blank" rel="noopener noreferrer">
              {project.urlLabel || "Open the live demo"} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="case-study-hero__visual">
            <ProjectArt kind="inventory" />
            <p className="case-art-disclaimer">PORTFOLIO INTERFACE STUDY · ILLUSTRATIVE ARTWORK, NOT A PRODUCT SCREENSHOT</p>
          </div>
        </div>
      </section>

      <section className="case-study-intro page-gutter" data-case-story-step>
        <div className="page-width case-study-intro__inner">
          <p className="eyebrow">THE PRODUCT / 001</p>
          <div>
            <h2>Inventory work is a chain of small decisions.</h2>
            <p>Find the right product. Understand how many are available. Record what moves out. Keep the records useful for the next decision. The application brings these jobs into one workspace rather than treating them as unrelated screens.</p>
          </div>
        </div>
      </section>

      <section className="case-study-chapters page-gutter">
        <div className="page-width">
          <div className="case-study-section-heading">
            <p className="eyebrow">A WALK THROUGH THE WORKFLOW</p>
            <h2>From catalogue<br /><em>to checkout.</em></h2>
          </div>
          <div className="case-study-chapter-grid">
            <article className="case-study-chapter" data-case-story-step>
              <span className="case-study-chapter__number">01 / THE PROBLEM</span>
              <h3>Disconnected records create avoidable work.</h3>
              <p>Product details, category organisation, stock quantities, and order history are linked. When each is maintained in isolation, it becomes harder to know which information is current.</p>
              <span className="case-study-chapter__tag">CLARITY BEFORE COMPLEXITY</span>
            </article>
            <article className="case-study-chapter" data-case-story-step>
              <span className="case-study-chapter__number">02 / CATALOG</span>
              <h3>Give every item a useful record.</h3>
              <p>Products can be created, updated, listed, and searched. The source supports category, SKU, description, and barcode matching, so the catalogue is more than a static name-and-price list.</p>
              <span className="case-study-chapter__tag">PRODUCTS · CATEGORIES · SEARCH</span>
            </article>
            <article className="case-study-chapter" data-case-story-step>
              <span className="case-study-chapter__number">03 / STOCK</span>
              <h3>Make quantity visible.</h3>
              <p>Product records hold stock quantities. The dashboard summarises products that need attention and lists low-stock items; the current report query uses five units or fewer as its low-stock rule.</p>
              <span className="case-study-chapter__tag">QUANTITY · LOW-STOCK REVIEW</span>
            </article>
            <article className="case-study-chapter case-study-chapter--dark" data-case-story-step>
              <span className="case-study-chapter__number">04 / BARCODE</span>
              <h3>Move from a code to a product.</h3>
              <p>The scanner component uses ZXing as a fallback and includes EAN-13, EAN-8, UPC-A, and Code 128 formats. Camera scanning depends on a supported browser, a secure context, and the visitor granting camera permission.</p>
              <span className="case-study-chapter__tag">BARCODE RECORDS · CAMERA SCAN</span>
            </article>
            <article className="case-study-chapter" data-case-story-step>
              <span className="case-study-chapter__number">05 / CHECKOUT & ORDERS</span>
              <h3>Keep the sale connected to stock.</h3>
              <p>Orders can move through pending approval, completion, and cancellation. Completing an order decrements product stock; cancelling a non-completed order releases reserved barcodes. Completed orders can be returned, restoring stock through the return workflow.</p>
              <span className="case-study-chapter__tag">ORDERS · APPROVAL · RETURNS</span>
            </article>
            <article className="case-study-chapter" data-case-story-step>
              <span className="case-study-chapter__number">06 / REPORTING</span>
              <h3>Turn records into a useful overview.</h3>
              <p>The reporting service builds product and low-stock counts, recent orders, completed-order revenue and sales totals, top products, a top category, and category-level sales analytics.</p>
              <span className="case-study-chapter__tag">DASHBOARD · COMPLETED ORDERS · ANALYTICS</span>
            </article>
          </div>
        </div>
      </section>

      <section className="case-study-architecture page-gutter" data-case-story-step>
        <div className="page-width case-study-architecture__inner">
          <div>
            <p className="eyebrow">TECHNICAL IMPLEMENTATION</p>
            <h2>Separate the interface<br /><em>from the rules.</em></h2>
            <p>The public source uses a Next.js App Router application. Authenticated API routes validate requests and delegate product, barcode, and order operations to service modules. MongoDB and Mongoose store the application records; ZXing supports the camera scanner workflow.</p>
          </div>
          <div className="case-technology-grid">
            {project.stack.map((item) => <span key={item}>{item}</span>)}
            <span>Authenticated API routes</span>
            <span>Request validation</span>
            <span>Order state transitions</span>
          </div>
        </div>
      </section>

      <section className="case-study-evidence page-gutter" data-case-story-step>
        <div className="page-width case-study-evidence__inner">
          <span className="case-study-evidence__mark">i</span>
          <div>
            <p className="eyebrow">WHAT IS VERIFIED</p>
            <h2>Show the implementation.<br /><em>Be precise about the evidence.</em></h2>
            <p>The capabilities described above are present in the inspected public source repository. The live demo may run a different commit or configuration, so confirm the current deployment before relying on a particular flow. The figures and UI artwork used elsewhere in this portfolio are illustrative; no customer, revenue, adoption, or time-saving results are claimed.</p>
            <div className="case-study-evidence__links">
              <a href="https://github.com/NatexWorks/Inventory-Management-System" target="_blank" rel="noopener noreferrer">Inspect source repository ↗</a>
              <a href={project.url} target="_blank" rel="noopener noreferrer">Open live demo ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section className="case-study-next page-gutter">
        <div className="page-width case-study-next__inner">
          <div><p className="eyebrow">NEXT / ANOTHER KIND OF BUSINESS EXPERIENCE</p><h2>{nextProject.title}</h2><p>{nextProject.summary}</p></div>
          <div className="case-study-next__actions">
            <Link className="button button-light" href={"/work/" + nextProject.slug}>Explore the project <span aria-hidden="true">↗</span></Link>
            <Link className="text-action" href="/start-project?project=inventory-management">Discuss a similar workflow <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
