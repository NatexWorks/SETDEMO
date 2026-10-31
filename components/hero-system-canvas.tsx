"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const InteractiveScene = dynamic(() => import("@/components/hero-system-scene"), {
  ssr: false,
  loading: () => <div className="hero-system-loading" />
});

export default function HeroSystemCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canRender = window.matchMedia(
      "(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;

    if (!canRender || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "180px" });

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="hero-system-canvas"
      ref={hostRef}
      aria-hidden="true"
    >
      {shouldLoad ? <InteractiveScene /> : <div className="hero-system-loading" />}
    </div>
  );
}
