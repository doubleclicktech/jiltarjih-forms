import Link from "next/link";
import { Container } from "@/components/ui/Container";

type QuickInfoRow = { label: string; value: string };

type Props = {
  breadcrumb: Array<{ label: string; href: string }>;
  // Hero
  category: string;
  statusNode?: React.ReactNode;
  icon: string;
  title: string;
  description: string;
  joinLabel: string;
  backLabel: string;
  backHref: string;
  // Content
  overviewHeading: string;
  longDescription: string;
  vision: string;
  mission: string;
  objectivesHeading: string;
  objectives: string[];
  // Sidebar
  quickInfoRows: QuickInfoRow[];
  // CTA
  ctaTitle: string;
  ctaText: string;
  ctaBrowseLabel: string;
  ctaBrowseHref: string;
};

export function DetailsPageTemplate({
  breadcrumb,
  category,
  statusNode,
  icon,
  title,
  description,
  joinLabel,
  backLabel,
  backHref,
  overviewHeading,
  longDescription,
  vision,
  mission,
  objectivesHeading,
  objectives,
  quickInfoRows,
  ctaTitle,
  ctaText,
  ctaBrowseLabel,
  ctaBrowseHref,
}: Props) {
  return (
    <div className="py-12" dir="rtl">
      <Container>
        {/* Breadcrumb */}
        <nav className="text-right mb-8">
          <ol className="flex flex-wrap gap-2 text-on-surface-variant font-body-md text-body-md">
            {breadcrumb.map((b, idx, arr) => (
              <li key={b.href} className="flex items-center gap-2">
                <Link href={b.href} className="hover:text-primary transition-colors">{b.label}</Link>
                {idx < arr.length - 1 && <span>/</span>}
              </li>
            ))}
          </ol>
        </nav>

        {/* Hero card */}
        <section
          className="relative rounded-2xl overflow-hidden mb-10 shadow-2xl"
          style={{ background: "linear-gradient(135deg, #ECB12E 0%, #b37916 50%, #CC9029 100%)" }}
        >
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" aria-hidden />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-primary-container/20 translate-x-1/3 translate-y-1/3 blur-2xl pointer-events-none" aria-hidden />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} aria-hidden />

          <div className="relative p-10 text-right">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block bg-white/15 text-white/90 text-label-sm font-label-sm px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                {category}
              </span>
              {statusNode}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                  {icon}
                </span>
              </div>
              <h1 className="font-h1 text-h1 text-white">{title}</h1>
            </div>
            <p className="font-body-lg text-body-lg text-white/75 mb-8 max-w-2xl leading-relaxed">{description}</p>
            <div className="flex flex-wrap gap-3 justify-end">
              <Link
                href="/#register"
                className="bg-white text-primary px-8 py-3.5 rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 text-center"
              >
                {joinLabel}
              </Link>
              <Link
                href={backHref}
                className="bg-white/10 backdrop-blur-sm border border-white/25 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-white/20 transition-all active:scale-95 text-center"
              >
                {backLabel}
              </Link>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-8 text-right">
              <h2 className="font-h2 text-h2 mb-4">{overviewHeading}</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">{longDescription}</p>
            </section>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <section className="bg-pale-orange border border-primary/20 rounded-xl p-6 text-right">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>visibility</span>
                  </div>
                  <h3 className="font-h3 text-lg text-primary">الرؤية</h3>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-base">{vision}</p>
              </section>
              <section className="bg-surface-container rounded-xl border border-outline-variant p-6 text-right">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>flag</span>
                  </div>
                  <h3 className="font-h3 text-lg text-on-surface">الرسالة</h3>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-base">{mission}</p>
              </section>
            </div>

            {/* Objectives */}
            <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-8 text-right">
              <h2 className="font-h2 text-h2 mb-4">{objectivesHeading}</h2>
              <ul className="space-y-3">
                {objectives.map((o) => (
                  <li key={o} className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-primary mt-0.5 flex-shrink-0" style={{ fontVariationSettings: '"FILL" 1' }}>
                      check_circle
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant">{o}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 text-right">
              <h2 className="font-h2 text-h2 mb-4">معلومات سريعة</h2>
              <div className="space-y-4">
                {quickInfoRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 pb-3 border-b border-outline-variant last:border-0 last:pb-0">
                    <span className="text-label-sm text-on-surface-variant">{row.label}</span>
                    <span className="font-body-md text-body-md text-on-surface">{row.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-surface-container-low rounded-xl border border-outline-variant p-6 text-right relative overflow-hidden">
              <div className="absolute inset-0 academy-pattern opacity-10" aria-hidden />
              <div className="relative">
                <span className="material-symbols-outlined text-primary text-3xl mb-3 block" style={{ fontVariationSettings: '"FILL" 1' }}>
                  {icon}
                </span>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  المساهمة في إعداد جيل قيادي ذي كفاءة واقتدار يقود المجتمع الجزائري للنهضة الحضارية الشاملة ويساهم في نهضة الأمة.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Final CTA */}
        <section className="bg-primary text-white rounded-xl p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="font-h2 text-h2 mb-6">{ctaTitle}</h2>
            <p className="font-body-lg text-body-lg mb-8 max-w-2xl mx-auto opacity-90">{ctaText}</p>
            <div className="flex justify-center gap-4 flex-col sm:flex-row">
              <Link
                href="/#register"
                className="bg-white text-primary px-10 py-4 rounded-lg font-h3 text-base shadow-lg hover:scale-105 transition-transform text-center"
              >
                سجل الآن
              </Link>
              <Link
                href={ctaBrowseHref}
                className="bg-transparent border border-white/40 text-white px-10 py-4 rounded-lg font-h3 text-lg hover:bg-white/10 transition-all text-center"
              >
                {ctaBrowseLabel}
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden />
        </section>
      </Container>
    </div>
  );
}
