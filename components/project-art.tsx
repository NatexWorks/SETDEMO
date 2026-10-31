import type { Project } from "@/lib/projects";

export default function ProjectArt({ kind, compact = false }: { kind: Project["kind"]; compact?: boolean }) {
  return (
    <div className={`project-art project-art-${kind} ${compact ? "is-compact" : ""}`} aria-hidden="true">
      {kind === "inventory" && (
        <div className="inventory-art-window">
          <div className="art-window-bar"><span /><span /><span /><small>WORKSPACE / OVERVIEW</small></div>
          <div className="art-dashboard">
            <aside className="art-sidebar"><b>NW</b><i>⌂</i><i>▦</i><i>⌁</i><i>◷</i></aside>
            <div className="art-main">
              <div className="art-heading"><span>Inventory overview</span><b>＋ New item</b></div>
              <div className="art-stat-row"><div><small>PRODUCTS</small><strong>Catalogue</strong></div><div><small>STOCK</small><strong>In view</strong></div><div><small>SALES</small><strong>Workflow</strong></div></div>
              <div className="art-data-row"><span /><span /><span /><span /></div>
              <div className="art-data-row short"><span /><span /><span /><span /></div>
              <div className="art-chart"><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div>
          <span className="art-float-label">ONE CLEAR WORKSPACE ↗</span>
        </div>
      )}
      {kind === "cafe" && (
        <div className="cafe-art-window">
          <div className="cafe-art-top"><span>neswef / CAFÉ</span><span>MENU　 STORY　 FIND US</span></div>
          <div className="cafe-art-photo">
            <span className="cafe-art-kicker">A SLOWER KIND OF EVERYDAY</span>
            <strong>Stay for a<br /><em>little longer.</em></strong>
            <span className="cafe-art-button">EXPLORE THE MENU ↗</span>
          </div>
          <div className="cafe-art-bottom">GOOD COFFEE · FRESH BAKES · LOCAL MOMENTS</div>
        </div>
      )}
      {kind === "search" && (
        <div className="search-art-window">
          <div className="search-art-query"><span>⌕</span> cafés near me <b>Search</b></div>
          <div className="search-art-map"><i className="map-road road-a" /><i className="map-road road-b" /><i className="map-road road-c" /><b className="map-pin pin-a">1</b><b className="map-pin pin-b">2</b><b className="map-pin pin-c">3</b></div>
          <div className="search-art-listing"><b>G</b><span><strong>Business information</strong><small>Website · Directions · Contact</small></span><i>↗</i></div>
          <small className="search-art-note">ILLUSTRATIVE CONCEPT · NOT A LIVE RANKING</small>
        </div>
      )}
    </div>
  );
}
