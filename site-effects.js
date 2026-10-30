/* NatexWorks staged visual enhancements. Third-party scripts fail closed. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onSmallScreen = window.matchMedia('(max-width: 760px)').matches;

  // Replace only explicit icon placeholders; surrounding layout and text remain unchanged.
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons({ attrs: { 'aria-hidden': 'true', focusable: 'false' } });
  }

  // Preserve native desktop/tablet scrolling. Inventory may already own a Lenis instance.
  if (onSmallScreen && !reducedMotion && typeof window.Lenis === 'function' && !window.__natexLenis) {
    try {
      window.__natexLenis = new window.Lenis({
        autoRaf: false,
        anchors: true,
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.075,
        touchInertiaExponent: 1.7,
        lerp: 0.09,
        respectReducedMotion: true,
        stopInertiaOnNavigate: true
      });
    } catch (error) {
      console.warn('[NatexWorks] Lenis initialization skipped:', error);
    }
  }

  // Use one animation clock for Lenis and ScrollTrigger.
  const lenis = window.__natexLenis;
  if (lenis && window.gsap && window.ScrollTrigger && !lenis.__natexGsapConnected) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    lenis.on('scroll', window.ScrollTrigger.update);
    window.gsap.ticker.add((time) => lenis.raf(time * 1000));
    window.gsap.ticker.lagSmoothing(0);
    lenis.__natexGsapConnected = true;
  }

  // Lazy-load a low-poly wireframe accent only when the hero preview is near the viewport.
  const host = document.querySelector('[data-three-showcase]');
  if (!host || navigator.connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory <= 2)) return;
  if (!('IntersectionObserver' in window)) return;

  let renderer, scene, camera, group, resizeObserver, tickerRender;
  let visible = false;
  let initialized = false;
  const render = () => {
    if (visible && renderer && scene && camera) renderer.render(scene, camera);
  };
  const init = async () => {
    if (initialized) return;
    initialized = true;
    try {
      const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js');
      if (!host.isConnected) return;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(34, 1, .1, 20);
      camera.position.z = 3.5;
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      renderer.setSize(Math.max(1, host.clientWidth), Math.max(1, host.clientHeight), false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      host.appendChild(renderer.domElement);
      group = new THREE.Group();
      scene.add(group);
      group.add(new THREE.Mesh(
        new THREE.IcosahedronGeometry(.86, 1),
        new THREE.MeshBasicMaterial({ color: 0xc5f36b, wireframe: true, transparent: true, opacity: .76 })
      ));
      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(.38, 1),
        new THREE.MeshBasicMaterial({ color: 0xe9ffd0, wireframe: true, transparent: true, opacity: .34 })
      );
      group.add(core);
      if (!reducedMotion && window.gsap) {
        window.gsap.to(group.rotation, { y: Math.PI * 2, x: Math.PI * 2, duration: 24, repeat: -1, ease: 'none' });
        window.gsap.to(core.rotation, { y: -Math.PI * 2, duration: 17, repeat: -1, ease: 'none' });
        tickerRender = render;
        window.gsap.ticker.add(tickerRender);
      } else {
        group.rotation.set(.32, .55, 0);
        render();
      }
      resizeObserver = new ResizeObserver(() => {
        if (!renderer || !camera) return;
        const width = Math.max(1, host.clientWidth);
        const height = Math.max(1, host.clientHeight);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        render();
      });
      resizeObserver.observe(host);
      render();
    } catch (error) {
      host.hidden = true;
      console.warn('[NatexWorks] Three.js scene skipped:', error);
    }
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      visible = entry.isIntersecting;
      if (visible) {
        init();
        if (tickerRender && window.gsap) window.gsap.ticker.add(tickerRender);
        render();
      } else if (tickerRender && window.gsap) {
        window.gsap.ticker.remove(tickerRender);
      }
    });
  }, { rootMargin: '120px' });
  observer.observe(host);
})();
