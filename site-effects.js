/* NatexWorks: optional desktop 3D enhancement. Static SVG stays visible until user intent. */
(() => {
  'use strict';
  const host = document.querySelector('[data-three-showcase]');
  if (!host) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smallScreen = window.matchMedia('(max-width: 760px)').matches;
  const lowMemory = Number(navigator.deviceMemory || 0) > 0 && Number(navigator.deviceMemory) <= 2;
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);

  // Mobile, reduced-motion, data-saver and low-memory visitors keep the inline SVG.
  // No Three.js bundle or WebGL context is created for these visitors.
  if (reducedMotion || smallScreen || lowMemory || saveData) return;

  const interactionRegion = host.closest('.hero-art') || host;
  let initialized = false;
  let pointerActive = false;
  let frameId = 0;
  let renderer = null;
  let scene = null;
  let camera = null;
  let group = null;
  let core = null;
  let resizeObserver = null;

  const render = () => {
    if (renderer && scene && camera) renderer.render(scene, camera);
  };

  const stopAnimation = () => {
    pointerActive = false;
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const animate = () => {
    frameId = 0;
    if (!pointerActive || !renderer || !group) return;
    group.rotation.y += 0.005;
    group.rotation.x += 0.0015;
    if (core) core.rotation.y -= 0.007;
    render();
    frameId = window.requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    pointerActive = true;
    if (!frameId && renderer) frameId = window.requestAnimationFrame(animate);
  };

  const initialize = async () => {
    if (initialized) return;
    initialized = true;

    try {
      const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js');
      if (!host.isConnected) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(34, 1, 0.1, 20);
      camera.position.z = 3.5;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      renderer.setSize(Math.max(1, host.clientWidth), Math.max(1, host.clientHeight), false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.setAttribute('focusable', 'false');
      host.appendChild(renderer.domElement);

      group = new THREE.Group();
      scene.add(group);
      group.add(new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.86, 1),
        new THREE.MeshBasicMaterial({
          color: 0xc5f36b,
          wireframe: true,
          transparent: true,
          opacity: 0.76
        })
      ));

      core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.38, 1),
        new THREE.MeshBasicMaterial({
          color: 0xe9ffd0,
          wireframe: true,
          transparent: true,
          opacity: 0.34
        })
      );
      group.add(core);
      host.classList.add('is-three-ready');

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
      if (pointerActive) startAnimation();
    } catch (error) {
      // Leave the lightweight SVG fallback in place when WebGL/CDN is unavailable.
      host.classList.remove('is-three-ready');
      console.warn('[NatexWorks] Three.js enhancement skipped:', error);
    }
  };

  interactionRegion.addEventListener('pointerenter', () => {
    startAnimation();
    initialize();
  }, { passive: true });

  interactionRegion.addEventListener('pointerleave', stopAnimation, { passive: true });

  interactionRegion.addEventListener('focusin', () => {
    startAnimation();
    initialize();
  });

  interactionRegion.addEventListener('focusout', (event) => {
    if (!interactionRegion.contains(event.relatedTarget)) stopAnimation();
  });
})();
