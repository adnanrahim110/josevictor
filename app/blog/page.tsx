import { BlogGrid } from "@/components/blog/blog-grid";
import { BlogHero } from "@/components/blog/blog-hero";
import { GlobalContact } from "@/components/layout/global-contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | JVJ Consulting",
  description:
    "Insights and perspectives on leadership, strategy, and human-centered growth from JVJ Consulting.",
};

export default function BlogPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <BlogHero />
      <BlogGrid />
      <GlobalContact />
    </main>
  );
}
