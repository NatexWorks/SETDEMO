"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MotionEngine() {
  const pathname = usePathname();
  useEffect(() => {
    let cancelled = false;
    let dispose: () => void = () => {};
    const hasMotionTargets = document.querySelector(".hero-story, .service-transform, .work-gallery, [data-parallax], .case-study__visual, [data-reveal]");
    if (!hasMotionTargets) return;
    if (!window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)").matches) return;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const context = gsap.context(() => {
          const hero = document.querySelector<HTMLElement>(".hero-story");
          if (hero) {
            gsap.timeline({
              scrollTrigger: { trigger: hero, start: "top top", end: "+=72%", pin: true, scrub: 0.85, anticipatePin: 1, invalidateOnRefresh: true },
            })
              .to(".hero-story__visual", { scale: 1.1, rotate: 7, yPercent: -4, ease: "none" }, 0)
              .to(".hero-story__heading", { yPercent: -13, ease: "none" }, 0)
              .to(".hero-story__note", { opacity: 0.35, y: -18, ease: "none" }, 0);
          }
          const transformation = document.querySelector<HTMLElement>(".service-transform");
          if (transformation) {
            const steps = gsap.utils.toArray<HTMLElement>(".service-transform__step");
            const artwork = document.querySelector<HTMLElement>(".service-transform__art");
            if (steps.length) {
              gsap.set(steps, { opacity: 0.22, y: 14 });
              gsap.set(steps[0], { opacity: 1, y: 0 });
            }
            const timeline = gsap.timeline({
              scrollTrigger: { trigger: transformation, start: "top top", end: "+=145%", pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true },
            });
            steps.forEach((step, index) => {
              timeline.to(step, { opacity: 1, y: 0, duration: 0.35, ease: "none" }, index);
              if (index < steps.length - 1) timeline.to(step, { opacity: 0.24, y: -14, duration: 0.3, ease: "none" }, index + 0.7);
              if (artwork) timeline.to(artwork, {
                rotate: index % 2 === 0 ? 5 : -5,
                scale: 1 + index * 0.035,
                "--progress": (index + 1) / Math.max(steps.length, 1),
                duration: 0.45,
                ease: "none",
              }, index + 0.2);
            });
          }
          const gallery = document.querySelector<HTMLElement>(".work-gallery");
          const track = gallery?.querySelector<HTMLElement>(".work-gallery__track");
          if (gallery && track) {
            gsap.to(track, {
              x: () => Math.min(0, window.innerWidth - track.scrollWidth - 40),
              ease: "none",
              scrollTrigger: {
                trigger: gallery, start: "top top",
                end: () => "+=" + Math.max(500, track.scrollWidth - window.innerWidth + 100),
                pin: true, scrub: 0.9, anticipatePin: 1, invalidateOnRefresh: true,
              },
            });
          }
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
            gsap.to(element, {
              yPercent: -(Number(element.dataset.parallax) || 12), ease: "none",
              scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.65 },
            });
          });
          const caseVisual = document.querySelector<HTMLElement>(".case-study__visual");
          if (caseVisual) gsap.fromTo(caseVisual,
            { clipPath: "inset(10% 7% 10% 7% round 28px)", scale: 0.94 },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, ease: "none",
              scrollTrigger: { trigger: caseVisual, start: "top 82%", end: "top 25%", scrub: 0.7 } },
          );
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            gsap.fromTo(element, { y: 28, opacity: 0 }, {
              y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 90%", once: true },
            });
          });
        });
        return () => context.revert();
      });
      dispose = () => media.revert();
      ScrollTrigger.refresh();
    }).catch(() => {
      // All content remains available without the optional animation bundle.
    });
    return () => { cancelled = true; dispose(); };
  }, [pathname]);
  return null;
}
