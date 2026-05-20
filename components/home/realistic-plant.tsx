"use client";

import { usePrefersReducedMotion } from "@/lib/motion";
import { Environment, OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEM_COLOR = new THREE.Color("#4d5e44");
const BRANCH_COLOR = new THREE.Color("#5a6c4f");
const ROOT_MAIN = new THREE.Color("#9a8263");
const ROOT_FINE = new THREE.Color("#b59a76");
const LEAF_DEEP = new THREE.Color("#4d6645");
const LEAF_FRESH = new THREE.Color("#7d9468");
const LEAF_YOUNG = new THREE.Color("#91a874");
const BUD_GOLD = new THREE.Color("#c8a572");
const BUD_WARM = new THREE.Color("#f1d79c");
const NODE_DARK = new THREE.Color("#3f4f38");

function createPath(points: Array<[number, number, number?]>) {
  return new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(p[0], p[1], p[2] ?? 0)),
  );
}

function lighten(color: THREE.Color, amount: number) {
  return color.clone().lerp(new THREE.Color("#ffffff"), amount);
}

function darken(color: THREE.Color, amount: number) {
  return color.clone().lerp(new THREE.Color("#000000"), amount);
}

const ORGANIC_CANVAS_CACHE = new Map<string, HTMLCanvasElement>();
const TIP_FADE_CANVAS_CACHE = new Map<string, HTMLCanvasElement>();

