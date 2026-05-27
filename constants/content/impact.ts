export type TestimonialPalette = "sage" | "warm" | "deep";

export interface Testimonial {
  id: string;
  quoteKey:
    | "impact.testimonial.1.quote"
    | "impact.testimonial.2.quote"
    | "impact.testimonial.3.quote"
    | "impact.testimonial.4.quote";
  nameKey:
    | "impact.testimonial.1.name"
    | "impact.testimonial.2.name"
    | "impact.testimonial.3.name"
    | "impact.testimonial.4.name";
  roleKey:
    | "impact.testimonial.1.role"
    | "impact.testimonial.2.role"
    | "impact.testimonial.3.role"
    | "impact.testimonial.4.role";
  palette: TestimonialPalette;
  leaf: "a" | "b" | "c";
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "nichole-marquez",
    quoteKey: "impact.testimonial.1.quote",
    nameKey: "impact.testimonial.1.name",
    roleKey: "impact.testimonial.1.role",
    palette: "sage",
    leaf: "a",
  },
  {
    id: "julie-okonkwo",
    quoteKey: "impact.testimonial.2.quote",
    nameKey: "impact.testimonial.2.name",
    roleKey: "impact.testimonial.2.role",
    palette: "warm",
    leaf: "b",
  },
  {
    id: "marcus-williams",
    quoteKey: "impact.testimonial.3.quote",
    nameKey: "impact.testimonial.3.name",
    roleKey: "impact.testimonial.3.role",
    palette: "deep",
    leaf: "c",
  },
  {
    id: "ann-lopez",
    quoteKey: "impact.testimonial.4.quote",
    nameKey: "impact.testimonial.4.name",
    roleKey: "impact.testimonial.4.role",
    palette: "sage",
    leaf: "b",
  },
];
