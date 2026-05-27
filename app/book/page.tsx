import { BookHero } from "@/components/book/book-hero";
import { BookExcerpt } from "@/components/book/book-excerpt";

export default function BookPage() {
  return (
    <main
      id="main-content"
      className="relative flex flex-col min-h-screen pt-24"
    >
      <BookHero />
      <BookExcerpt />
    </main>
  );
}