function buildTipFadeCanvas(start: number, size: number): HTMLCanvasElement | null {
  if (typeof document === "undefined") return null;

  const key = `${start}|${size}`;
  const cached = TIP_FADE_CANVAS_CACHE.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = 4;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createLinearGradient(0, 0, size, 0);
  gradient.addColorStop(0, "rgb(255,255,255)");
  gradient.addColorStop(start, "rgb(255,255,255)");
  gradient.addColorStop(1, "rgb(0,0,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, 4);

  TIP_FADE_CANVAS_CACHE.set(key, canvas);
  return canvas;
}

function createTipFadeTexture(start = 0.58, size = 128) {
  const canvas = buildTipFadeCanvas(start, size);
  if (!canvas) return null;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

function buildOrganicCanvas(
  baseColor: THREE.Color,
  accentColor: THREE.Color,
  mode: "stem" | "root" | "leaf" | "bud",
  size: number,
): HTMLCanvasElement | null {
  if (typeof document === "undefined") return null;

  const key = `${baseColor.getHexString()}|${accentColor.getHexString()}|${mode}|${size}`;
  const cached = ORGANIC_CANVAS_CACHE.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const image = ctx.createImageData(size, size);
  const data = image.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;

      const fineNoise =
        Math.sin((u * 41 + v * 17) * Math.PI) * 0.5 +
        Math.sin((u * 19 - v * 29) * Math.PI) * 0.3 +
        Math.sin((u * 71 + v * 53) * Math.PI) * 0.2;

      let streak = 0;

      if (mode === "leaf") {
        const centerVein = Math.exp(-Math.abs(u - 0.5) * 32);
        const sideVein =
          Math.exp(-Math.abs(u - 0.5 - Math.sin(v * 9) * 0.18) * 28) * 0.25;

        streak =
          centerVein * 0.38 +
          sideVein +
          Math.sin(v * 28 + u * 9) * 0.06 +
          fineNoise * 0.08;
      }

      if (mode === "stem") {
        streak =
          Math.sin(u * 22 + v * 4) * 0.12 +
          Math.sin(u * 56 + v * 9) * 0.07 +
          fineNoise * 0.12;
      }

      if (mode === "root") {
        streak =
          Math.sin(u * 15 + v * 8) * 0.13 +
          Math.sin(u * 44 - v * 5) * 0.08 +
          fineNoise * 0.16;
      }

      if (mode === "bud") {
        streak =
          Math.sin(v * 18) * 0.08 +
          Math.sin(u * 26 + v * 8) * 0.09 +
          fineNoise * 0.07;
      }

      const amount = THREE.MathUtils.clamp(0.45 + streak, 0, 1);
      const c = baseColor.clone().lerp(accentColor, amount);

      const idx = (y * size + x) * 4;
      data[idx] = Math.floor(c.r * 255);
      data[idx + 1] = Math.floor(c.g * 255);
      data[idx + 2] = Math.floor(c.b * 255);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  ORGANIC_CANVAS_CACHE.set(key, canvas);
  return canvas;
}

function createOrganicTexture(
  baseColor: THREE.Color,
  accentColor: THREE.Color,
  mode: "stem" | "root" | "leaf" | "bud",
  size = 256,
) {
  const canvas = buildOrganicCanvas(baseColor, accentColor, mode, size);
  if (!canvas) return null;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

function createOrganicMaterial({
  base,
  accent,
  mode,
  roughness,
  metalness = 0.02,
  bumpScale = 0.035,
  repeat = [1, 1],
  side = THREE.FrontSide,
  emissive,
  emissiveIntensity = 0,
}: {
  base: THREE.Color;
  accent: THREE.Color;
  mode: "stem" | "root" | "leaf" | "bud";
  roughness: number;
  metalness?: number;
  bumpScale?: number;
  repeat?: [number, number];
  side?: THREE.Side;
  emissive?: THREE.Color;
  emissiveIntensity?: number;
}) {
  const map = createOrganicTexture(base, accent, mode, 256);
  const bumpMap = createOrganicTexture(
    darken(base, 0.22),
    lighten(base, 0.22),
    mode,
    128,
  );

  if (map) map.repeat.set(repeat[0], repeat[1]);
  if (bumpMap) bumpMap.repeat.set(repeat[0], repeat[1]);

  const mProps: any = {
    color: base,
    map: map ?? undefined,
    bumpMap: bumpMap ?? undefined,
    bumpScale,
    roughness,
    metalness,
    side,
  };
  
  if (emissive !== undefined) {
    mProps.emissive = emissive;
    mProps.emissiveIntensity = emissiveIntensity;
  }

  return new THREE.MeshStandardMaterial(mProps);
}

const STEM_CURVE = createPath([
  [0, 0, 0],
  [0.035, 0.42, 0.06],
  [-0.07, 0.9, -0.035],
  [0.055, 1.42, 0.07],
  [-0.045, 1.95, -0.05],
  [0.04, 2.52, 0.06],
  [-0.025, 3.04, -0.025],
  [0.015, 3.48, 0.03],
]);

const BRANCH_CURVES = [
  createPath([
    [0.01, 0.95, 0.02],
    [0.24, 1.15, 0.11],
    [0.62, 1.36, 0.14],
    [0.96, 1.62, 0.08],
  ]),
  createPath([
    [-0.01, 1.68, -0.02],
    [-0.28, 1.88, -0.11],
    [-0.62, 2.08, -0.15],
    [-0.92, 2.34, -0.08],
  ]),
  createPath([
    [0.015, 2.38, 0.03],
    [0.23, 2.55, 0.12],
    [0.48, 2.72, 0.13],
    [0.68, 2.93, 0.07],
  ]),
];

const ROOT_CURVES = [
  createPath([
    [0, 0, 0],
    [-0.06, -1, 0.08],
    [0.08, -2.22, -0.06],
    [-0.08, -3.52, 0.05],
    [0.05, -4.85, -0.04],
    [-0.02, -6, 0.02],
  ]),
  createPath([
    [0, 0, 0],
    [-0.48, -0.62, 0.1],
    [-1.38, -1.36, -0.08],
    [-2.35, -2.22, 0.07],
    [-3.08, -3.42, -0.05],
    [-3.36, -5.15, 0.03],
  ]),
  createPath([
    [0, 0, 0],
    [0.58, -0.7, -0.1],
    [1.48, -1.45, 0.08],
    [2.32, -2.4, -0.07],
    [3.05, -3.58, 0.05],
    [3.18, -5.25, -0.03],
  ]),
  createPath([
    [0, 0, 0],
    [-0.2, -1.06, -0.08],
    [-0.78, -2.35, 0.07],
    [-1.48, -3.62, -0.05],
    [-2.05, -5.18, 0.04],
  ]),
  createPath([
    [0, 0, 0],
    [0.24, -1.12, 0.07],
    [0.76, -2.28, -0.08],
    [1.32, -3.66, 0.06],
    [1.95, -5.24, -0.05],
  ]),
];

const SECONDARY_ROOTS = [
  createPath([
    [-0.48, -0.62, 0.02],
    [-0.95, -0.95, 0.08],
    [-1.55, -1.12, 0.11],
  ]),
  createPath([
    [0.58, -0.7, -0.02],
    [1.08, -1.04, -0.08],
    [1.62, -1.18, -0.11],
  ]),
  createPath([
    [-1.38, -1.36, -0.03],
    [-1.95, -1.82, 0.08],
    [-2.28, -2.55, 0.12],
  ]),
  createPath([
    [1.48, -1.45, 0.03],
    [1.98, -1.92, -0.08],
    [2.34, -2.65, -0.12],
  ]),
  createPath([
    [-0.78, -2.35, 0.02],
    [-1.2, -2.72, 0.09],
    [-1.56, -3.38, 0.1],
  ]),
  createPath([
    [0.76, -2.28, -0.02],
    [1.22, -2.72, -0.09],
    [1.48, -3.35, -0.1],
  ]),
  createPath([
    [-2.35, -2.22, 0.02],
    [-2.72, -2.9, 0.08],
    [-2.86, -3.66, 0.1],
  ]),
  createPath([
    [2.32, -2.4, -0.02],
    [2.72, -2.98, -0.08],
    [2.82, -3.72, -0.1],
  ]),
];

const FINE_ROOT_HAIRS = [
  createPath([
    [-0.9, -1.05, 0.08],
    [-1.2, -1.35, 0.16],
    [-1.38, -1.78, 0.18],
  ]),
  createPath([
    [0.92, -1, -0.08],
    [1.28, -1.28, -0.15],
    [1.45, -1.72, -0.18],
  ]),
  createPath([
    [-1.8, -1.75, 0.05],
    [-2.15, -2.02, 0.14],
    [-2.38, -2.42, 0.16],
  ]),
  createPath([
    [1.88, -1.84, -0.05],
    [2.18, -2.12, -0.14],
    [2.48, -2.5, -0.16],
  ]),
  createPath([
    [-1.25, -3, 0.08],
    [-1.66, -3.35, 0.16],
    [-1.9, -3.86, 0.16],
  ]),
  createPath([
    [1.18, -3.04, -0.08],
    [1.58, -3.42, -0.16],
    [1.88, -3.92, -0.16],
  ]),
  createPath([
    [-2.7, -3.25, 0.06],
    [-3.05, -3.68, 0.14],
    [-3.18, -4.25, 0.14],
  ]),
  createPath([
    [2.72, -3.3, -0.06],
    [3.08, -3.75, -0.14],
    [3.16, -4.34, -0.14],
  ]),
];

interface GrowingTubeProps {
  curve: THREE.CatmullRomCurve3;
  color: THREE.Color;
  radiusStart: number;
  radiusEnd?: number;
  progressRef: RefObject<number>;
  opacityRef?: RefObject<number>;
  delay?: number;
  speed?: number;
  segments?: number;
  radialSegments?: number;
  materialKind?: "stem" | "branch" | "root" | "fineRoot";
  organicAmount?: number;
  seed?: number;
}

function GrowingTube({
  curve,
  color,
  radiusStart,
  radiusEnd,
  progressRef,
  opacityRef,
  delay = 0,
  speed = 1,
  segments = 52,
  radialSegments = 12,
  materialKind = "stem",
  organicAmount = 0.06,
  seed = 1,
}: GrowingTubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const reduce = usePrefersReducedMotion();
  const lastProgressRef = useRef(-1);
  const lastOpacityRef = useRef(-1);

  const { fullGeo, material } = useMemo(() => {
    const positions: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    const tEnd = radiusEnd ?? radiusStart * 0.5;
    const points = curve.getPoints(segments);
    const frames = curve.computeFrenetFrames(segments, false);

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const baseRadius = THREE.MathUtils.lerp(radiusStart, tEnd, t);
      const p = points[i];
      const N = frames.normals[i];
      const B = frames.binormals[i];

      for (let j = 0; j < radialSegments; j++) {
        const theta = (j / radialSegments) * Math.PI * 2;
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);

        const ringNoise =
          Math.sin(t * 13.5 + seed * 1.7) * organicAmount +
          Math.sin(theta * 3 + t * 18 + seed) * organicAmount * 0.45 +
          Math.sin(theta * 7 + t * 9 + seed * 2.1) * organicAmount * 0.22;

        const r = baseRadius * (1 + ringNoise);

        const nx = cos * N.x + sin * B.x;
        const ny = cos * N.y + sin * B.y;
        const nz = cos * N.z + sin * B.z;

        positions.push(p.x + r * nx, p.y + r * ny, p.z + r * nz);
        normals.push(nx, ny, nz);
        uvs.push(t, j / radialSegments);
      }
    }

    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const a = i * radialSegments + j;
        const b = i * radialSegments + ((j + 1) % radialSegments);
        const c = (i + 1) * radialSegments + j;
        const d = (i + 1) * radialSegments + ((j + 1) % radialSegments);
        indices.push(a, b, d, a, d, c);
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    g.setIndex(indices);
    g.computeVertexNormals();

    const mode =
      materialKind === "root" || materialKind === "fineRoot" ? "root" : "stem";

    const repeat: [number, number] =
      materialKind === "root" || materialKind === "fineRoot"
        ? [1.3, 7]
        : [1.5, 5];

    const m = createOrganicMaterial({
      base: color,
      accent:
        materialKind === "fineRoot"
          ? lighten(color, 0.36)
          : materialKind === "root"
            ? lighten(color, 0.18)
            : lighten(color, 0.14),
      mode,
      roughness: materialKind === "fineRoot" ? 0.9 : 0.76,
      metalness: 0.02,
      bumpScale: materialKind === "fineRoot" ? 0.045 : 0.032,
      repeat,
    });

    if (materialKind === "root" || materialKind === "fineRoot") {
      m.alphaMap = createTipFadeTexture(
        materialKind === "fineRoot" ? 0.44 : 0.54,
      );
      m.transparent = true;
      m.depthWrite = false;
    }

    return { fullGeo: g, material: m };
  }, [
    curve,
    color,
    radiusStart,
    radiusEnd,
    segments,
    radialSegments,
    materialKind,
    organicAmount,
    seed,
  ]);

  const liveGeo = useMemo(() => fullGeo.clone(), [fullGeo]);

  useFrame(() => {
    if (!meshRef.current) return;

    const opacity = opacityRef?.current ?? 1;
    if (Math.abs(lastOpacityRef.current - opacity) > 0.004) {
      const hasTipFade =
        materialKind === "root" || materialKind === "fineRoot";
      material.opacity = opacity;
      material.transparent = hasTipFade || opacity < 0.995;
      material.depthWrite = !(hasTipFade || opacity < 0.995);
      material.needsUpdate = true;
      lastOpacityRef.current = opacity;
    }

    let p = 1;

    if (!reduce) {
      const globalProgress = progressRef.current ?? 0;
      p = Math.max(0, Math.min(1, (globalProgress - delay) * speed));
      p = 1 - Math.pow(1 - p, 3);
    }

    if (Math.abs(lastProgressRef.current - p) < 0.001) return;
    lastProgressRef.current = p;

    const geo = meshRef.current.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const fullPos = fullGeo.attributes.position as THREE.BufferAttribute;

    const cutoffT = p;
    const tipPoint = curve.getPointAt(Math.max(0.0001, cutoffT));

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const ringStart = i * radialSegments;

      if (t <= cutoffT) {
        for (let j = 0; j < radialSegments; j++) {
          const idx = ringStart + j;
          pos.setXYZ(
            idx,
            fullPos.getX(idx),
            fullPos.getY(idx),
            fullPos.getZ(idx),
          );
        }
      } else {
        for (let j = 0; j < radialSegments; j++) {
          const idx = ringStart + j;
          pos.setXYZ(idx, tipPoint.x, tipPoint.y, tipPoint.z);
        }
      }
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh
      ref={meshRef}
      geometry={liveGeo}
      material={material}
      castShadow
      receiveShadow
    />
  );
}

interface OrganicNodeProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale: [number, number, number];
  progressRef: RefObject<number>;
  opacityRef?: RefObject<number>;
  delay: number;
  color?: THREE.Color;
  materialKind?: "stem" | "root";
}

function OrganicNode({
  position,
  rotation = [0, 0, 0],
  scale,
  progressRef,
  opacityRef,
  delay,
  color = NODE_DARK,
  materialKind = "stem",
}: OrganicNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const reduce = usePrefersReducedMotion();
  const lastOpacityRef = useRef(-1);

  const { geo, mat } = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 24, 16);

    const m = createOrganicMaterial({
      base: color,
      accent: lighten(color, 0.18),
      mode: materialKind === "root" ? "root" : "stem",
      roughness: 0.82,
      metalness: 0.015,
      bumpScale: 0.035,
      repeat: [1.5, 3],
    });

    return { geo: g, mat: m };
  }, [color, materialKind]);

  useFrame(() => {
    if (!meshRef.current) return;

    const opacity = opacityRef?.current ?? 1;
    if (Math.abs(lastOpacityRef.current - opacity) > 0.004) {
      mat.opacity = opacity;
      mat.transparent = opacity < 0.995;
      mat.depthWrite = opacity >= 0.995;
      mat.needsUpdate = true;
      lastOpacityRef.current = opacity;
    }

    let p = 1;

    if (!reduce) {
      const globalProgress = progressRef.current ?? 0;
      p = Math.max(0, Math.min(1, (globalProgress - delay) * 4));
      p = 1 - Math.pow(1 - p, 4);
    }

    meshRef.current.scale.set(scale[0] * p, scale[1] * p, scale[2] * p);
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geo}
      material={mat}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    />
  );
}

