import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "white";

const styles: Record<Variant, string> = {
  primary:
    "bg-secondary text-on-secondary shadow-lg hover:bg-secondary-container active:scale-95",
  secondary:
    "border-2 border-primary text-primary hover:bg-primary/10 active:scale-95",
  ghost: "text-primary font-bold hover:underline",
  white:
    "bg-white text-on-primary shadow-md hover:scale-105 active:scale-95 transition-transform",
};

export function Button({
  as = "button",
  href,
  variant = "primary",
  className,
  children,
  type,
  disabled,
  onClick,
}: {
  as?: "button" | "link";
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-h3 text-lg transition-all";
  const cls = cn(base, styles[variant], disabled && "opacity-60", className);

  if (as === "link") {
    return (
      <Link className={cls} href={href ?? "#"}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

