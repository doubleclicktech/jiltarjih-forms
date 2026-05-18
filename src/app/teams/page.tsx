import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { teams } from "@/data/teams";
import { TeamsExplorer } from "@/app/teams/TeamsExplorer";

export default function TeamsPage() {
  const categoryOptions = [
    ...new Map(teams.map(t => [t.category, { id: t.category, label: t.category }])).values(),
  ];

  return (
    <>
      <section className="py-16">
        <Container>
          <SectionHeader
            title="فرق أكاديمية جيل الترجيح"
            description="استكشف الفرق التخصصية لأكاديمية جيل الترجيح للتأهيل القيادي. ابحث عن الفريق الأنسب لاهتماماتك ومهاراتك وانضم لمسيرة التميز والقيادة."
          />
          <TeamsExplorer items={teams} categoryOptions={categoryOptions} />
        </Container>
      </section>

     
    </>
  );
}
