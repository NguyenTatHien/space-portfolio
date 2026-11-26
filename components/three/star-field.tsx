"use client";

import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Small seeded PRNG so the nebula is identical on every render (keeps render pure). */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Faint coloured dust that drifts with scroll, giving depth behind the stars. */
function Nebula({ animate }: { animate: boolean }) {
  const points = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const random = mulberry32(20031);
    const palette = [new THREE.Color("#3b82f6"), new THREE.Color("#22d3ee"), new THREE.Color("#6366f1")];
    for (let i = 0; i < count; i++) {
      const r = 8 + random() * 12;
      const theta = random() * Math.PI * 2;
      const y = (random() - 0.5) * 6 * Math.exp(-random() * 2);
      positions.set([Math.cos(theta) * r, y, Math.sin(theta) * r - 24], i * 3);
      const c = palette[i % palette.length];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, []);
  const sprite = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.4, "rgba(255,255,255,0.35)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((_, delta) => {
    if (!points.current) return;
    const scroll = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    if (animate) points.current.rotation.y += delta * 0.01;
    points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, 0.25 + scroll * 0.6, 0.05);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial map={sprite} size={0.18} vertexColors transparent alphaTest={0.01} opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Camera() {
  useFrame((state) => {
    const scroll = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 1 - scroll * 3, 0.05);
  });
  return null;
}

function SpinningStars({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (animate && group.current) {
      group.current.rotation.y -= delta / 60;
      group.current.rotation.x -= delta / 90;
    }
  });
  return (
    <group ref={group}>
      <Stars radius={60} depth={50} count={7000} factor={3.5} saturation={0.4} fade speed={animate ? 0.8 : 0} />
    </group>
  );
}

export default function StarField() {
  const reduced = useReducedMotion();
  const animate = !reduced;
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 1], fov: 75 }} gl={{ antialias: false, alpha: true }} aria-hidden>
      <Suspense fallback={null}>
        <SpinningStars animate={animate} />
        <Nebula animate={animate} />
        <Camera />
      </Suspense>
    </Canvas>
  );
}
