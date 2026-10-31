import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow">HAVE A REAL PROBLEM TO SOLVE?</p>
          <h2>Let’s make the<br /><em>next step</em> clearer.</h2>
        </div>
        <Link className="footer-action" href="/contact">
          Start a conversation <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="footer-bottom">
        <Link className="wordmark footer-wordmark" href="/">
          <span className="wordmark-symbol" aria-hidden="true">N<span>×</span></span>
          <span>NatexWorks<span className="wordmark-period">.</span></span>
        </Link>
        <p>Independent web development · India</p>
        <a href="mailto:natexworks@gmail.com">natexworks@gmail.com</a>
        <span>© {new Date().getFullYear()} NatexWorks</span>
      </div>
    </footer>
  );
}
