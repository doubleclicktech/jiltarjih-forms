import Link from "next/link";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { label: "الرئيسية", href: "/" },
  { label: "المشاريع", href: "/projects" },
  { label: "فرق العمل", href: "/teams" },
  { label: "انضم الآن", href: "/#register" },
];

const RESOURCE_LINKS = [
  { label: "عن منارة", href: "#" },
  { label: "منهجية المرافقة", href: "#" },
  { label: "عن أكاديمية جيل الترجيح", href: "#" },
  { label: "سياسة الخصوصية", href: "#" },
  { label: "تواصل معنا", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface w-full mt-auto" dir="rtl">
      <Container className="pt-14 pb-10 px-margin">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5 flex flex-col gap-5 text-right">
            <div>
              <h3 className="font-h3 text-lg text-inverse-primary mb-2">منارة</h3>
              <p className="font-label-sm text-label-sm text-inverse-on-surface/60 leading-relaxed">
                نبني المؤسسات، نصنع الأثر
              </p>
            </div>
            <p className="font-body-md text-body-md text-inverse-on-surface/70 leading-relaxed max-w-sm">
              منصة أكاديمية جيل الترجيح، تُعنى بمرافقة المشاريع وفرق العمل وتنشئة المؤسسات، من النواة الأولى إلى النضج والأثر.
            </p>
          </div>

          <div className="md:col-span-3 text-right">
            <h4 className="font-label-sm text-label-sm text-inverse-on-surface/50 uppercase tracking-widest mb-5">
              الروابط السريعة
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body-md text-body-md text-inverse-on-surface/75 hover:text-inverse-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 text-right">
            <h4 className="font-label-sm text-label-sm text-inverse-on-surface/50 uppercase tracking-widest mb-5">
              معلومات
            </h4>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="font-body-md text-body-md text-inverse-on-surface/75 hover:text-inverse-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-right">
              <p className="font-label-sm text-label-sm text-inverse-on-surface/60 mb-2">البريد الإلكتروني</p>
              <a href="mailto:contact@jiltarjih.dz" className="font-body-md text-body-md text-inverse-primary hover:underline transition-colors">
                contact@jiltarjih.dz
              </a>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5 px-margin flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
          <p className="font-label-sm text-label-sm text-inverse-on-surface/45">
            © 2026 منارة – أكاديمية جيل الترجيح. جميع الحقوق محفوظة.
          </p>
          <p className="font-label-sm text-label-sm text-inverse-on-surface/30">نبني المؤسسات نصنع الأثر</p>
        </Container>
      </div>
    </footer>
  );
}
