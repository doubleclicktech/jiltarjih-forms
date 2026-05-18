"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "الرئيسية", icon: "home" },
  { href: "/projects", label: "المشاريع", icon: "account_tree" },
  { href: "/teams", label: "الفرق", icon: "groups" },
] as const;

export function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 border-b border-outline-variant/80 bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/70",
          className,
        )}
      >
        <Container className="h-18 flex  items-center justify-between">
          <div className="flex py-3 items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-colors active:scale-95"
              aria-label="فتح القائمة"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            <Link
              href="/"
              className="flex py-2 items-center gap-3"
              aria-label="أكاديمية جيل ترجيح"
            >
              <img src="/images/logo.png" alt="شعار أكاديمية جيل ترجيح" className="w-36 mt-2  h-auto" />
            </Link>
          </div>

          <nav className="hidden md:flex  items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative font-body-md text-body-md transition-colors pb-1",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-tertiary",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute right-0 left-0 -bottom-1 h-[2px] rounded-full transition-all",
                    isActive(item.href) ? "bg-primary" : "bg-transparent",
                  )}
                  aria-hidden
                />
              </Link>
            ))}

            <Link
              href="/#register"
              className="bg-secondary text-on-secondary px-6 py-2.5 rounded-lg font-h3 text-[18px] shadow-sm hover:bg-secondary-container transition-all active:scale-95"
            >
              سجّل الآن
            </Link>
          </nav>
        </Container>
      </header>

      {/* Overlay */}
      <button
        type="button"
        className={cn(
          "fixed inset-0 z-[59] bg-black/30 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-label="إغلاق القائمة"
      />

      {/* Drawer */}
      <aside
        className={cn(
          "h-full w-80 fixed right-0 top-0 bg-surface-container shadow-xl z-[60] rounded-l-xl p-margin text-right flex flex-col gap-2 transition-transform",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الرئيسية"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-h3 text-lg text-primary">القائمة الرئيسية</h3>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-colors active:scale-95"
            aria-label="إغلاق القائمة"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex  items-center gap-4 p-4 rounded-lg transition-all",
              isActive(item.href)
                ? "bg-secondary-fixed text-on-secondary-fixed-variant"
                : "text-on-surface-variant hover:bg-surface-container-high",
            )}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-body-md">{item.label}</span>
          </Link>
        ))}

        <div className="mt-2 border-t border-outline-variant/70 pt-4" />

        <Link
          href="/#register"
          onClick={() => setOpen(false)}
          className="flex  items-center gap-4 p-4 rounded-lg transition-all bg-secondary text-on-secondary shadow-sm hover:bg-secondary-container"
        >
          <span className="material-symbols-outlined">how_to_reg</span>
          <span className="font-body-md font-bold">سجّل الآن</span>
        </Link>
      </aside>
    </>
  );
}

