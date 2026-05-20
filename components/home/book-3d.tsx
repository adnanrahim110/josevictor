"use client";

import { BOOK, type BookEdition } from "@/constants/content/book";
import { usePrefersReducedMotion } from "@/lib/motion";
import { ContactShadows, Environment, Sparkles, useTexture } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Deliberately small, well-framed proportions
const BOOK_W = 1.3;
const BOOK_H = 1.95;
const BOOK_D = 0.28;

// Cinematic 3/4 angle — spine peeks on the left
const BASE_ROT_X = -0.08;
const BASE_ROT_Y = 0.42;

// Passive parallax (when not dragging)
const TILT_X = 0.1;
const TILT_Y = 0.18;
const LERP_IDLE = 0.06;

// Drag tracking
const DRAG_SENSITIVITY = 0.0055; // rad per cursor pixel
const LERP_DRAG = 0.28; // sync tightness while dragging
const MAX_ROT_X = Math.PI / 2.5; // clamp tip-forward/back

interface Book3DProps {
  edition: BookEdition;
}

function makePaperTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, "#f4e6c2");
  grad.addColorStop(0.5, "#ead7a8");
  grad.addColorStop(1, "#dcc593");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(140, 100, 45, 0.22)";
  ctx.lineWidth = 1;
  for (let y = 0; y < canvas.height; y += 2) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(canvas.width, y + 0.5);
    ctx.stroke();
  }

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 14;
    data[i] = Math.max(0, Math.min(255, data[i] + n));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
  }
  ctx.putImageData(imageData, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

function makeSpineTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, "#1f2a20");
  grad.addColorStop(0.5, "#3a4c3b");
  grad.addColorStop(1, "#1f2a20");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(220, 187, 105, 0.4)";
  ctx.lineWidth = 1.5;
  [38, 58, canvas.height - 58, canvas.height - 38].forEach((y) => {
    ctx.beginPath();
    ctx.moveTo(12, y);
    ctx.lineTo(canvas.width - 12, y);
    ctx.stroke();
  });

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 22;
    data[i] = Math.max(0, Math.min(255, data[i] + n));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
  }
  ctx.putImageData(imageData, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function BookMesh({ edition }: Book3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isAnimatingRef = useRef(false);
  const prevEditionRef = useRef<BookEdition>(edition);
  const reduce = usePrefersReducedMotion();

  // Drag state — refs to avoid re-renders
  const isDraggingRef = useRef(false);
  const dragStartPxRef = useRef({ x: 0, y: 0 });
  const rotAtDragStartRef = useRef({ x: BASE_ROT_X, y: BASE_ROT_Y });
  const dragTargetRotRef = useRef({ x: BASE_ROT_X, y: BASE_ROT_Y });

  const [renderedEdition, setRenderedEdition] = useState<BookEdition>(edition);

  const textures = useTexture({
    enFront: BOOK.covers.en.front,
    enBack: BOOK.covers.en.back,
    esFront: BOOK.covers.es.front,
    esBack: BOOK.covers.es.back,
  });

  const paperTex = useMemo(() => makePaperTexture(), []);
  const spineTex = useMemo(() => makeSpineTexture(), []);

  useEffect(() => {
    Object.values(textures).forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 16;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
    });
  }, [textures]);

  useEffect(() => {
    if (prevEditionRef.current === edition) return;
    const group = groupRef.current;
    if (!group) return;

    isAnimatingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    tl.to(group.rotation, {
      y: BASE_ROT_Y - Math.PI / 2,
      duration: 0.5,
      ease: "power2.in",
    });
    tl.call(() => setRenderedEdition(edition));
    tl.to(group.rotation, {
      y: BASE_ROT_Y,
      duration: 0.55,
      ease: "power2.out",
    });

    prevEditionRef.current = edition;
  }, [edition]);

  // Drag handlers — grab to spin
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (isAnimatingRef.current || reduce) return;
    e.stopPropagation();
    isDraggingRef.current = true;
    dragStartPxRef.current = { x: e.clientX, y: e.clientY };
    const group = groupRef.current;
    if (group) {
      rotAtDragStartRef.current = {
        x: group.rotation.x,
        y: group.rotation.y,
      };
      dragTargetRotRef.current = {
        x: group.rotation.x,
        y: group.rotation.y,
      };
    }
    const target = e.target as Element & { setPointerCapture?: (id: number) => void };
    target.setPointerCapture?.(e.pointerId);
    if (typeof document !== "undefined") document.body.style.cursor = "grabbing";
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartPxRef.current.x;
    const dy = e.clientY - dragStartPxRef.current.y;
    dragTargetRotRef.current.y =
      rotAtDragStartRef.current.y + dx * DRAG_SENSITIVITY;
    dragTargetRotRef.current.x = THREE.MathUtils.clamp(
      rotAtDragStartRef.current.x + dy * DRAG_SENSITIVITY,
      -MAX_ROT_X,
      MAX_ROT_X,
    );
  };

  const endDrag = (e?: ThreeEvent<PointerEvent>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (e) {
      const target = e.target as Element & {
        releasePointerCapture?: (id: number) => void;
      };
      target.releasePointerCapture?.(e.pointerId);
    }
    if (typeof document !== "undefined") document.body.style.cursor = "";
  };

  const handlePointerEnter = () => {
    if (isAnimatingRef.current) return;
    if (typeof document !== "undefined" && !isDraggingRef.current) {
      document.body.style.cursor = "grab";
    }
  };

  const handlePointerLeave = () => {
    if (typeof document !== "undefined" && !isDraggingRef.current) {
      document.body.style.cursor = "";
    }
  };

  // Frame loop: drag-synced rotation OR passive parallax + gentle float
  useFrame((state) => {
    const group = groupRef.current;
    if (!group || isAnimatingRef.current) return;
    if (reduce) {
      // Hold at base rotation, no motion
      group.rotation.x = BASE_ROT_X;
      group.rotation.y = BASE_ROT_Y;
      group.position.y = 0;
      return;
    }

    let targetX: number;
    let targetY: number;
    let lerp: number;

    if (isDraggingRef.current) {
      targetX = dragTargetRotRef.current.x;
      targetY = dragTargetRotRef.current.y;
      lerp = LERP_DRAG;
    } else {
      targetX = BASE_ROT_X - state.pointer.y * TILT_X;
      targetY = BASE_ROT_Y + state.pointer.x * TILT_Y;
      lerp = LERP_IDLE;
    }

    group.rotation.x += (targetX - group.rotation.x) * lerp;
    group.rotation.y += (targetY - group.rotation.y) * lerp;

    group.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.035;
  });

  const isEs = renderedEdition === "es";
  const frontTex = isEs ? textures.esFront : textures.enFront;
  const backTex = isEs ? textures.esBack : textures.enBack;

  return (
    <group ref={groupRef} rotation={[BASE_ROT_X, BASE_ROT_Y, 0]}>
      <mesh
        castShadow
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerOver={handlePointerEnter}
        onPointerOut={handlePointerLeave}
      >
        <boxGeometry args={[BOOK_W, BOOK_H, BOOK_D]} />
        <meshStandardMaterial
          attach="material-0"
          map={paperTex ?? undefined}
          color="#efe1b6"
          roughness={0.95}
        />
        <meshStandardMaterial
          attach="material-1"
          map={spineTex ?? undefined}
          color="#3a4c3b"
          roughness={0.55}
          metalness={0.08}
        />
        <meshStandardMaterial
          attach="material-2"
          map={paperTex ?? undefined}
          color="#efe1b6"
          roughness={0.95}
        />
        <meshStandardMaterial
          attach="material-3"
          map={paperTex ?? undefined}
          color="#efe1b6"
          roughness={0.95}
        />
        <meshStandardMaterial
          attach="material-4"
          map={frontTex}
          roughness={0.42}
          metalness={0.05}
        />
        <meshStandardMaterial
          attach="material-5"
          map={backTex}
          roughness={0.42}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}

export function Book3D({ edition }: Book3DProps) {
  const reduce = usePrefersReducedMotion();
  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      camera={{ position: [0, 0.3, 5.5], fov: 28 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.4}
        color="#fff5e1"
      />
      <pointLight
        position={[0, 3, 2]}
        intensity={1.2}
        color="#f1dba7"
        distance={9}
        decay={2}
      />
      <pointLight
        position={[-3.5, 0.5, 2]}
        intensity={0.5}
        color="#7e957d"
        distance={10}
      />

      <Suspense fallback={null}>
        <Environment preset="apartment" environmentIntensity={0.45} />
        <BookMesh edition={edition} />
        <ContactShadows
          position={[0, -1.15, 0]}
          opacity={0.35}
          scale={6}
          blur={2.6}
          far={3}
        />
        {!reduce && (
          <Sparkles
            count={28}
            scale={[4, 3.5, 2]}
            size={3.5}
            speed={0.35}
            color="#f1dba7"
            opacity={0.65}
          />
        )}
      </Suspense>
    </Canvas>
  );
}
