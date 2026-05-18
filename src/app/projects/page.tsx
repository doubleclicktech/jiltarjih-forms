import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { projects } from "@/data/projects";
import { ProjectsExplorer } from "@/app/projects/ProjectsExplorer";

export default function ProjectsPage() {
  return (
    <>
      <section className="py-16">
        <Container>
          <SectionHeader
            title="استكشف مشاريعنا الريادية"
            description="بوابة لمبادرات أكاديمية جيل ترجيح التي تهدف لصناعة قادة المستقبل وتطوير الفكر الأكاديمي والمهني عبر تجارب تطبيقية واقعية."
          />
          <ProjectsExplorer items={projects} />
        </Container>
      </section>

      
    </>
  );
}

