import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DetailsPageTemplate } from "@/components/sections/DetailsPageTemplate";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | أكاديمية جيل الترجيح`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      locale: "ar_DZ",
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const statusLabel =
    project.status === "open"
      ? "مفتوح للتسجيل"
      : project.status === "active"
        ? "قيد التنفيذ"
        : "مكتمل";

  const quickInfoRows = [
    { label: "التصنيف", value: project.category },
    { label: "حالة المشروع", value: statusLabel },
    ...(project.duration ? [{ label: "المدة", value: project.duration }] : []),
    ...(project.teamsCount ? [{ label: "عدد الفرق", value: String(project.teamsCount) }] : []),
    ...(project.participantsCount ? [{ label: "عدد المشاركين", value: String(project.participantsCount) }] : []),
  ];

  return (
    <DetailsPageTemplate
      breadcrumb={[
        { label: "الرئيسية", href: "/" },
        { label: "المشاريع", href: "/projects" },
        { label: project.title, href: `/projects/${project.slug}` },
      ]}
      category={project.category}
      statusNode={<StatusBadge status={project.status} />}
      icon={project.icon}
      title={project.title}
      description={project.description}
      joinLabel="انضم إلى المشروع"
      backLabel="العودة للمشاريع"
      backHref="/projects"
      overviewHeading="عن المشروع"
      longDescription={project.longDescription}
      vision={project.vision}
      mission={project.mission}
      objectivesHeading="أهداف المشروع"
      objectives={project.objectives}
      quickInfoRows={quickInfoRows}
      ctaTitle="هل أنت مستعد للمشاركة؟"
      ctaText={`سجّل الآن وكن جزءاً من مشروع ${project.title} ضمن بيئة أكاديمية تجمع بين الأصالة والمعاصرة.`}
      ctaBrowseLabel="تصفح المشاريع"
      ctaBrowseHref="/projects"
    />
  );
}
