"use client";

import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Quaternion, Vector3 } from "three";

type Point = [number, number, number];

function Connector({ from, to, tint = "#8b9bea" }: { from: Point; to: Point; tint?: string }) {
  const start = new Vector3(...from);
  const end = new Vector3(...to);
  const direction = end.clone().sub(start);
  const rotation = new Quaternion().setFromUnitVectors(
    new Vector3(0, 1, 0),
    direction.clone().normalize()
  );
  const midpoint = start.clone().add(end).multiplyScalar(0.5);

  return (
    <mesh position={midpoint} quaternion={rotation}>
      <cylinderGeometry args={[0.012, 0.012, direction.length(), 8]} />
      <meshStandardMaterial color={tint} roughness={0.45} metalness={0.25} />
    </mesh>
  );
}

function Module({
  position,
  colour,
  scale = 1
}: {
  position: Point;
  colour: string;
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow>
        <boxGeometry args={[0.42, 0.34, 0.3]} />
        <meshStandardMaterial color={colour} roughness={0.28} metalness={0.16} />
      </mesh>
      <mesh position={[0, 0, 0.154]}>
        <planeGeometry args={[0.28, 0.2]} />
        <meshBasicMaterial color="#f2f0e9" transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, -0.11, 0.158]}>
        <boxGeometry args={[0.15, 0.018, 0.008]} />
        <meshBasicMaterial color="#f07859" />
      </mesh>
    </group>
  );
}

function Network() {
  const [tilt, setTilt] = useState<[number, number]>([0, 0]);
  const points: Point[] = [
    [0, 0, 0],
    [-1.08, 0.62, 0],
    [1.08, 0.62, 0],
    [-1.08, -0.62, 0],
    [1.08, -0.62, 0]
  ];

  return (
    <group
      rotation={[tilt[0], tilt[1], 0]}
      onPointerMove={(event) => setTilt([-event.pointer.y * 0.12, event.pointer.x * 0.16])}
      onPointerOut={() => setTilt([0, 0])}
    >
      <mesh rotation={[Math.PI / 2.7, 0.18, -0.2]}>
        <torusGeometry args={[1.65, 0.009, 6, 100]} />
        <meshBasicMaterial color="#3358df" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 2.45, -0.16, 0.24]}>
        <torusGeometry args={[1.28, 0.006, 6, 100]} />
        <meshBasicMaterial color="#f07859" transparent opacity={0.72} />
      </mesh>

      <Connector from={points[0]} to={points[1]} />
      <Connector from={points[0]} to={points[2]} />
      <Connector from={points[0]} to={points[3]} />
      <Connector from={points[0]} to={points[4]} />

      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.88, 0.65, 0.52]} />
        <meshStandardMaterial color="#3358df" roughness={0.24} metalness={0.22} />
      </mesh>
      <mesh position={[0, 0, 0.266]}>
        <planeGeometry args={[0.64, 0.43]} />
        <meshBasicMaterial color="#f2f0e9" />
      </mesh>
      <mesh position={[-0.2, 0.1, 0.274]}>
        <boxGeometry args={[0.22, 0.025, 0.006]} />
        <meshBasicMaterial color="#3358df" />
      </mesh>
      <mesh position={[-0.1, -0.01, 0.274]}>
        <boxGeometry args={[0.42, 0.012, 0.006]} />
        <meshBasicMaterial color="#b8c0d6" />
      </mesh>
      <mesh position={[-0.16, -0.09, 0.274]}>
        <boxGeometry args={[0.3, 0.012, 0.006]} />
        <meshBasicMaterial color="#b8c0d6" />
      </mesh>

      <Module position={points[1]} colour="#f07859" />
      <Module position={points[2]} colour="#8ea2ef" />
      <Module position={points[3]} colour="#b8d8c9" />
      <Module position={points[4]} colour="#222733" />

      {points.slice(1).map((point, index) => (
        <mesh position={[point[0], point[1], 0.2]} key={index}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#f07859" />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroSystemScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 37 }}
      dpr={[1, 1.35]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={<div className="hero-system-loading" />}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-3, -2, 3]} intensity={0.65} color="#f07859" />
      <Network />
    </Canvas>
  );
}
