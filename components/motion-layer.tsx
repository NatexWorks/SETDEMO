"use client";

import { useEffect } from "react";

export default function MotionLayer() {
  useEffect(() => {
    let cancelled = false;
    let started = false;
    let teardown = () => {};
    const activationQuery = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

    const initialise = async () => {
      if (cancelled || started || !activationQuery.matches) return;
      started = true;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (cancelled || !activationQuery.matches) {
        started = false;
        return;
      }

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
            const brief = servicesJourney.querySelector<HTMLElement>("[data-journey-brief]");
            const interfaceObject = servicesJourney.querySelector<HTMLElement>("[data-journey-interface]");
            const systemObject = servicesJourney.querySelector<HTMLElement>("[data-journey-system]");
            const cards = gsap.utils.toArray<HTMLElement>("[data-journey-card]", servicesJourney);

            if (brief && interfaceObject && systemObject && cards.length === 3) {
              gsap.set(interfaceObject, { autoAlpha: 0, x: 70, y: 28, rotateY: -16, scale: 0.82 });
              gsap.set(systemObject, { autoAlpha: 0, x: 45, y: 34, rotateZ: -13, scale: 0.72 });
              gsap.set(cards, { autoAlpha: 0.58, y: 10, scale: 0.985 });

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

              timeline
                .to(brief, { x: -72, y: 26, rotateZ: -11, scale: 0.76, autoAlpha: 0.52, duration: 1 }, 0)
                .to(interfaceObject, { autoAlpha: 1, x: 0, y: 0, rotateY: 0, scale: 1, duration: 1.05 }, 0.32)
                .to(interfaceObject, { x: -48, y: -18, rotateY: 12, scale: 0.78, autoAlpha: 0.58, duration: 1 }, 1.28)
                .to(systemObject, { autoAlpha: 1, x: 0, y: 0, rotateZ: 0, scale: 1, duration: 1.1 }, 1.62)
                .to(".journey-progress-fill", { scaleX: 1, ease: "none", duration: 3.1 }, 0);

              cards.forEach((card, index) => {
                const at = index * 0.94;
                timeline.to(card, { autoAlpha: 1, y: -5, scale: 1, duration: 0.32 }, at);
                if (index < cards.length - 1) {
                  timeline.to(card, { autoAlpha: 0.62, y: 0, scale: 0.985, duration: 0.32 }, at + 0.52);
                }
              });
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

    const handleMediaChange = () => {
      if (activationQuery.matches) {
        void initialise().catch(() => {
          started = false;
        });
      }
    };

    activationQuery.addEventListener("change", handleMediaChange);
    if (activationQuery.matches) {
      void initialise().catch(() => {
        started = false;
      });
    }

    return () => {
      cancelled = true;
      activationQuery.removeEventListener("change", handleMediaChange);
      teardown();
    };
  }, []);

  return null;
}
