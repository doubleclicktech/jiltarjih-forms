import { tracks } from "@/data/tracks";
import { Container } from "@/components/ui/Container";
import { TrackCard } from "@/components/cards/TrackCard";
import { Button } from "@/components/ui/Button";

export function TracksSection() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-24 bg-surface-container/40">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/20 to-transparent"
        aria-hidden
      />

      <Container className="relative">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="font-label-sm text-label-sm text-primary">مسارات الأكاديمية</span>
            </div>
            <h2 className="font-h2 text-h2 text-on-surface mb-3">اكتشف مسارك</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              محطات تجمع الفرق والمشاريع المتعلقة باهتمام واحد، لتساعدك على اختيار المساحة الأنسب لقدراتك وشغفك.
            </p>
          </div>
          <div className="hidden md:block flex-shrink-0">
            <Button as="link" href="/tracks" variant="secondary" className="rounded-xl px-6 py-3 whitespace-nowrap">
              استكشف جميع المسارات
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tracks.slice(0, 3).map((t) => (
            <TrackCard key={t.id} track={t} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button as="link" href="/tracks" variant="secondary" className="w-full rounded-xl px-6 py-3">
            استكشف جميع المسارات
          </Button>
        </div>
      </Container>
    </section>
  );
}
