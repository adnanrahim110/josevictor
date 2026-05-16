export const ABOUT = {
  /** Placeholder portrait — replace with real photo of José later. */
  portrait:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900",
  /**
   * Placeholder handwritten "Jove" signature, composed of 5 stroke paths so
   * DrawSVG can draw them in sequence. Replace with the client's real signature.
   */
  signaturePaths: [
    "M 24 28 C 16 24, 8 34, 16 44 L 16 66 C 16 80, 2 82, -2 72",
    "M 32 52 C 38 44, 56 44, 60 54 C 60 62, 46 64, 40 60 C 36 56, 40 50, 48 48",
    "M 70 44 L 82 64 L 94 44",
    "M 108 54 C 118 48, 134 50, 134 60 C 134 66, 122 66, 118 60 L 148 58",
    "M 156 54 C 196 48, 250 52, 296 45 C 308 42, 314 50, 304 56",
  ],
} as const;
