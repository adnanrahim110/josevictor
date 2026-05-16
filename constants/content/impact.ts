export type TestimonialPalette = "sage" | "warm" | "deep";

export interface Testimonial {
  id: string;
  quoteKey:
    | "impact.testimonial.1.quote"
    | "impact.testimonial.2.quote"
    | "impact.testimonial.3.quote";
  nameKey:
    | "impact.testimonial.1.name"
    | "impact.testimonial.2.name"
    | "impact.testimonial.3.name";
  roleKey:
    | "impact.testimonial.1.role"
    | "impact.testimonial.2.role"
    | "impact.testimonial.3.role";
  palette: TestimonialPalette;
  /** Decorative leaf shape variant in the card corner */
  leaf: "a" | "b" | "c";
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "atlas",
    quoteKey: "impact.testimonial.1.quote",
    nameKey: "impact.testimonial.1.name",
    roleKey: "impact.testimonial.1.role",
    palette: "sage",
    leaf: "a",
  },
  {
    id: "aurora",
    quoteKey: "impact.testimonial.2.quote",
    nameKey: "impact.testimonial.2.name",
    roleKey: "impact.testimonial.2.role",
    palette: "warm",
    leaf: "b",
  },
  {
    id: "liminal",
    quoteKey: "impact.testimonial.3.quote",
    nameKey: "impact.testimonial.3.name",
    roleKey: "impact.testimonial.3.role",
    palette: "deep",
    leaf: "c",
  },
];
