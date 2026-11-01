"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const TEXTURE_ROOT = "https://threejs.org/examples/textures/planets";
const NIGHT_TEXTURE = `${TEXTURE_ROOT}/earth_night_4096.jpg`;

function loadTexture(loader: THREE.TextureLoader, url: string): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });
}

export default function LocalDiscoveryEarth() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (!viewport || !stage) return;

    let disposed = false;
    let inView = true;
    let running = false;
    let frameId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let body: THREE.Mesh | null = null;
    let cloudLayer: THREE.Mesh | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let resizeHandler: (() => void) | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let gsapContext: { revert: () => void } | null = null;
    const textures: THREE.Texture[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock(false);

    const stopRendering = () => {
      running = false;
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      clock.stop();
    };

    const renderFrame = () => {
      if (disposed || !renderer || !scene || !camera) return;

      const delta = Math.min(clock.getDelta(), 0.05);
      if (!reducedMotion && body) body.rotation.y += delta * ((Math.PI * 2) / 155);
      if (!reducedMotion && cloudLayer) cloudLayer.rotation.y += delta * ((Math.PI * 2) / 148);

      renderer.render(scene, camera);
      if (running) frameId = window.requestAnimationFrame(renderFrame);
    };

    const startRendering = () => {
      if (disposed || reducedMotion || running || !inView || document.hidden) return;
      running = true;
      clock.start();
      frameId = window.requestAnimationFrame(renderFrame);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stopRendering();
      else startRendering();
    };

    const disposeScene = () => {
      stopRendering();
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      gsapContext?.revert();

      scene?.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      textures.forEach((texture) => texture.dispose());

      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
        renderer = null;
      }
    };

    const mount = async () => {
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: window.devicePixelRatio <= 1.5,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.2 : 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.08;
        renderer.domElement.setAttribute("aria-hidden", "true");
        viewport.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin("anonymous");

        const nightTexture = await loadTexture(loader, NIGHT_TEXTURE);
        textures.push(nightTexture);
        nightTexture.colorSpace = THREE.SRGBColorSpace;

        const [lightsTexture, cloudsTexture, normalTexture, specularTexture] = await Promise.all([
          loadTexture(loader, `${TEXTURE_ROOT}/earth_lights_2048.png`).catch(() => null),
          loadTexture(loader, `${TEXTURE_ROOT}/earth_clouds_1024.png`).catch(() => null),
          loadTexture(loader, `${TEXTURE_ROOT}/earth_normal_2048.jpg`).catch(() => null),
          loadTexture(loader, `${TEXTURE_ROOT}/earth_specular_2048.jpg`).catch(() => null),
        ]);

        if (disposed) {
          nightTexture.dispose();
          [lightsTexture, cloudsTexture, normalTexture, specularTexture].forEach((texture) => texture?.dispose());
          return;
        }

        [lightsTexture, cloudsTexture, normalTexture, specularTexture].forEach((texture) => {
          if (texture) textures.push(texture);
        });
        if (lightsTexture) lightsTexture.colorSpace = THREE.SRGBColorSpace;
        if (cloudsTexture) cloudsTexture.colorSpace = THREE.SRGBColorSpace;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 0.025, 3.55);
        camera.lookAt(0, 0, 0);

        scene.add(new THREE.AmbientLight(0x8298b5, 0.42));
        const softFill = new THREE.DirectionalLight(0x7897bd, 0.18);
        softFill.position.set(-2.5, 1.8, 3.5);
        scene.add(softFill);

        const tiltedAxis = new THREE.Group();
        tiltedAxis.rotation.z = THREE.MathUtils.degToRad(-23.5);
        scene.add(tiltedAxis);

        const sphereGeometry = new THREE.SphereGeometry(1, 96, 96);
        const earthMaterial = new THREE.MeshPhongMaterial({
          map: nightTexture,
          emissiveMap: lightsTexture || nightTexture,
          emissive: new THREE.Color(0x9b704c),
          emissiveIntensity: lightsTexture ? 0.72 : 0.22,
          normalMap: normalTexture || undefined,
          normalScale: new THREE.Vector2(0.22, 0.22),
          specularMap: specularTexture || undefined,
          specular: new THREE.Color(0x263b55),
          shininess: 10,
        });

        body = new THREE.Mesh(sphereGeometry, earthMaterial);
        body.rotation.y = 0.75;
        tiltedAxis.add(body);

        if (cloudsTexture) {
          const cloudMaterial = new THREE.MeshPhongMaterial({
            map: cloudsTexture,
            color: 0x9fb4c8,
            transparent: true,
            opacity: 0.17,
            depthWrite: false,
          });
          cloudLayer = new THREE.Mesh(
            new THREE.SphereGeometry(1.008, 80, 80),
            cloudMaterial,
          );
          cloudLayer.rotation.y = 0.75;
          tiltedAxis.add(cloudLayer);
        }

        const atmosphereMaterial = new THREE.ShaderMaterial({
          vertexShader: `
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            void main() {
              vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
              vNormal = normalize(normalMatrix * normal);
              vViewPosition = -viewPosition.xyz;
              gl_Position = projectionMatrix * viewPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            void main() {
              float facing = max(dot(normalize(vNormal), normalize(vViewPosition)), 0.0);
              float rim = pow(1.0 - facing, 3.1);
              gl_FragColor = vec4(0.20, 0.43, 0.72, rim * 0.38);
            }
          `,
          side: THREE.BackSide,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const atmosphere = new THREE.Mesh(
          new THREE.SphereGeometry(1.045, 80, 80),
          atmosphereMaterial,
        );
        tiltedAxis.add(atmosphere);

        const resize = () => {
          if (!renderer || !camera) return;
          const rect = viewport.getBoundingClientRect();
          const width = Math.max(1, rect.width);
          const height = Math.max(1, rect.height);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          if (reducedMotion && scene) renderer.render(scene, camera);
        };

        resize();
        resizeHandler = resize;
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(viewport);
        window.addEventListener("resize", resizeHandler, { passive: true });
        document.addEventListener("visibilitychange", handleVisibilityChange);

        intersectionObserver = new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          if (inView) startRendering();
          else stopRendering();
        }, { rootMargin: "100px" });
        intersectionObserver.observe(viewport);

        renderer.render(scene, camera);
        viewport.classList.add("is-ready");

        if (!reducedMotion) {
          const [{ gsap }, { ScrollTrigger }] = await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]);
          if (!disposed) {
            gsap.registerPlugin(ScrollTrigger);
            gsapContext = gsap.context(() => {
              gsap.fromTo(stage,
                { autoAlpha: 0, scale: 0.9, y: 22 },
                { autoAlpha: 1, scale: 1, y: 0, duration: 1.25, ease: "power3.out", clearProps: "visibility" },
              );

              const hero = stage.closest(".case-hero");
              if (hero && window.innerWidth > 700) {
                gsap.to(stage, {
                  yPercent: -2.5,
                  scale: 0.985,
                  ease: "none",
                  scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.75,
                  },
                });
              }
            }, stage);
          }
        }

        if (reducedMotion) renderer.render(scene, camera);
        else startRendering();
      } catch {
        if (!disposed) viewport.classList.add("is-fallback");
        disposeScene();
      }
    };

    void mount();

    return () => {
      disposed = true;
      disposeScene();
      viewport.classList.remove("is-ready", "is-fallback");
    };
  }, []);

  return (
    <div className="local-discovery-earth" role="img" aria-label="A realistic nighttime Earth rotating slowly around its tilted axis, with warm city lights and a subtle blue atmosphere.">
      <div className="local-discovery-earth__stage" ref={stageRef}>
        <div className="local-discovery-earth__viewport" ref={viewportRef}>
          <div
            className="local-discovery-earth__fallback"
            style={{ backgroundImage: `radial-gradient(circle at 32% 29%, rgba(255,255,255,.15), transparent 30%), url("${NIGHT_TEXTURE}")` }}
            aria-hidden="true"
          />
        </div>
        <div className="local-discovery-earth__caption" aria-hidden="true">
          <span>EARTH / 01</span>
          <span>NIGHT SIDE · AXIAL ROTATION</span>
        </div>
      </div>
    </div>
  );
}