interface LeafProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  progressRef: RefObject<number>;
  delay: number;
  variant?: "broad" | "narrow" | "young";
  color?: THREE.Color;
}

function Leaf({
  position,
  rotation,
  scale,
  progressRef,
  delay,
  variant = "broad",
  color = LEAF_DEEP,
}: LeafProps) {
  const groupRef = useRef<THREE.Group>(null);
  const reduce = usePrefersReducedMotion();

  const { leafGeo, leafMat, midVeinGeo, sideVeinGeos, veinMat } =
    useMemo(() => {
      const length =
        variant === "narrow" ? 1.76 : variant === "young" ? 1.35 : 1.58;
      const width =
        variant === "narrow" ? 0.24 : variant === "young" ? 0.3 : 0.44;

      const shape = new THREE.Shape();

      shape.moveTo(0, 0);
      shape.bezierCurveTo(
        width * 0.55,
        length * 0.18,
        width * 1.1,
        length * 0.58,
        width * 0.78,
        length * 0.78,
      );
      shape.bezierCurveTo(
        width * 0.5,
        length * 0.94,
        width * 0.18,
        length,
        0,
        length,
      );
      shape.bezierCurveTo(
        -width * 0.18,
        length,
        -width * 0.5,
        length * 0.94,
        -width * 0.78,
        length * 0.78,
      );
      shape.bezierCurveTo(
        -width * 1.1,
        length * 0.58,
        -width * 0.55,
        length * 0.18,
        0,
        0,
      );

      const g = new THREE.ExtrudeGeometry(shape, {
        depth: 0.026,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.012,
        bevelSegments: 2,
        curveSegments: 36,
      });

      g.translate(0, 0, -0.013);

      const pos = g.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);

        const curl = Math.sin((y / length) * Math.PI) * 0.035;
        const edgeWave = Math.sin(y * 12 + x * 9) * 0.006;
        const centerLift = Math.exp(-Math.abs(x) * 9) * 0.012;

        pos.setZ(i, z + curl + edgeWave + centerLift);
      }

      pos.needsUpdate = true;
      g.computeVertexNormals();

      const m = createOrganicMaterial({
        base: color,
        accent: lighten(color, variant === "young" ? 0.28 : 0.18),
        mode: "leaf",
        roughness: 0.54,
        metalness: 0.015,
        bumpScale: 0.045,
        repeat: [1.2, 1.7],
        side: THREE.DoubleSide,
      });

      const veinColor = lighten(color, 0.38);

      const veinMaterial = new THREE.MeshStandardMaterial({
        color: veinColor,
        roughness: 0.6,
        metalness: 0.01,
        side: THREE.DoubleSide,
      });

      const mid = new THREE.TubeGeometry(
        createPath([
          [0, 0.05, 0.04],
          [0.012, length * 0.38, 0.065],
          [-0.008, length * 0.72, 0.065],
          [0, length * 0.94, 0.035],
        ]),
        24,
        variant === "narrow" ? 0.008 : 0.011,
        6,
        false,
      );

      const side: THREE.TubeGeometry[] = [];
      const veinRows =
        variant === "narrow" ? [0.32, 0.5, 0.66] : [0.28, 0.43, 0.58, 0.72];

      veinRows.forEach((row, index) => {
        const spread = width * (0.45 + index * 0.09);
        const sideRadius = variant === "narrow" ? 0.0038 : 0.0048;

        side.push(
          new THREE.TubeGeometry(
            createPath([
              [0, length * row, 0.055],
              [spread * 0.38, length * (row + 0.05), 0.06],
              [spread * 0.72, length * (row + 0.12), 0.048],
            ]),
            10,
            sideRadius,
            5,
            false,
          ),
        );

        side.push(
          new THREE.TubeGeometry(
            createPath([
              [0, length * row, 0.055],
              [-spread * 0.38, length * (row + 0.05), 0.06],
              [-spread * 0.72, length * (row + 0.12), 0.048],
            ]),
            10,
            sideRadius,
            5,
            false,
          ),
        );
      });

      return {
        leafGeo: g,
        leafMat: m,
        midVeinGeo: mid,
        sideVeinGeos: side,
        veinMat: veinMaterial,
      };
    }, [variant, color]);

  useFrame(() => {
    if (!groupRef.current) return;

    let p = 1;

    if (!reduce) {
      const globalProgress = progressRef.current ?? 0;
      p = Math.max(0, Math.min(1, (globalProgress - delay) * 4));
      p = 1 - Math.pow(1 - p, 4);
    }

    const s = scale * p;
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh geometry={leafGeo} material={leafMat} castShadow receiveShadow />
      <mesh geometry={midVeinGeo} material={veinMat} castShadow receiveShadow />
      {sideVeinGeos.map((geo, index) => (
        <mesh
          key={`leaf-vein-${index}`}
          geometry={geo}
          material={veinMat}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  );
}

function Bud({
  position,
  progressRef,
  delay,
}: {
  position: [number, number, number];
  progressRef: RefObject<number>;
  delay: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloInnerRef = useRef<THREE.Mesh>(null);
  const haloOuterRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const reduce = usePrefersReducedMotion();

  const {
    petalGeo,
    coreGeo,
    sepalGeo,
    petalMat,
    coreMat,
    sepalMat,
    haloInnerGeo,
    haloInnerMat,
    haloOuterGeo,
    haloOuterMat,
  } = useMemo(() => {
    const petalGeometry = new THREE.SphereGeometry(1, 32, 24);
    const coreGeometry = new THREE.SphereGeometry(1, 32, 24);
    const sepalGeometry = new THREE.SphereGeometry(1, 20, 14);

    const petalMaterial = createOrganicMaterial({
      base: BUD_GOLD,
      accent: BUD_WARM,
      mode: "bud",
      roughness: 0.42,
      metalness: 0.08,
      bumpScale: 0.025,
      repeat: [1.2, 2.2],
      emissive: BUD_GOLD,
      emissiveIntensity: 0.28,
    });

    const coreMaterial = createOrganicMaterial({
      base: BUD_WARM,
      accent: lighten(BUD_WARM, 0.25),
      mode: "bud",
      roughness: 0.3,
      metalness: 0.1,
      bumpScale: 0.02,
      repeat: [1, 1.8],
      emissive: BUD_WARM,
      emissiveIntensity: 1.25,
    });

    const sepalMaterial = createOrganicMaterial({
      base: darken(LEAF_DEEP, 0.05),
      accent: lighten(LEAF_DEEP, 0.16),
      mode: "leaf",
      roughness: 0.66,
      metalness: 0.01,
      bumpScale: 0.035,
      repeat: [1, 1.6],
      side: THREE.DoubleSide,
    });

    const innerGeo = new THREE.SphereGeometry(0.34, 28, 20);
    const innerMat = new THREE.MeshBasicMaterial({
      color: BUD_WARM,
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });

    const outerGeo = new THREE.SphereGeometry(0.72, 28, 20);
    const outerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ffe5aa"),
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });

    return {
      petalGeo: petalGeometry,
      coreGeo: coreGeometry,
      sepalGeo: sepalGeometry,
      petalMat: petalMaterial,
      coreMat: coreMaterial,
      sepalMat: sepalMaterial,
      haloInnerGeo: innerGeo,
      haloInnerMat: innerMat,
      haloOuterGeo: outerGeo,
      haloOuterMat: outerMat,
    };
  }, []);

  useFrame((state) => {
    let p = 1;

    if (!reduce) {
      const globalProgress = progressRef.current ?? 0;
      p = Math.max(0, Math.min(1, (globalProgress - delay) * 3.5));
      p = 1 - Math.pow(1 - p, 4);
    }

    const t = state.clock.elapsedTime;
    const pulse = reduce ? 1 : 1 + Math.sin(t * 1.55) * 0.075;
    const glow = reduce ? 1 : 0.84 + Math.sin(t * 1.55) * 0.16;

    if (groupRef.current) {
      groupRef.current.scale.set(p, p, p);
    }

    if (coreRef.current) {
      coreRef.current.scale.set(0.13 * pulse, 0.23 * pulse, 0.13 * pulse);
      (
        coreRef.current.material as THREE.MeshStandardMaterial
      ).emissiveIntensity = p * (1.2 + Math.sin(t * 1.55) * 0.18);
    }

    if (haloInnerRef.current) {
      const s = p * pulse;
      haloInnerRef.current.scale.set(s, s, s);
      (haloInnerRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.34 * p * glow;
    }

    if (haloOuterRef.current) {
      const s = p * (1 + (pulse - 1) * 1.5);
      haloOuterRef.current.scale.set(s, s, s);
      (haloOuterRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.16 * p * glow;
    }

    if (lightRef.current) {
      lightRef.current.intensity = p * (0.95 + Math.sin(t * 1.55) * 0.22);
    }
  });

  const petals = [
    {
      position: [0, 0.08, 0.02],
      rotation: [0.1, 0, 0],
      scale: [0.12, 0.34, 0.06],
    },
    {
      position: [0.08, 0.04, 0.01],
      rotation: [0.12, 0.26, -0.22],
      scale: [0.105, 0.31, 0.055],
    },
    {
      position: [-0.08, 0.04, 0.01],
      rotation: [0.12, -0.26, 0.22],
      scale: [0.105, 0.31, 0.055],
    },
    {
      position: [0.02, 0.045, -0.07],
      rotation: [-0.18, 0.08, 0.08],
      scale: [0.105, 0.3, 0.055],
    },
    {
      position: [0.015, 0.13, 0.07],
      rotation: [0.38, 0.05, -0.06],
      scale: [0.09, 0.28, 0.045],
    },
  ] as const;

  const sepals = [
    {
      position: [0, -0.08, 0.04],
      rotation: [0.9, 0, 0],
      scale: [0.055, 0.2, 0.035],
    },
    {
      position: [0.08, -0.08, -0.01],
      rotation: [0.55, 0.2, -0.65],
      scale: [0.05, 0.18, 0.032],
    },
    {
      position: [-0.08, -0.08, -0.01],
      rotation: [0.55, -0.2, 0.65],
      scale: [0.05, 0.18, 0.032],
    },
  ] as const;

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={haloOuterRef}
        geometry={haloOuterGeo}
        material={haloOuterMat}
      />
      <mesh
        ref={haloInnerRef}
        geometry={haloInnerGeo}
        material={haloInnerMat}
      />

      {sepals.map((sepal, index) => (
        <mesh
          key={`sepal-${index}`}
          geometry={sepalGeo}
          material={sepalMat}
          position={sepal.position}
          rotation={sepal.rotation}
          scale={sepal.scale}
          castShadow
          receiveShadow
        />
      ))}

      {petals.map((petal, index) => (
        <mesh
          key={`bud-petal-${index}`}
          geometry={petalGeo}
          material={petalMat}
          position={petal.position}
          rotation={petal.rotation}
          scale={petal.scale}
          castShadow
          receiveShadow
        />
      ))}

      <mesh
        ref={coreRef}
        geometry={coreGeo}
        material={coreMat}
        position={[0, 0.11, 0.02]}
        castShadow
        receiveShadow
      />

      <pointLight
        ref={lightRef}
        color={BUD_WARM}
        distance={3.1}
        decay={1.55}
        intensity={1}
      />
    </group>
  );
}

function PlantScene({
  mountRef,
  scrollRef,
  rootOpacityRef,
}: {
  mountRef: RefObject<number>;
  scrollRef: RefObject<number>;
  rootOpacityRef: RefObject<number>;
}) {
  return (
    <>
      <ambientLight intensity={0.48} />

      <directionalLight
        position={[4, 6, 5]}
        intensity={1.45}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <directionalLight
        position={[-5, 2, 4]}
        intensity={0.34}
        color="#dfe7c8"
      />

      <directionalLight
        position={[0, 3, -5]}
        intensity={0.22}
        color="#efe2bd"
      />

      <hemisphereLight args={["#fff5e0", "#3a2f20", 0.36]} />

      <group scale={[1.24, 1.24, 1.24]}>
        <OrganicNode
          position={[0, 0.02, 0.015]}
          rotation={[0.25, 0.15, -0.15]}
          scale={[0.16, 0.1, 0.13]}
          progressRef={mountRef}
          delay={0}
          color={darken(STEM_COLOR, 0.08)}
        />

        <GrowingTube
          curve={STEM_CURVE}
          color={STEM_COLOR}
          radiusStart={0.078}
          radiusEnd={0.023}
          progressRef={mountRef}
          delay={0}
          speed={1}
          materialKind="stem"
          organicAmount={0.075}
          seed={2}
        />

        {BRANCH_CURVES.map((curve, i) => (
          <GrowingTube
            key={`branch-${i}`}
            curve={curve}
            color={BRANCH_COLOR}
            radiusStart={0.036}
            radiusEnd={0.012}
            progressRef={mountRef}
            delay={0.3 + i * 0.08}
            speed={2}
            materialKind="branch"
            organicAmount={0.08}
            seed={8 + i}
          />
        ))}

        <OrganicNode
          position={[0.01, 0.95, 0.025]}
          rotation={[0.1, 0.3, -0.5]}
          scale={[0.09, 0.058, 0.07]}
          progressRef={mountRef}
          delay={0.31}
          color={NODE_DARK}
        />

        <OrganicNode
          position={[-0.015, 1.68, -0.025]}
          rotation={[0.1, -0.3, 0.45]}
          scale={[0.082, 0.054, 0.068]}
          progressRef={mountRef}
          delay={0.42}
          color={NODE_DARK}
        />

        <OrganicNode
          position={[0.015, 2.38, 0.035]}
          rotation={[0.16, 0.28, -0.32]}
          scale={[0.072, 0.048, 0.06]}
          progressRef={mountRef}
          delay={0.54}
          color={NODE_DARK}
        />

        <Leaf
          position={[0.065, 0.78, 0.095]}
          rotation={[0.15, -0.2, -0.92]}
          scale={0.54}
          progressRef={mountRef}
          delay={0.34}
          variant="broad"
          color={LEAF_DEEP}
        />

        <Leaf
          position={[-0.055, 1.22, -0.085]}
          rotation={[-0.18, 0.18, 0.82]}
          scale={0.48}
          progressRef={mountRef}
          delay={0.4}
          variant="narrow"
          color={LEAF_DEEP}
        />

        <Leaf
          position={[0.07, 1.62, 0.09]}
          rotation={[0.22, -0.12, -0.58]}
          scale={0.44}
          progressRef={mountRef}
          delay={0.5}
          variant="broad"
          color={LEAF_FRESH}
        />

        <Leaf
          position={[-0.07, 2.02, -0.1]}
          rotation={[-0.22, 0.08, 0.6]}
          scale={0.4}
          progressRef={mountRef}
          delay={0.55}
          variant="narrow"
          color={LEAF_DEEP}
        />

        <Leaf
          position={[0.075, 2.55, 0.1]}
          rotation={[0.18, -0.08, -0.43]}
          scale={0.36}
          progressRef={mountRef}
          delay={0.6}
          variant="young"
          color={LEAF_YOUNG}
        />

        <Leaf
          position={[-0.055, 3.08, -0.07]}
          rotation={[-0.15, 0.08, 0.34]}
          scale={0.31}
          progressRef={mountRef}
          delay={0.65}
          variant="young"
          color={LEAF_FRESH}
        />

        <Leaf
          position={[0.94, 1.55, 0.14]}
          rotation={[0.08, -0.34, -0.42]}
          scale={0.38}
          progressRef={mountRef}
          delay={0.6}
          variant="narrow"
          color={LEAF_FRESH}
        />

        <Leaf
          position={[0.75, 1.5, 0.17]}
          rotation={[0.12, -0.25, -1.18]}
          scale={0.3}
          progressRef={mountRef}
          delay={0.62}
          variant="broad"
          color={LEAF_DEEP}
        />

        <Leaf
          position={[-0.88, 2.25, -0.14]}
          rotation={[0.12, 0.28, 0.52]}
          scale={0.36}
          progressRef={mountRef}
          delay={0.65}
          variant="narrow"
          color={LEAF_FRESH}
        />

        <Leaf
          position={[-0.67, 2.2, -0.17]}
          rotation={[0.06, 0.26, 1.08]}
          scale={0.28}
          progressRef={mountRef}
          delay={0.68}
          variant="broad"
          color={LEAF_DEEP}
        />

        <Leaf
          position={[0.67, 2.86, 0.14]}
          rotation={[0.13, -0.22, -0.34]}
          scale={0.3}
          progressRef={mountRef}
          delay={0.7}
          variant="young"
          color={LEAF_YOUNG}
        />

        <Bud
          position={[0.015, 3.55, 0.045]}
          progressRef={mountRef}
          delay={0.85}
        />
      </group>

      <group scale={[0.78, 0.94, 0.78]}>
        {ROOT_CURVES.map((curve, i) => (
          <GrowingTube
            key={`root-${i}`}
            curve={curve}
            color={ROOT_MAIN}
            radiusStart={i === 0 ? 0.072 : 0.052}
            radiusEnd={i === 0 ? 0.012 : 0.008}
            progressRef={scrollRef}
            opacityRef={rootOpacityRef}
            delay={0}
            speed={1.4}
            materialKind="root"
            organicAmount={0.105}
            seed={20 + i}
            segments={56}
            radialSegments={12}
          />
        ))}

        {SECONDARY_ROOTS.map((curve, i) => (
          <GrowingTube
            key={`sroot-${i}`}
            curve={curve}
            color={ROOT_FINE}
            radiusStart={0.023}
            radiusEnd={0.005}
            progressRef={scrollRef}
            opacityRef={rootOpacityRef}
            delay={0.15 + (i % 4) * 0.04}
            speed={2.2}
            segments={30}
            radialSegments={8}
            materialKind="fineRoot"
            organicAmount={0.13}
            seed={50 + i}
          />
        ))}

        {FINE_ROOT_HAIRS.map((curve, i) => (
          <GrowingTube
            key={`root-hair-${i}`}
            curve={curve}
            color={lighten(ROOT_FINE, 0.1)}
            radiusStart={0.012}
            radiusEnd={0.0025}
            progressRef={scrollRef}
            opacityRef={rootOpacityRef}
            delay={0.24 + (i % 5) * 0.035}
            speed={2.8}
            segments={20}
            radialSegments={6}
            materialKind="fineRoot"
            organicAmount={0.18}
            seed={90 + i}
          />
        ))}

        <OrganicNode
          position={[-0.48, -0.62, 0.1]}
          rotation={[0.3, 0.1, -0.4]}
          scale={[0.055, 0.035, 0.045]}
          progressRef={scrollRef}
          opacityRef={rootOpacityRef}
          delay={0.12}
          color={darken(ROOT_MAIN, 0.05)}
          materialKind="root"
        />

        <OrganicNode
          position={[0.58, -0.7, -0.1]}
          rotation={[0.2, -0.1, 0.45]}
          scale={[0.05, 0.033, 0.042]}
          progressRef={scrollRef}
          opacityRef={rootOpacityRef}
          delay={0.12}
          color={darken(ROOT_MAIN, 0.04)}
          materialKind="root"
        />

        <OrganicNode
          position={[-1.38, -1.36, -0.08]}
          rotation={[0.25, 0.2, -0.2]}
          scale={[0.04, 0.026, 0.034]}
          progressRef={scrollRef}
          opacityRef={rootOpacityRef}
          delay={0.18}
          color={ROOT_FINE}
          materialKind="root"
        />

        <OrganicNode
          position={[1.48, -1.45, 0.08]}
          rotation={[0.15, -0.3, 0.22]}
          scale={[0.038, 0.025, 0.032]}
          progressRef={scrollRef}
          opacityRef={rootOpacityRef}
          delay={0.18}
          color={ROOT_FINE}
          materialKind="root"
        />
      </group>
    </>
  );
}

export function RealisticPlantBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountProgressRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const rootOpacityRef = useRef(1);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const stemTween = gsap.to(mountProgressRef, {
      current: 1,
      duration: 3.2,
      ease: "power3.out",
      delay: 0.4,
    });

    const purposeSection = document.getElementById("purpose");
    const scrollTriggerTarget = purposeSection ?? document.body;

    if (reduce) {
      scrollProgressRef.current = 1;
      rootOpacityRef.current = 0.48;
    } else {
      rootOpacityRef.current = 1;
    }

    const rootTween = reduce
      ? undefined
      : gsap.to(scrollProgressRef, {
          current: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=1400",
            scrub: 0.6,
          },
        });

    const rootOpacityTween = reduce
      ? undefined
      : gsap.to(rootOpacityRef, {
          current: 0.42,
          ease: "none",
          scrollTrigger: {
            trigger: scrollTriggerTarget,
            start: "top 84%",
            end: "top 22%",
            scrub: 0.8,
          },
        });

    return () => {
      rootOpacityTween?.scrollTrigger?.kill();
      rootOpacityTween?.kill();
      rootTween?.scrollTrigger?.kill();
      rootTween?.kill();
      stemTween.kill();
    };
  }, [reduce]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 z-0 h-[200vh] w-[min(900px,90vw)] -translate-x-1/2"
    >
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} shadows={{ type: THREE.PCFShadowMap }}>
        <OrthographicCamera makeDefault position={[0, 0, 12]} zoom={88} />
        <PlantScene
          mountRef={mountProgressRef}
          scrollRef={scrollProgressRef}
          rootOpacityRef={rootOpacityRef}
        />
        <Suspense fallback={null}>
          <Environment preset="park" environmentIntensity={0.34} />
        </Suspense>
      </Canvas>
    </div>
  );
}
