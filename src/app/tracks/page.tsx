import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { tracks } from "@/data/tracks";
import { TrackCard } from "@/components/cards/TrackCard";

export default function TracksPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          title="مسارات أكاديمية جيل الترجيح"
          description="عشرة مسارات تجمع الفرق والمشاريع المتعلقة باهتمام واحد، لتساعدك على اكتشاف المساحة الأنسب لقدراتك وشغفك داخل الأكاديمية."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((t) => (
            <TrackCard key={t.id} track={t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
