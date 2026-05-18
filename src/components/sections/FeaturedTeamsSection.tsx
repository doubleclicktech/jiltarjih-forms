import { teams } from "@/data/teams";
import { Container } from "@/components/ui/Container";
import { TeamCard } from "@/components/cards/TeamCard";
import { Button } from "@/components/ui/Button";

export function FeaturedTeamsSection() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-24">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/20 to-transparent"
        aria-hidden
      />
      <div
        className="absolute -right-28 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -left-32 bottom-8 h-72 w-72 rounded-full bg-secondary/5 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="font-label-sm text-label-sm text-primary">فرق الأكاديمية</span>
            </div>
            <h2 className="font-h2 text-h2 text-on-surface mb-3">أبرز الفرق</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              فرق أكاديمية وميدانية تعمل ضمن مشاريع الأكاديمية لتحويل المعرفة إلى أثر عملي.
            </p>
          </div>
          <div className="hidden md:block flex-shrink-0">
            <Button as="link" href="/teams" variant="secondary" className="rounded-xl px-6 py-3 whitespace-nowrap">
              استكشف الجميع
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.slice(0, 3).map((t) => (
            <TeamCard key={t.id} team={t} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button as="link" href="/teams" variant="secondary" className="w-full rounded-xl px-6 py-3">
            استكشف الجميع
          </Button>
        </div>
      </Container>
    </section>
  );
}
