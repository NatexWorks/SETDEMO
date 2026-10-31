"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Group } from "three";

function OrbitObject() {
  const assembly = useRef<Group>(null);
  const inner = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!assembly.current || !inner.current) return;
    assembly.current.rotation.y += delta * 0.13;
    assembly.current.rotation.x += (state.pointer.y * 0.09 - assembly.current.rotation.x) * 0.035;
    assembly.current.rotation.z += (state.pointer.x * 0.06 - assembly.current.rotation.z) * 0.035;
    inner.current.rotation.y -= delta * 0.18;
    inner.current.rotation.x += delta * 0.07;
  });

  return (
    <group ref={assembly}>
      <mesh>
        <icosahedronGeometry args={[0.82, 2]} />
        <meshPhysicalMaterial color="#6572e9" roughness={0.25} metalness={0.5} transparent opacity={0.88} />
      </mesh>
      <mesh scale={1.018}>
        <icosahedronGeometry args={[0.82, 2]} />
        <meshBasicMaterial color="#b4bcff" wireframe transparent opacity={0.38} />
      </mesh>
      <group ref={inner}>
        <mesh rotation={[Math.PI / 2.6, 0.2, 0.1]}>
          <torusGeometry args={[1.19, 0.018, 8, 128]} />
          <meshStandardMaterial color="#f07558" metalness={0.5} roughness={0.28} />
        </mesh>
        <mesh rotation={[0.35, 0.7, Math.PI / 2.8]}>
          <torusGeometry args={[1.48, 0.012, 8, 128]} />
          <meshStandardMaterial color="#4b5ce1" metalness={0.65} roughness={0.24} />
        </mesh>
        <mesh rotation={[0.8, 0.1, 0.5]}>
          <torusGeometry args={[1.72, 0.009, 8, 128]} />
          <meshStandardMaterial color="#a5b9a0" metalness={0.35} roughness={0.42} />
        </mesh>
      </group>
      {Array.from({ length: 12 }, (_, index) => {
        const angle = (index / 12) * Math.PI * 2;
        const radius = index % 2 === 0 ? 1.88 : 1.54;
        return (
          <mesh key={index} position={[Math.cos(angle) * radius, Math.sin(angle * 1.6) * 0.42, Math.sin(angle) * radius]}>
            <sphereGeometry args={[index % 3 === 0 ? 0.055 : 0.032, 12, 12]} />
            <meshStandardMaterial color={index % 3 === 0 ? "#f07558" : "#d9d9d2"} emissive="#252a4d" emissiveIntensity={0.12} />
          </mesh>
        );
      })}
    </group>
  );
}

function StaticOrbit() {
  return (
    <svg viewBox="0 0 480 480" role="presentation" focusable="false">
      <defs>
        <linearGradient id="orbit-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8792f5" />
          <stop offset="1" stopColor="#4654c8" />
        </linearGradient>
      </defs>
      <g fill="none" strokeWidth="1.5">
        <ellipse cx="240" cy="240" rx="176" ry="75" stroke="#ed765d" transform="rotate(-34 240 240)" />
        <ellipse cx="240" cy="240" rx="202" ry="104" stroke="#4d5de0" transform="rotate(41 240 240)" />
        <ellipse cx="240" cy="240" rx="150" ry="193" stroke="#a5b9a0" transform="rotate(66 240 240)" />
      </g>
      <path d="M240 122 334 175 334 281 240 335 146 281 146 175Z" fill="url(#orbit-fill)" opacity=".94" />
      <path d="m240 122 94 53-94 54-94-54Z" fill="#b8c0ff" opacity=".42" />
      <path d="M240 229 334 175v106l-94 54Z" fill="#303da8" opacity=".42" />
      <path d="m146 175 94 54v106l-94-54Z" fill="#242e86" opacity=".26" />
      <g fill="#f07558">
        <circle cx="91" cy="123" r="6" /><circle cx="382" cy="309" r="5" /><circle cx="331" cy="73" r="4" />
      </g>
      <g fill="#6572e9"><circle cx="106" cy="347" r="5" /><circle cx="375" cy="144" r="4" /></g>
    </svg>
  );
}

export default function HeroScene() {
  const frame = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 760px)").matches;
    if (reduced || compact || !("IntersectionObserver" in window)) return;

    setEnabled(true);
    const node = frame.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => setVisible(entries[0]?.isIntersecting ?? false),
      { rootMargin: "180px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero-scene" ref={frame} aria-hidden="true">
      {enabled ? (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.7], fov: 38 }}
          frameloop={visible ? "always" : "never"}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          fallback={<div className="hero-scene__fallback"><StaticOrbit /></div>}
        >
          <ambientLight intensity={1.05} />
          <directionalLight position={[3, 4, 5]} intensity={2.2} color="#fff5e8" />
          <pointLight position={[-3, -1, 2]} intensity={1.1} color="#6572e9" />
          <Suspense fallback={null}><OrbitObject /></Suspense>
        </Canvas>
      ) : (
        <div className="hero-scene__fallback"><StaticOrbit /></div>
      )}
      <span className="hero-scene__halo" />
    </div>
  );
}
