import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "تواصل معنا | منارة",
  description: "تواصل مع فريق منارة – أكاديمية جيل الترجيح، لأي استفسار أو اقتراح أو رغبة في الشراكة والتعاون.",
};

const CHANNELS = [
  {
    icon: "mail",
    title: "البريد الإلكتروني",
    value: "contact@jiltarjih.dz",
    href: "mailto:contact@jiltarjih.dz",
  },
  {
    icon: "schedule",
    title: "زمن الرد",
    value: "خلال 48 ساعة عمل غالباً",
  },
  {
    icon: "location_on",
    title: "النطاق",
    value: "الجزائر — عن بُعد وحضورياً",
  },
];

const TOPICS = [
  "استفسار عام حول الأكاديمية أو المسارات",
  "الرغبة في الانضمام إلى فريق أو مشروع",
  "اقتراح شراكة أو تعاون مؤسساتي",
  "طلب إعلامي أو صحفي",
  "الإبلاغ عن مشكلة تقنية في المنصة",
];

export default function ContactPage() {
  return (
    <div className="bg-surface-container-low">
      <section className="relative isolate overflow-hidden py-16 md:py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-secondary/30 to-transparent" aria-hidden />
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-card md:p-8">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-secondary">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                    forum
                  </span>
                  <span className="text-sm font-bold">تواصل معنا</span>
                </div>

                <h1 className="font-h2 text-h2 text-on-surface">نسعد بالتواصل معك</h1>
                <p className="mt-4 leading-8 text-on-surface-variant">
                  لديك استفسار عن الأكاديمية، أو فكرة مشروع، أو رغبة في الشراكة؟ راسلنا عبر الاستمارة وسيتواصل معك فريق منارة في أقرب وقت.
                </p>

                <ul className="mt-7 space-y-3">
                  {CHANNELS.map((c) => (
                    <li key={c.title} className="flex items-center gap-3 rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: '"FILL" 1' }} aria-hidden>
                          {c.icon}
                        </span>
                      </span>
                      <span className="text-right">
                        <span className="block text-xs font-semibold text-on-surface-variant">{c.title}</span>
                        {c.href ? (
                          <a href={c.href} className="font-bold text-primary hover:underline">
                            {c.value}
                          </a>
                        ) : (
                          <span className="font-bold text-on-surface">{c.value}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <h2 className="mb-3 flex items-center gap-2 font-h3 text-base text-on-surface">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }} aria-hidden>
                      task_alt
                    </span>
                    يسعدنا مساعدتك في:
                  </h2>
                  <ul className="space-y-2">
                    {TOPICS.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm leading-7 text-on-surface-variant">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" aria-hidden />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-7 rounded-xl bg-primary/10 px-4 py-3 text-center font-bold text-primary">
                  صوتك يصلنا، ورأيك يصنع الفرق
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
