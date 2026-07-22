import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { teams } from "@/data/teams";
import { TeamsExplorer } from "@/app/teams/TeamsExplorer";

export default function TeamsPage() {
  const categoryOptions = [
    ...new Map(teams.map(t => [t.category, { id: t.category, label: t.category }])).values(),
  ];

  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          title="من المواهب إلى الفاعلية"
          description="تعرّف إلى فرق العمل التخصصية والميدانية في أكاديمية جيل الترجيح، واختر المساحة التي توظّف فيها معرفتك أو مهارتك أو موهبتك ضمن عملٍ منظّم وإنجازٍ نافع."
        />
        <TeamsExplorer items={teams} categoryOptions={categoryOptions} />
      </Container>
    </section>
  );
}
