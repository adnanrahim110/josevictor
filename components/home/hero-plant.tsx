"use client";

import { usePrefersReducedMotion } from "@/lib/motion";
import { Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const STEM_COLOR = new THREE.Color("#5a7355");
const LEAF_COLOR = new THREE.Color("#6b8c66");
const LEAF_TIP = new THREE.Color("#8aad7e");

function createStemCurve(): THREE.CatmullRomCurve3 {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -2.8, 0),
    new THREE.Vector3(0.02, -1.8, 0.01),
    new THREE.Vector3(-0.03, -0.8, -0.01),
    new THREE.Vector3(0.01, 0.2, 0.02),
    new THREE.Vector3(0, 1.2, 0),
    new THREE.Vector3(-0.02, 2.0, -0.01),
    new THREE.Vector3(0, 2.6, 0),
  ]);
}

function Stem({ progress }: { progress: React.RefObject<number> }) {
  const tubeRef = useRef<THREE.Mesh>(null);

  const { curve, fullGeo } = useMemo(() => {
    const c = createStemCurve();
    const g = new THREE.TubeGeometry(c, 80, 0.035, 8, false);
    return { curve: c, fullGeo: g };
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: STEM_COLOR,
        roughness: 0.7,
        metalness: 0.05,
      }),
    [],
  );

  useFrame(() => {
    if (!tubeRef.current) return;
    const p = progress.current ?? 1;
    const geo = tubeRef.current.geometry as THREE.TubeGeometry;
    const pos = geo.attributes.position;
    const fullPos = fullGeo.attributes.position;
    const count = pos.count;

    for (let i = 0; i < count; i++) {
      const fy = fullPos.getY(i);
      const normalizedY = (fy + 2.8) / 5.4;
      if (normalizedY <= p) {
        pos.setXYZ(i, fullPos.getX(i), fullPos.getY(i), fullPos.getZ(i));
      } else {
        const clampedPt = curve.getPointAt(Math.min(p, 1));
        pos.setXYZ(i, clampedPt.x, clampedPt.y, clampedPt.z);
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={tubeRef} geometry={fullGeo.clone()} material={material} />
  );
}

function Leaf({
  baseT,
  side,
  scale,
  progress,
}: {
  baseT: number;
  side: 1 | -1;
  scale: number;
  progress: React.RefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const { geo, mat } = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.12 * side, 0.15, 0.35 * side, 0.4, 0.25 * side, 0.7);
    shape.bezierCurveTo(0.15 * side, 0.9, 0.05 * side, 1.0, 0, 0.95);
    shape.bezierCurveTo(-0.03 * side, 0.85, -0.05 * side, 0.5, 0, 0);

    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.008,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.006,
      bevelSegments: 3,
    });

    const m = new THREE.MeshStandardMaterial({
      color: LEAF_COLOR,
      roughness: 0.55,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    return { geo: g, mat: m };
  }, [side]);

  const curve = useMemo(() => createStemCurve(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const p = progress.current ?? 1;
    const threshold = baseT;

    if (p < threshold) {
      meshRef.current.scale.setScalar(0);
      return;
    }

    const leafProgress = Math.min((p - threshold) / (1 - threshold), 1);
    const eased = 1 - Math.pow(1 - leafProgress, 3);
    const s = scale * eased;
    meshRef.current.scale.set(s, s, s);

    const pt = curve.getPointAt(Math.min(baseT, 0.99));
    const tangent = curve.getTangentAt(Math.min(baseT, 0.99));
    meshRef.current.position.copy(pt);

    const up = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(tangent, up).normalize();
    meshRef.current.quaternion.setFromRotationMatrix(
      new THREE.Matrix4().lookAt(
        new THREE.Vector3(),
        tangent,
        right.multiplyScalar(side),
      ),
    );

    const sway = Math.sin(clock.elapsedTime * 0.8 + baseT * 10) * 0.04;
    meshRef.current.rotation.z += sway;
  });

  return <mesh ref={meshRef} geometry={geo} material={mat} />;
}

const LEAVES = [
  { baseT: 0.3, side: -1 as const, scale: 0.65 },
  { baseT: 0.38, side: 1 as const, scale: 0.55 },
  { baseT: 0.52, side: -1 as const, scale: 0.72 },
  { baseT: 0.58, side: 1 as const, scale: 0.6 },
  { baseT: 0.72, side: 1 as const, scale: 0.5 },
  { baseT: 0.78, side: -1 as const, scale: 0.45 },
];

function PlantScene() {
  const groupRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  const reduce = usePrefersReducedMotion();

  useFrame((_, delta) => {
    if (reduce) {
      progressRef.current = 1;
      return;
    }
    if (progressRef.current < 1) {
      progressRef.current = Math.min(progressRef.current + delta * 0.25, 1);
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Stem progress={progressRef} />
      {LEAVES.map((leaf, i) => (
        <Leaf key={i} {...leaf} progress={progressRef} />
      ))}
    </group>
  );
}

export function HeroPlant({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.2, 5.5], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[3, 5, 4]}
            intensity={1.2}
            color="#fdf8e8"
            castShadow={false}
          />
          <directionalLight
            position={[-2, 3, -2]}
            intensity={0.4}
            color="#d4e7d0"
          />
          <Environment preset="apartment" environmentIntensity={0.3} />
          <PlantScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
