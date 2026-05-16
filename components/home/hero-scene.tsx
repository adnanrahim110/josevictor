"use client";

import { usePrefersReducedMotion } from "@/lib/motion";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function OrganicSeed() {
  const meshRef = useRef<THREE.Mesh>(null);
  const reduce = usePrefersReducedMotion();

  // Create a highly detailed sphere geometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 64);
    // Store original positions for animation
    const positions = geo.attributes.position;
    const vertex = new THREE.Vector3();
    const originalPositions = [];
    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i);
      originalPositions.push(vertex.clone());
    }
    geo.userData.originalPositions = originalPositions;
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || reduce) return;
    const time = clock.getElapsedTime() * 0.5;
    const geo = meshRef.current.geometry as THREE.BufferGeometry;
    const positions = geo.attributes.position;
    const originals = geo.userData.originalPositions as THREE.Vector3[];

    const v = new THREE.Vector3();
    for (let i = 0; i < positions.count; i++) {
      v.copy(originals[i]);
      
      // Create an organic twisting/pulsing effect
      const noise =
        Math.sin(v.x * 2 + time) *
        Math.cos(v.y * 2 + time) *
        Math.sin(v.z * 2 + time);
        
      // Shape it slightly like a teardrop/seed
      const pull = Math.max(0, v.y);
      v.x *= 1 - pull * 0.1;
      v.z *= 1 - pull * 0.1;

      const displacement = 1 + noise * 0.15;
      v.multiplyScalar(displacement);
      
      positions.setXYZ(i, v.x, v.y, v.z);
    }
    
    positions.needsUpdate = true;
    geo.computeVertexNormals();
    
    // Slow rotation
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9}
          ior={1.4}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#f4ecd8"
          attenuationDistance={2}
          attenuationColor="#a68e5c"
        />
      </mesh>
    </Float>
  );
}

function InnerCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.8;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.4;
  });

  return (
    <mesh ref={meshRef} scale={0.7}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color="#d4af37" // Gold
        metalness={1}
        roughness={0.2}
        emissive="#594411"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function GoldDust() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 150;
  
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sca[i] = Math.random();
    }
    return [pos, sca];
  }, [count]);

  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    particlesRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.5;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={count}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#d4af37"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
            color="#ffffff"
          />
          <directionalLight
            position={[-5, -5, -5]}
            intensity={1}
            color="#f0e6d2"
          />
          <Environment preset="city" environmentIntensity={0.8} />
          <group position={[0, 0, 0]}>
            <OrganicSeed />
            <InnerCore />
          </group>
          <GoldDust />
        </Suspense>
      </Canvas>
    </div>
  );
}
