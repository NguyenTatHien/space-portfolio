"use client";

import { Float, Html, Sparkles, Trail } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

import { useReducedMotion } from "@/lib/use-reduced-motion";

const coreVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

// Dark planet with a glowing lat/long HUD grid, a scanning band and a fresnel rim.
const coreFragment = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec2 vUv;
  float line(float v, float w) {
    float d = abs(fract(v) - 0.5);
    return smoothstep(0.5 - w, 0.5, d);
  }
  void main() {
    float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
    vec3 deep = vec3(0.02, 0.04, 0.11);
    vec3 blue = vec3(0.23, 0.51, 0.96);
    vec3 cyan = vec3(0.13, 0.83, 0.93);
    float lon = line(vUv.x * 24.0 + uTime * 0.05, 0.035);
    float lat = line(vUv.y * 14.0, 0.035);
    float grid = max(lon, lat) * 0.55;
    float band = smoothstep(0.46, 0.5, abs(fract(vUv.y - uTime * 0.06) - 0.5));
    float noise = fract(sin(dot(floor(vUv * vec2(90.0, 45.0)), vec2(12.9898, 78.233))) * 43758.5453);
    float city = step(0.985, noise) * (0.6 + 0.4 * sin(uTime * 2.0 + noise * 40.0));
    vec3 col = deep + blue * grid * 0.7 + cyan * band * 0.6 + vec3(0.98, 0.75, 0.14) * city * 0.9;
    col += mix(blue, cyan, fres) * fres * 1.4;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const atmoFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float i = pow(clamp(-dot(vNormal, vView), 0.0, 1.0), 1.5);
    gl_FragColor = vec4(0.23, 0.55, 1.0, 1.0) * i * 1.4;
  }
`;

function Planet({ animate }: { animate: boolean }) {
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((_, delta) => {
    if (!animate) return;
    if (material.current) material.current.uniforms.uTime.value += delta;
    if (core.current) core.current.rotation.y += delta * 0.08;
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.05;
      shell.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group>
      <mesh ref={core}>
        <sphereGeometry args={[1.5, 96, 96]} />
        <shaderMaterial ref={material} vertexShader={coreVertex} fragmentShader={coreFragment} uniforms={uniforms} />
      </mesh>
      <mesh scale={1.22}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <shaderMaterial
          vertexShader={coreVertex}
          fragmentShader={atmoFragment}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[2.15, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

type OrbitProps = {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  label?: string;
  offset?: number;
  animate: boolean;
};

function Orbit({ radius, tilt, speed, color, label, offset = 0, animate }: OrbitProps) {
  const sat = useRef<THREE.Mesh>(null);
  const angle = useRef(offset);

  useFrame((_, delta) => {
    if (animate) angle.current += delta * speed;
    if (sat.current) {
      sat.current.position.set(Math.cos(angle.current) * radius, 0, Math.sin(angle.current) * radius);
    }
  });

  return (
    <group rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.006, 8, 200]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} />
      </mesh>
      <Trail width={1.4} length={6} color={color} attenuation={(t) => t * t}>
        <mesh ref={sat}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color={color} toneMapped={false} />
          {label ? (
            <Html center distanceFactor={5} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
              <span className="whitespace-nowrap rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[11px] tracking-wider text-ink backdrop-blur">
                {label}
              </span>
            </Html>
          ) : null}
        </mesh>
      </Trail>
    </group>
  );
}

function Rig({ children, animate }: { children: React.ReactNode; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current || !animate) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.35, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.2, 0.04);
  });
  return <group ref={group}>{children}</group>;
}

export default function PlanetScene() {
  const reduced = useReducedMotion();
  const animate = !reduced;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 9.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={animate ? "always" : "demand"}
      aria-hidden
    >
      <Suspense fallback={null}>
        <Rig animate={animate}>
          <Float speed={animate ? 1.2 : 0} rotationIntensity={0.15} floatIntensity={0.6}>
            <group rotation={[0.25, 0, -0.18]}>
              <Planet animate={animate} />
              <Orbit radius={2.6} tilt={[0.35, 0, 0.12]} speed={0.55} color="#22d3ee" label="React · Next.js" animate={animate} />
              <Orbit radius={3.05} tilt={[-0.5, 0.4, -0.2]} speed={0.4} color="#3b82f6" label="Laravel · NestJS" offset={2} animate={animate} />
              <Orbit radius={3.5} tilt={[1.1, -0.3, 0.3]} speed={0.3} color="#fbbf24" label="AI · RAG" offset={4} animate={animate} />
            </group>
          </Float>
          <Sparkles count={120} scale={[9, 6, 6]} size={2.2} speed={animate ? 0.35 : 0} color="#93c5fd" opacity={0.7} />
        </Rig>
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.5} luminanceSmoothing={0.4} radius={0.75} />
          <Vignette offset={0.25} darkness={0.7} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
