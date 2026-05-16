export const BOOK = {
  amazonUrl: "https://www.amazon.com/dp/PLACEHOLDER-JOVE-BOOK",
  covers: {
    en: {
      front: "/imgs/book-front.png",
      back: "/imgs/book-back.png",
    },
    es: {
      front: "/imgs/book-front-sp.png",
      back: "/imgs/book-back-sp.png",
    },
  },
} as const;

export type BookEdition = "en" | "es";
export type BookMedallion = "en" | "es" | "audio";
