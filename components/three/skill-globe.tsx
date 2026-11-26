"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

import { useReducedMotion } from "@/lib/use-reduced-motion";

type Props = { labels: string[] };

function fibonacciSphere(n: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return pts;
}

function Globe({ labels, animate }: Props & { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const points = useMemo(() => fibonacciSphere(labels.length, 2.4), [labels.length]);
  const world = useMemo(() => new THREE.Vector3(), []);
  const drag = useRef({ vx: 0.12, vy: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (animate) {
      const target = 0.12 + state.pointer.x * 0.5;
      drag.current.vx = THREE.MathUtils.lerp(drag.current.vx, target, 0.03);
      drag.current.vy = THREE.MathUtils.lerp(drag.current.vy, -state.pointer.y * 0.25, 0.03);
      g.rotation.y += delta * drag.current.vx;
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, drag.current.vy, 0.05);
    }
    // Labels on the far side fade and shrink so the sphere reads as 3D.
    points.forEach((p, i) => {
      const el = nodes.current[i];
      if (!el) return;
      world.copy(p).applyMatrix4(g.matrixWorld);
      const depth = (world.z + 2.4) / 4.8; // 0 back .. 1 front
      el.style.opacity = String(0.18 + depth * 0.82);
      el.style.transform = `scale(${0.7 + depth * 0.45})`;
      el.style.filter = depth < 0.35 ? "blur(1px)" : "none";
    });
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[2.25, 24, 16]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.04} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {points.map((p, i) => (
        <group key={labels[i]} position={p}>
          <mesh>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#93c5fd" />
          </mesh>
          <Html center zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
            <span
              ref={(el) => {
                nodes.current[i] = el;
              }}
              className="block whitespace-nowrap rounded-full border border-accent/30 bg-space/70 px-2.5 py-1 font-mono text-[11px] text-ink transition-[filter]"
            >
              {labels[i]}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}

export default function SkillGlobe({ labels }: Props) {
  const reduced = useReducedMotion();
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7.6], fov: 45 }} gl={{ alpha: true, antialias: true }} aria-hidden>
      <Suspense fallback={null}>
        <Globe labels={labels} animate={!reduced} />
      </Suspense>
    </Canvas>
  );
}
