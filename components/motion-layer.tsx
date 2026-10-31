"use client";

import { useEffect } from "react";

export default function MotionLayer() {
  useEffect(() => {
    let cancelled = false;
    let teardown = () => {};

    const initialise = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const root = document.documentElement;

      const context = gsap.context(() => {
        const media = gsap.matchMedia();

        media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          root.classList.add("motion-ready");
          const homeStory = document.querySelector<HTMLElement>("[data-home-story]");
          if (homeStory) {
            const frames = gsap.utils.toArray<HTMLElement>("[data-story-frame]", homeStory);
            if (frames.length > 1) {
              gsap.set(frames.slice(1), { autoAlpha: 0, y: 26, rotateY: 7 });
              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: homeStory,
                  start: "top top",
                  end: "+=175%",
                  scrub: 0.85,
                  pin: true,
                  pinSpacing: true,
                  anticipatePin: 1,
                  invalidateOnRefresh: true
                }
              });

              frames.forEach((frame, index) => {
                if (index === 0) return;
                timeline
                  .to(frames[index - 1], { autoAlpha: 0, y: -22, rotateY: -5, duration: 0.75 }, index - 1)
                  .to(frame, { autoAlpha: 1, y: 0, rotateY: 0, duration: 0.85 }, index - 1 + 0.12);
              });

              timeline.to(".story-orbit", { rotate: 155, scale: 1.08, duration: 2.4, ease: "none" }, 0);
            }
          }

          const servicesJourney = document.querySelector<HTMLElement>("[data-services-journey]");
          if (servicesJourney) {
            const cards = gsap.utils.toArray<HTMLElement>("[data-journey-card]", servicesJourney);
            if (cards.length > 1) {
              gsap.set(cards.slice(1), { autoAlpha: 0, y: 28, scale: 0.975 });
              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: servicesJourney,
                  start: "top top",
                  end: "+=165%",
                  scrub: 0.9,
                  pin: true,
                  pinSpacing: true,
                  anticipatePin: 1,
                  invalidateOnRefresh: true
                }
              });

              cards.forEach((card, index) => {
                if (index === 0) return;
                timeline
                  .to(cards[index - 1], { autoAlpha: 0, y: -20, scale: 0.98, duration: 0.8 }, index - 1)
                  .to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.85 }, index - 1 + 0.1);
              });
              timeline.to(".journey-progress-fill", { scaleX: 1, ease: "none", duration: cards.length }, 0);
            }
          }

          const workRail = document.querySelector<HTMLElement>("[data-work-scroll]");
          const workTrack = document.querySelector<HTMLElement>("[data-work-track]");
          if (workRail && workTrack) {
            const travel = () => Math.max(0, workTrack.scrollWidth - workRail.clientWidth);
            gsap.to(workTrack, {
              x: () => -travel(),
              ease: "none",
              scrollTrigger: {
                trigger: workRail,
                start: "top top",
                end: () => `+=${Math.max(travel(), window.innerHeight * 0.85)}`,
                scrub: 1,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
              }
            });
          }

          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
            gsap.to(element, {
              yPercent: -9,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            });
          });

          return () => {
            root.classList.remove("motion-ready");
            ScrollTrigger.refresh();
          };
        });

        return () => media.revert();
      });

      ScrollTrigger.refresh();
      teardown = () => {
        context.revert();
        root.classList.remove("motion-ready");
      };
    };

    void initialise().catch(() => {
      // Content remains readable and the browser keeps native scrolling if GSAP is unavailable.
    });

    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  return null;
}
