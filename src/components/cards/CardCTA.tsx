import Link from "next/link";

/** Shared pill-shaped call-to-action used at the bottom of team/project/track cards. */
export function CardCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-sm font-bold text-primary transition-all duration-300 hover:gap-3 hover:border-primary hover:bg-primary hover:text-on-primary hover:shadow-[0_10px_22px_-10px_rgba(79,204,182,0.6)] active:scale-95"
    >
      {label}
      <span className="material-symbols-outlined text-[18px]" aria-hidden>
        arrow_back
      </span>
    </Link>
  );
}
