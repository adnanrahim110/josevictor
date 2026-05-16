"use client";

import { useSyncExternalStore } from "react";

export const ease = {
  organic: "power2.inOut",
  ceremonial: "power3.out",
  snap: "back.out(1.7)",
  pollen: "sine.inOut",
  cssOrganic: "cubic-bezier(0.65, 0, 0.35, 1)",
  cssCeremonial: "cubic-bezier(0.22, 1, 0.36, 1)",
  cssSnap: "cubic-bezier(0.5, 1.7, 0.45, 0.95)",
} as const;

export const dur = {
  quick: 0.4,
  base: 0.8,
  slow: 1.2,
  ceremonial: 1.8,
} as const;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
