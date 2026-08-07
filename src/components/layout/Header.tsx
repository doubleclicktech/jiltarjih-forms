"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "الرئيسة", icon: "home" },
  { href: "/tracks", label: "المسارات", icon: "alt_route" },
  { href: "/projects", label: "المشاريع", icon: "account_tree" },
  { href: "/teams", label: "فرق العمل", icon: "groups" },
  { href: "/companions", label: "المرافقون", icon: "diversity_3" },
  { href: "/contact", label: "تواصل معنا", icon: "mail" },
] as const;

export function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 border-b bg-surface/80 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-surface/70 transition-all duration-300",
          scrolled
            ? "border-outline-variant/70 shadow-[0_8px_24px_-8px_rgba(14,34,48,0.12)]"
            : "border-transparent shadow-none",
          className,
        )}
      >
        {/* Brand accent line */}
        <div className="h-[3px] w-full bg-gradient-to-l from-primary via-secondary to-primary opacity-90" aria-hidden />

        <Container className="h-[77px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-outline-variant bg-surface-container-lowest text-primary hover:bg-primary/10 hover:border-primary/30 transition-all active:scale-90"
              aria-label="فتح القائمة"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>

            <Link href="/" className="flex items-center gap-3 transition-transform duration-200 hover:scale-[1.03] active:scale-95" aria-label="منارة">
              <Image src="/images/logo.png" alt="منارة" width={160} height={64} className="w-28 sm:w-32 h-auto" priority />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-surface-container-low/60 border border-outline-variant/50 rounded-full p-1">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1.5 font-body-md text-body-md px-4 py-2 rounded-full transition-all duration-200",
                    active
                      ? "text-on-primary bg-primary shadow-[0_2px_10px_-2px_rgba(79,204,182,0.55)]"
                      : "text-on-surface-variant hover:text-primary hover:bg-surface",
                  )}
                >
                  <span
                    className={cn(
                      "material-symbols-outlined text-[18px] transition-opacity",
                      active ? "opacity-100" : "opacity-0 w-0 -ml-1.5",
                    )}
                    style={active ? { fontVariationSettings: '"FILL" 1' } : undefined}
                    aria-hidden
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/#register"
              className="group inline-flex items-center gap-2 bg-gradient-to-l from-secondary to-secondary-fixed-dim text-on-secondary px-6 py-2.5 rounded-full font-h3 text-[17px] shadow-[0_4px_14px_-4px_rgba(236,177,46,0.6)] hover:shadow-[0_6px_18px_-4px_rgba(236,177,46,0.75)] hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0"
            >
              <span
                className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:scale-110"
                aria-hidden
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                how_to_reg
              </span>
              انضم الآن
            </Link>
          </div>
        </Container>
      </header>

      <button
        type="button"
        className={cn(
          "fixed inset-0 z-[59] bg-on-surface/40 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-label="إغلاق القائمة"
        tabIndex={-1}
      />

      <aside
        className={cn(
          "h-full w-[85vw] max-w-80 fixed right-0 top-0 bg-surface-container-lowest shadow-2xl z-[60] text-right flex flex-col transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الرئيسية"
      >
        <div className="h-1 w-full bg-gradient-to-l from-primary via-secondary to-primary" aria-hidden />

        <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/70">
          <Image src="/images/logo.png" alt="منارة" width={140} height={56} className="w-28 h-auto" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-outline-variant bg-surface-container-lowest text-primary hover:bg-error/10 hover:border-error/30 hover:text-error hover:rotate-90 transition-all duration-200 active:scale-90"
            aria-label="إغلاق القائمة"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                  active
                    ? "bg-primary text-on-primary font-semibold shadow-[0_4px_14px_-4px_rgba(79,204,182,0.55)]"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface",
                )}
              >
                <span className="material-symbols-outlined" style={active ? { fontVariationSettings: '"FILL" 1' } : undefined}>
                  {item.icon}
                </span>
                <span className="font-body-md">{item.label}</span>
                {active && <span className="material-symbols-outlined text-[18px] ms-auto" aria-hidden>check_circle</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4 border-t border-outline-variant/70">
          <Link
            href="/#register"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 p-4 rounded-xl transition-all bg-gradient-to-l from-secondary to-secondary-fixed-dim text-on-secondary font-bold shadow-[0_4px_14px_-4px_rgba(236,177,46,0.6)] hover:shadow-[0_6px_18px_-4px_rgba(236,177,46,0.75)] active:scale-[0.98]"
          >
            <span className="material-symbols-outlined" aria-hidden style={{ fontVariationSettings: '"FILL" 1' }}>
              how_to_reg
            </span>
            <span className="font-body-md font-bold">انضم الآن</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
