<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Specific Rules for JVJ Consulting Redesign
1. **Styling**: Use Tailwind CSS class-based styling exclusively. Do not use inline styles or custom CSS classes outside of standard Tailwind `@theme`, `@layer base/components/utilities`.
2. **Component Architecture**: Create proper reusable, conditional, dynamic components in the `@components` folder (e.g., `components/ui`, `components/layout`, `components/home`). Every tag, element, or section used more than once MUST be a separate component for centralized UI management.
3. **Spacing System**: Maintain consistent spacing using an 8px grid system (and 4px for micro-details) throughout the entire design and website.
4. **Responsiveness**: Build with a mobile-first approach, ensuring optimal layouts on every device and screen size.
5. **HTML Semantics**: Always use semantic HTML5 elements (e.g., `<header>`, `<main>`, `<section>`, `<article>`).
6. **Typography**: Use the custom local font for headings (`Ahganirya`) defined in `@theme` and pair it with a highly legible Google Font (`next/font/google`) for body text.
7. **Animations & Interactions**: Use properly balanced parallax effects, scroll-driven effects (via Framer Motion and Lenis), cursor-based effects, and touch-based effects (for touch screens) where recommended across the whole website.
