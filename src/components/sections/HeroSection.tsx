import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const STATS = [
  { value: "+١٢٠", label: "مشارك نشط",    icon: "groups"        },
  { value: "١٠",   label: "فريق تخصصي",   icon: "account_tree"  },
  { value: "٥",    label: "مشاريع فاعلة", icon: "rocket_launch" },
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden min-h-screen flex flex-col">

      {/* ── Background image ──────────────────────────────────── */}
      <Image
        src="/images/hero.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        aria-hidden
      />

      {/* ── Gradient overlay: heavy right (text), fades left ──── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(4,30,43,0.97) 0%, rgba(4,30,43,0.88) 35%, rgba(4,30,43,0.55) 60%, rgba(4,30,43,0.15) 100%)",
        }}
        aria-hidden
      />

      {/* ── Dot grid texture ─────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden
      />

      {/* ── Gold glow top-right ───────────────────────────────── */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, rgba(236,177,46,0.14) 0%, transparent 65%)" }}
        aria-hidden
      />

      {/* ── Teal glow bottom-left ────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle at bottom left, rgba(79,204,182,0.10) 0%, transparent 65%)" }}
        aria-hidden
      />

      {/* ── Vertical accent lines ─────────────────────────────── */}
      <div
        className="absolute top-0 left-0 w-px h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(236,177,46,0.5), transparent)" }}
        aria-hidden
      />
      <div
        className="absolute top-0 left-12 w-px h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(79,204,182,0.35), transparent)" }}
        aria-hidden
      />

      {/* ── Main content ─────────────────────────────────────── */}
      <Container className="relative z-10 flex-1 flex items-center py-20 md:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center w-full">

          {/* Text column — right side in RTL (col 1) */}
          <div className="lg:col-span-3 text-right space-y-7">

            {/* Overline */}
            <div className="flex items-center justify-start gap-3">
              <div className="h-px w-10 bg-secondary/60" aria-hidden />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/40">
                أكاديمية جيل الترجيح
              </span>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm px-5 py-2.5">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
              </span>
              <span className="text-sm font-semibold text-secondary tracking-wide">منصة القادة الصاعدين</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="leading-[1.15]" style={{ fontFamily: "var(--font-cairo), Cairo, sans-serif" }}>
                <span className="block text-white/60 font-medium mb-1"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}>
                  نُعدّ الجيل الذي
                </span>
                <span className="block text-white font-black"
                  style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }}>
                  يقود المستقبل
                </span>
                <span className="block font-black"
                  style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", color: "#ECB12E" }}>
                  بالمعرفة والقيم
                </span>
              </h1>

              {/* Gold underline */}
              <div className="mt-4 flex justify-end">
                <div
                  className="h-1 rounded-full w-28"
                  style={{ background: "linear-gradient(to right, transparent, #ECB12E 60%, #b37916)" }}
                />
              </div>
            </div>

            {/* Description */}
            <p
              className="text-white/60 leading-loose max-w-lg"
              style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}
            >
              الحاضنة الأولى لتطوير الكفاءات القيادية برؤية أكاديمية حديثة تجمع بين الأصالة والتطبيق — عبر فرق متخصصة ومشاريع ذات أثر حقيقي.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-start gap-3">
              <Link
                href="/#register"
                className="group inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-bold text-base transition-all active:scale-95"
                style={{
                  background: "#ECB12E",
                  color: "#3A2800",
                  boxShadow: "0 8px 28px rgba(236,177,46,0.35)",
                }}
              >
                سجّل الآن
                <span
                  className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  arrow_back
                </span>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-bold text-base text-white transition-all active:scale-95 hover:bg-white/12"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                اكتشف برامجنا
              </Link>
            </div>

            {/* Stats */}
            <div className="flex justify-start gap-6 sm:gap-10 pt-5 border-t border-white/[0.08]">
              {STATS.map((s) => (
                <div key={s.label} className="text-right">
                  <p className="font-black text-secondary leading-none"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)" }}>
                    {s.value}
                  </p>
                  <p className="text-white/40 text-xs mt-1.5 tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          

        </div>
      </Container>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 pb-8 text-white/30">
        <span className="text-[10px] tracking-[0.25em] uppercase">اكتشف</span>
        <span
          className="material-symbols-outlined text-xl animate-bounce"
          style={{ fontVariationSettings: '"FILL" 0, "wght" 200' }}
        >
          keyboard_arrow_down
        </span>
      </div>

    </section>
  );
}
