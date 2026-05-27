"use client";

// Need to update imports to include usePathname
import { usePathname } from "next/navigation";
import { LocaleToggle } from "@/components/layout/locale-toggle";
import { Button } from "@/components/ui/button";
import { LINKS } from "@/constants/content/links";
import { HEADER_NAV } from "@/constants/content/nav";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import * as React from "react";

export function Header() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState<number | null>(null);

  const prevHovered = React.useRef<number | null>(null);
  const pillRef = React.useRef<HTMLDivElement>(null);
  const linkRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const isDark = isScrolled || menuOpen;

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const el = pillRef.current;
    if (!el) return;

    if (hovered === null) {
      gsap.to(el, {
        opacity: 0,
        scale: 0.92,
        duration: 0.25,
        ease: "power2.out",
      });
      prevHovered.current = null;
      return;
    }

    const target = linkRefs.current[hovered];
    const nav = target?.parentElement;
    if (!target || !nav) return;

    const tR = target.getBoundingClientRect();
    const nR = nav.getBoundingClientRect();
    const newX = tR.left - nR.left;
    const newW = tR.width;

    if (prevHovered.current === null) {
      gsap.set(el, { x: newX, width: newW, scale: 0.92 });
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(el, {
        x: newX,
        width: newW,
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    }

    prevHovered.current = hovered;
  }, [hovered]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      if (menuOpen) {
        document.body.style.overflow = "hidden";
        const items = overlay.querySelectorAll<HTMLElement>(".ov-item");
        gsap.to(overlay, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.7,
          ease: "power4.inOut",
        });
        gsap.fromTo(
          items,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.35,
          },
        );
      } else {
        document.body.style.overflow = "";
        gsap.to(overlay, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    },
    { dependencies: [menuOpen] },
  );

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  React.useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[padding] duration-700 ease-ceremonial",
          isScrolled ? "pt-3" : "pt-5",
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-4 transition-all border duration-700 ease-ceremonial",
            isScrolled
              ? "max-w-5xl w-fit bg-primary-950/90 backdrop-blur-2xl rounded-full border-primary-800/30 shadow-[0_8px_32px_rgba(9,13,8,0.25)] px-5 py-2"
              : "max-w-[90%] px-4 sm:px-6 lg:px-8 py-1 border-transparent",
          )}
        >
          <Link
            href="/"
            aria-label={t("header.aria.brand")}
            className="group shrink-0"
          >
            <span
              className={cn(
                "font-heading italic font-medium tracking-tight leading-none transition-all duration-500",
                isDark
                  ? "text-2xl text-secondary-200"
                  : "text-3xl sm:text-4xl text-primary-950",
              )}
            >
              {t("header.brand")}
            </span>
          </Link>

          <nav
            aria-label={t("header.aria.brand")}
            className="hidden md:flex items-center relative"
            onMouseLeave={() => setHovered(null)}
          >
            <div
              ref={pillRef}
              aria-hidden
              className={cn(
                "absolute inset-y-0.5 rounded-full opacity-0 pointer-events-none",
                isScrolled
                  ? "bg-white/8 border border-white/6"
                  : "bg-primary-100 border border-primary-200/70 shadow-sm",
              )}
              style={{ willChange: "transform, width, opacity" }}
            />
            {HEADER_NAV.map((link, i) => {
              const isActive = pathname === link.href || (link.href !== '/' && !link.href.startsWith('/#') && pathname.startsWith(link.href));
              
              return (
              <Link
                key={link.labelKey}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                href={link.href}
                onMouseEnter={() => setHovered(i)}
                className={cn(
                  "relative px-5 py-2.5 font-sans font-medium transition-colors duration-300",
                  isScrolled
                    ? (isActive ? "text-[15px] text-white" : "text-[15px] text-primary-300 hover:text-white")
                    : (isActive ? "text-base text-primary-950" : "text-base text-primary-700 hover:text-primary-950"),
                )}
              >
                <span className="relative flex items-center gap-1.5">
                  <span
                    className={cn(
                      "size-1 rounded-full transition-all duration-300",
                      isScrolled ? "bg-secondary-400" : "bg-secondary-600",
                      hovered === i || (hovered === null && isActive)
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-0",
                    )}
                  />
                  {t(link.labelKey)}
                </span>
              </Link>
            )})}
          </nav>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <LocaleToggle dark={isScrolled} />
            <Button
              href={LINKS.contact}
              variant={isScrolled ? "secondary" : "default"}
              size="sm"
              className={cn(
                "transition-all duration-500",
                isScrolled && "h-9 text-xs",
              )}
            >
              {t("header.cta")}
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "md:hidden relative size-10 flex items-center justify-center rounded-full transition-colors duration-300",
              isDark
                ? "text-primary-200 hover:bg-primary-800/50"
                : "text-primary-900 hover:bg-primary-100/50",
            )}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-overlay"
            aria-label={
              menuOpen
                ? t("header.aria.menu.close")
                : t("header.aria.menu.open")
            }
          >
            <div className="flex flex-col items-center justify-center gap-1.25 w-5">
              <span
                className={cn(
                  "block h-[1.5px] w-full rounded-full bg-current transition-all duration-500 origin-center",
                  menuOpen && "rotate-45 translate-y-[6.5px]",
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] rounded-full bg-current transition-all duration-500",
                  menuOpen ? "w-0 opacity-0" : "w-3/4",
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-full rounded-full bg-current transition-all duration-500 origin-center",
                  menuOpen && "-rotate-45 translate-y-[-6.5px]",
                )}
              />
            </div>
          </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        id="mobile-overlay"
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-primary-950 md:hidden flex flex-col"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <nav
          className="flex-1 flex flex-col justify-center px-8 sm:px-12 gap-1"
          aria-label="Mobile"
        >
          {HEADER_NAV.map((link, i) => (
            <Link
              key={link.labelKey}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="ov-item group flex items-baseline gap-4 py-3 opacity-0"
            >
              <span className="text-xs font-sans font-medium text-primary-600 tracking-widest tabular-nums w-6">
                0{i + 1}
              </span>
              <span className="font-heading italic text-4xl sm:text-5xl text-primary-100 group-hover:text-secondary-300 transition-colors duration-500">
                {t(link.labelKey)}
              </span>
            </Link>
          ))}

          <div className="ov-item mt-10 flex items-center gap-6 opacity-0">
            <LocaleToggle dark />
          </div>

          <div className="ov-item mt-6 opacity-0">
            <Button
              href={LINKS.contact}
              variant="secondary"
              size="lg"
              onClick={() => setMenuOpen(false)}
            >
              {t("header.cta")}
            </Button>
          </div>
        </nav>

        <div className="px-8 sm:px-12 pb-10">
          <div
            aria-hidden
            className="h-px w-full bg-linear-to-r from-transparent via-primary-700 to-transparent"
          />
          <p className="mt-4 text-xs text-primary-600 font-sans tracking-wider">
            {t("hero.eyebrow")}
          </p>
        </div>
      </div>
    </>
  );
}
