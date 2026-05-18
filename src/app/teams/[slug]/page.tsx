import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { teams } from "@/data/teams";
import { DetailsPageTemplate } from "@/components/sections/DetailsPageTemplate";

export function generateStaticParams() {
  return teams.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const team = teams.find((t) => t.slug === slug);
  if (!team) return {};
  return {
    title: `${team.name} | أكاديمية جيل الترجيح`,
    description: team.description,
    openGraph: {
      title: team.name,
      description: team.description,
      type: "website",
      locale: "ar_DZ",
    },
  };
}

export default async function TeamDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = teams.find((t) => t.slug === slug);
  if (!team) notFound();

  const quickInfoRows = [
    { label: "التصنيف", value: team.category },
    { label: "حالة الانضمام", value: team.availability === "available" ? "متاح للانضمام" : "مكتمل العدد" },
    ...(team.leadName && team.leadName !== "—" ? [{ label: "قائد الفريق", value: team.leadName }] : []),
    ...(team.membersCount ? [{ label: "عدد الأعضاء", value: String(team.membersCount) }] : []),
  ];

  return (
    <DetailsPageTemplate
      breadcrumb={[
        { label: "الرئيسية", href: "/" },
        { label: "الفرق", href: "/teams" },
        { label: team.name, href: `/teams/${team.slug}` },
      ]}
      category={team.category}
      icon={team.icon}
      title={team.name}
      description={team.description}
      joinLabel="انضم إلى الفريق"
      backLabel="العودة للفرق"
      backHref="/teams"
      overviewHeading="عن الفريق"
      longDescription={team.longDescription}
      vision={team.vision}
      mission={team.mission}
      objectivesHeading="مهام الفريق وأهدافه"
      objectives={team.objectives}
      quickInfoRows={quickInfoRows}
      ctaTitle="هل أنت مستعد للانضمام؟"
      ctaText="سجّل الآن وسنساعدك على الالتحاق بالفريق الأنسب ضمن بيئة أكاديمية تجمع بين الأصالة والمعاصرة."
      ctaBrowseLabel="تصفح الفرق"
      ctaBrowseHref="/teams"
    />
  );
}
