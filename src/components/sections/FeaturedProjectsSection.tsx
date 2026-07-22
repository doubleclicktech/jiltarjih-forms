import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Button } from "@/components/ui/Button";

export function FeaturedProjectsSection() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-24 bg-surface-container-low">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-secondary/30 to-transparent" aria-hidden />

      <Container className="relative">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span className="font-label-sm text-label-sm text-secondary">مشاريع ريادية</span>
            </div>
            <h2 className="font-h2 text-h2 text-on-surface mb-3">من المشروع إلى المؤسسة</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              تنطلق من احتياجاتٍ حقيقية، وتقودها فرق عملٍ فاعلة، وترافقها منارة لتتطوّر في أدائها، وتنضج في بنائها، وتتّسع في أثرها.
            </p>
          </div>
          <div className="hidden md:block flex-shrink-0">
            <Button as="link" href="/projects" variant="secondary" className="px-6 py-3 rounded-lg whitespace-nowrap">
              استكشف الجميع
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button as="link" href="/projects" variant="secondary" className="w-full rounded-xl px-6 py-3">
            استكشف الجميع
          </Button>
        </div>
      </Container>
    </section>
  );
}
