import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";
import { ProjectsExplorer } from "@/app/projects/ProjectsExplorer";

export default function ProjectsPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          title="من المشروع إلى المؤسسة"
          description="تنطلق من احتياجاتٍ حقيقية، وتقودها فرق عملٍ فاعلة، وترافقها منارة لتتطوّر في أدائها، وتنضج في بنائها، وتتّسع في أثرها."
        />
        <ProjectsExplorer items={projects} />
      </Container>
    </section>
  );
}
