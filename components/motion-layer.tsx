"use client";

import { useEffect } from "react";

export default function MotionLayer() {
  useEffect(() => {
    let cancelled = false;
    let desktopStarted = false;
    let mobileStarted = false;
    let desktopCleanup = () => {};
    let mobileCleanup = () => {};

    const desktopQuery = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const mobileQuery = window.matchMedia("(max-width: 760px) and (prefers-reduced-motion: no-preference)");

    const initialiseDesktop = async () => {
      if (cancelled || desktopStarted || !desktopQuery.matches) return;
      desktopStarted = true;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (cancelled || !desktopQuery.matches) {
        desktopStarted = false;
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
      desktopCleanup = () => context.revert();
    };

    const initialiseMobile = async () => {
      if (cancelled || mobileStarted || !mobileQuery.matches) return;
      mobileStarted = true;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (cancelled || !mobileQuery.matches) {
        mobileStarted = false;
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        document.documentElement.classList.add("mobile-story-motion-ready");

        const workflow = document.querySelector<HTMLElement>("[data-mobile-workflow-story]");
        const stage = workflow?.querySelector<HTMLElement>("[data-mobile-workflow-stage]");
        const stack = workflow?.querySelector<HTMLElement>("[data-mobile-workflow-stack]");
        const cards = stack ? gsap.utils.toArray<HTMLElement>("[data-workflow-card]", stack) : [];
        const nextPanel = workflow?.nextElementSibling instanceof HTMLElement
          ? workflow.nextElementSibling
          : null;

        if (stage && stack && cards.length === 4) {
          cards.forEach((card, index) => {
            gsap.set(card, {
              zIndex: index + 1,
              autoAlpha: index === 0 ? 1 : 0,
              x: index === 0 ? 0 : (index % 2 === 0 ? 74 : -74),
              yPercent: -50,
              y: index === 0 ? 0 : 42,
              rotation: index === 0 ? 0 : (index % 2 === 0 ? 7 : -7),
              scale: index === 0 ? 1 : 0.96,
              clipPath: index === 0 ? "inset(0% 0% 0% 0% round 18px)" : "inset(0% 0% 100% 0% round 18px)",
              transformOrigin: "50% 50%"
            });
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top+=78",
              end: () => `+=${Math.max(window.innerHeight * 1.6, stage.offsetHeight - window.innerHeight * 0.12)}`,
              scrub: 0.72,
              invalidateOnRefresh: true
            }
          });

          for (let index = 1; index < cards.length; index += 1) {
            const previous = cards[index - 1];
            const current = cards[index];
            const at = (index - 1) * 0.74;
            timeline
              .to(previous, {
                yPercent: -50,
                y: 13,
                scale: 0.985,
                autoAlpha: 0.82,
                clipPath: "inset(calc(100% - 14px) 0 0 0 round 18px)",
                duration: 0.34,
                ease: "none"
              }, at)
              .to(current, {
                x: 0,
                yPercent: -50,
                y: 0,
                rotation: 0,
                scale: 1,
                autoAlpha: 1,
                clipPath: "inset(0% 0% 0% 0% round 18px)",
                duration: 0.64,
                ease: "power2.out"
              }, at + 0.06);
          }

          const transitionAt = cards.length * 0.63;
          timeline.to(stack, {
            rotateX: -5,
            scale: 0.955,
            y: -13,
            duration: 0.52,
            ease: "none"
          }, transitionAt);

          if (nextPanel) {
            gsap.set(nextPanel, { y: 72, scale: 0.985, transformOrigin: "50% 0%" });
            timeline.to(nextPanel, {
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "none"
            }, transitionAt + 0.05);
          }
        }

        gsap.utils.toArray<HTMLElement>("[data-case-story-step]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0.72, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                end: "top 58%",
                scrub: 0.5,
                invalidateOnRefresh: true
              }
            }
          );
        });

        return () => document.documentElement.classList.remove("mobile-story-motion-ready");
      }, document.body);

      ScrollTrigger.refresh();
      mobileCleanup = () => context.revert();
    };

    const handleDesktopChange = () => {
      if (desktopQuery.matches) {
        void initialiseDesktop().catch(() => {
          desktopStarted = false;
        });
      } else {
        desktopCleanup();
        desktopCleanup = () => {};
        desktopStarted = false;
      }
    };

    const handleMobileChange = () => {
      if (mobileQuery.matches) {
        void initialiseMobile().catch(() => {
          mobileStarted = false;
        });
      } else {
        mobileCleanup();
        mobileCleanup = () => {};
        mobileStarted = false;
      }
    };

    desktopQuery.addEventListener("change", handleDesktopChange);
    mobileQuery.addEventListener("change", handleMobileChange);

    if (desktopQuery.matches) void initialiseDesktop().catch(() => { desktopStarted = false; });
    if (mobileQuery.matches) void initialiseMobile().catch(() => { mobileStarted = false; });

    return () => {
      cancelled = true;
      desktopQuery.removeEventListener("change", handleDesktopChange);
      mobileQuery.removeEventListener("change", handleMobileChange);
      desktopCleanup();
      mobileCleanup();
    };
  }, []);

  return null;
}
