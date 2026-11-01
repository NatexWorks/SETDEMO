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

function addStarField(scene: THREE.Scene) {
  let seed = 48271;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const starPositions = new Float32Array(1150 * 3);
  for (let index = 0; index < 1150; index += 1) {
    const offset = index * 3;
    starPositions[offset] = (random() - 0.5) * 15.5;
    starPositions[offset + 1] = (random() - 0.5) * 9.5;
    starPositions[offset + 2] = -7.5 - random() * 8;
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({
    color: 0xc7d7ed,
    size: 0.022,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.68,
    depthWrite: false,
  });
  scene.add(new THREE.Points(starGeometry, starMaterial));

  // A denser, faint blue-white dust lane echoes the distant galactic haze in the reference.
  const dustPositions = new Float32Array(620 * 3);
  for (let index = 0; index < 620; index += 1) {
    const offset = index * 3;
    const x = (random() - 0.5) * 14;
    dustPositions[offset] = x;
    dustPositions[offset + 1] = 2.0 + x * 0.29 + (random() - 0.5) * 1.35;
    dustPositions[offset + 2] = -8 - random() * 5;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  const dustMaterial = new THREE.PointsMaterial({
    color: 0x739bc9,
    size: 0.028,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  });
  scene.add(new THREE.Points(dustGeometry, dustMaterial));

  const brightPositions = new Float32Array(34 * 3);
  for (let index = 0; index < 34; index += 1) {
    const offset = index * 3;
    brightPositions[offset] = (random() - 0.5) * 13;
    brightPositions[offset + 1] = (random() - 0.5) * 8;
    brightPositions[offset + 2] = -7 - random() * 7;
  }
  const brightGeometry = new THREE.BufferGeometry();
  brightGeometry.setAttribute("position", new THREE.BufferAttribute(brightPositions, 3));
  const brightMaterial = new THREE.PointsMaterial({
    color: 0xe0eaff,
    size: 0.048,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
  });
  scene.add(new THREE.Points(brightGeometry, brightMaterial));
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
        } else if (object instanceof THREE.Points) {
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
        renderer.toneMappingExposure = 1.06;
        renderer.domElement.setAttribute("aria-hidden", "true");
        viewport.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin("anonymous");

        const nightTexture = await loadTexture(loader, NIGHT_TEXTURE);
        textures.push(nightTexture);
        nightTexture.colorSpace = THREE.SRGBColorSpace;
        nightTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

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
        if (lightsTexture) {
          lightsTexture.colorSpace = THREE.SRGBColorSpace;
          lightsTexture.anisotropy = Math.min(8, renderer!.capabilities.getMaxAnisotropy());
        }
        if (cloudsTexture) {
          cloudsTexture.colorSpace = THREE.SRGBColorSpace;
          cloudsTexture.anisotropy = Math.min(8, renderer!.capabilities.getMaxAnisotropy());
        }
        if (normalTexture) normalTexture.anisotropy = Math.min(8, renderer!.capabilities.getMaxAnisotropy());
        if (specularTexture) specularTexture.anisotropy = Math.min(8, renderer!.capabilities.getMaxAnisotropy());

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 0.025, 3.7);
        camera.lookAt(0, 0, 0);

        // Low-level off-camera fills retain continental shape without introducing a visible sun.
        scene.add(new THREE.AmbientLight(0x7890ac, 0.2));
        const coolFill = new THREE.DirectionalLight(0x9ab7db, 0.28);
        coolFill.position.set(-3.5, 2.6, 4.5);
        scene.add(coolFill);
        const blueEdgeFill = new THREE.PointLight(0x315984, 0.32, 9, 2);
        blueEdgeFill.position.set(3.4, -1.7, -1.6);
        scene.add(blueEdgeFill);

        addStarField(scene);

        const tiltedAxis = new THREE.Group();
        tiltedAxis.rotation.z = THREE.MathUtils.degToRad(-23.5);
        scene.add(tiltedAxis);

        const sphereGeometry = new THREE.SphereGeometry(1.06, 112, 112);
        const earthMaterial = new THREE.MeshPhongMaterial({
          map: nightTexture,
          emissiveMap: lightsTexture || nightTexture,
          emissive: new THREE.Color(0xffc18a),
          emissiveIntensity: lightsTexture ? 1.12 : 0.2,
          normalMap: normalTexture || undefined,
          normalScale: new THREE.Vector2(0.2, 0.2),
          specularMap: specularTexture || undefined,
          specular: new THREE.Color(0x1c3048),
          shininess: 7,
        });

        body = new THREE.Mesh(sphereGeometry, earthMaterial);
        body.rotation.y = 0.75;
        tiltedAxis.add(body);

        if (cloudsTexture) {
          const cloudMaterial = new THREE.MeshPhongMaterial({
            map: cloudsTexture,
            color: 0xc3d0df,
            transparent: true,
            opacity: 0.2,
            depthWrite: false,
          });
          cloudLayer = new THREE.Mesh(
            new THREE.SphereGeometry(1.071, 96, 96),
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
              float rim = pow(1.0 - facing, 2.85);
              float softBand = smoothstep(0.0, 0.8, rim);
              gl_FragColor = vec4(0.24, 0.48, 0.78, softBand * 0.32);
            }
          `,
          side: THREE.BackSide,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const atmosphere = new THREE.Mesh(
          new THREE.SphereGeometry(1.105, 96, 96),
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
