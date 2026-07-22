import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tracks } from "@/data/tracks";
import { teams } from "@/data/teams";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { TeamCard } from "@/components/cards/TeamCard";
import { ProjectCard } from "@/components/cards/ProjectCard";

export function generateStaticParams() {
  return tracks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const track = tracks.find((t) => t.slug === slug);
  if (!track) return {};
  return {
    title: `${track.name} | أكاديمية جيل الترجيح`,
    description: track.description,
    openGraph: {
      title: track.name,
      description: track.description,
      type: "website",
      locale: "ar_DZ",
    },
  };
}

export default async function TrackDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const track = tracks.find((t) => t.slug === slug);
  if (!track) notFound();

  const trackTeams = teams.filter((t) => track.teamSlugs.includes(t.slug));
  const trackProjects = projects.filter((p) => track.projectSlugs.includes(p.slug));

  return (
    <div className="py-12" dir="rtl">
      <Container>
        {/* Breadcrumb */}
        <nav className="text-right mb-8">
          <ol className="flex flex-wrap gap-2 text-on-surface-variant font-body-md text-body-md">
            <li className="flex items-center gap-2">
              <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              <span>/</span>
            </li>
            <li className="flex items-center gap-2">
              <Link href="/tracks" className="hover:text-primary transition-colors">المسارات</Link>
              <span>/</span>
            </li>
            <li className="flex items-center gap-2">
              <Link href={`/tracks/${track.slug}`} className="hover:text-primary transition-colors">{track.name}</Link>
            </li>
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
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                  {track.icon}
                </span>
              </div>
              <h1 className="font-h1 text-h1 text-white">{track.name}</h1>
            </div>
            <p className="font-body-lg text-body-lg text-white/75 max-w-2xl leading-relaxed">{track.description}</p>
          </div>
        </section>

        {/* Teams */}
        <section className="mb-12">
          <h2 className="font-h2 text-h2 text-on-surface mb-6 text-right">الفرق ضمن هذا المسار</h2>
          {trackTeams.length === 0 ? (
            <EmptyState message="لا توجد فرق ضمن هذا المسار حالياً." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trackTeams.map((t) => (
                <TeamCard key={t.id} team={t} />
              ))}
            </div>
          )}
        </section>

        {/* Projects */}
        <section>
          <h2 className="font-h2 text-h2 text-on-surface mb-6 text-right">المشاريع ضمن هذا المسار</h2>
          {trackProjects.length === 0 ? (
            <EmptyState message="لا توجد مشاريع ضمن هذا المسار حالياً." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trackProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
