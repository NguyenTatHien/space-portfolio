"use client";

import { Float, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef } from "react";
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
  // Anti-aliased line: distance to the nearest integer in screen pixels.
  float line(float v, float widthPx) {
    float fw = max(fwidth(v), 1e-4);
    float g = abs(fract(v - 0.5) - 0.5) / fw;
    return 1.0 - smoothstep(0.0, widthPx, g);
  }
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float ndv = clamp(dot(n, v), 0.0, 1.0);
    float fres = pow(max(1.0 - ndv, 1e-4), 2.4);
    vec3 deep = vec3(0.02, 0.04, 0.11);
    vec3 blue = vec3(0.23, 0.51, 0.96);
    vec3 cyan = vec3(0.13, 0.83, 0.93);
    // Fade detail toward the poles where UV cells squash and lines converge.
    float poleFade = smoothstep(0.12, 0.4, sin(vUv.y * 3.14159265));
    float lon = line(vUv.x * 24.0, 1.4) * poleFade;
    float lat = line(vUv.y * 14.0, 1.4);
    float grid = max(lon, lat) * 0.5;
    float band = smoothstep(0.38, 0.5, abs(fract(vUv.y - uTime * 0.06) - 0.5));
    // City lights: small soft round dots inside sparse cells.
    vec2 cell = vUv * vec2(90.0, 45.0);
    vec2 id = floor(cell);
    float noise = fract(sin(dot(id, vec2(12.9898, 78.233))) * 43758.5453);
    float dist = length(fract(cell) - 0.5);
    float dotMask = 1.0 - smoothstep(0.1, 0.24, dist);
    float city = step(0.985, noise) * dotMask * poleFade * (0.85 + 0.15 * sin(uTime * 0.6 + noise * 40.0));
    vec3 col = deep + blue * grid * 0.6 + cyan * band * 0.3 + vec3(0.98, 0.75, 0.14) * city * 0.55;
    col += mix(blue, cyan, fres) * fres * 1.4;
    gl_FragColor = vec4(clamp(col, 0.0, 4.0), 1.0);
  }
`;

const atmoFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float d = clamp(-dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
    float i = pow(max(d, 1e-4), 1.5);
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
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.1} />
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
      <mesh ref={sat}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
        {label ? (
          <Html center distanceFactor={7} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
            <span className="whitespace-nowrap rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[11px] tracking-wider text-ink backdrop-blur">
              {label}
            </span>
          </Html>
        ) : null}
      </mesh>
    </group>
  );
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Plain point sprites with a soft round texture (no 1/distance falloff, so no Inf pixels for Bloom).
function Dust({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const count = 140;

  const positions = useMemo(() => {
    const rand = mulberry32(1337);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 9;
      arr[i * 3 + 1] = (rand() - 0.5) * 6;
      arr[i * 3 + 2] = (rand() - 0.5) * 6;
    }
    return arr;
  }, []);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state, delta) => {
    if (!animate || !group.current) return;
    group.current.rotation.y += delta * 0.02;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#93c5fd"
          size={0.06}
          sizeAttenuation
          map={texture}
          transparent
          opacity={0.7}
          depthWrite={false}
          alphaTest={0.01}
        />
      </points>
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
          <Dust animate={animate} />
        </Rig>
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.6} luminanceSmoothing={0.3} radius={0.75} />
          <Vignette offset={0.25} darkness={0.7} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
