import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function WhyChooseUsSection() {
  const items = [
    {
      icon: "school",
      title: "تأطير أكاديمي",
      text: "مسار معرفي منظم يوازن بين التأصيل والتطبيق ويعزز التفكير القيادي.",
    },
    {
      icon: "account_tree",
      title: "بيئة تطبيقية",
      text: "مشاريع واقعية وفرق عمل تتيح تحويل الأفكار إلى مخرجات قابلة للتنفيذ.",
    },
    {
      icon: "groups",
      title: "شبكة قيادية",
      text: "مجتمع من القادة الصاعدين والمرشدين لبناء علاقات وتبادل خبرات مستمر.",
    },
    {
      icon: "emoji_objects",
      title: "منصة للابتكار",
      text: "أدوات ومنهجيات حديثة تدعم الابتكار المؤسسي والمجتمعي بروح أكاديمية.",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden py-20 md:py-24">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/20 to-transparent"
        aria-hidden
      />
      <div
        className="absolute -right-32 top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto mb-12 max-w-3xl flex flex-col  items-center text-center">
          <SectionHeader title="لماذا تختار أكاديميتنا؟" />
          <p className=" text-body-lg text-on-surface-variant">
            نرتكز على تجربة تأهيلية متوازنة تجمع بين المعرفة، التطبيق، والبيئة
            القيادية الداعمة.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, index) => (
            <div
              key={it.title}
              className="group relative overflow-hidden rounded-2xl border border-outline-variant bg-white p-6 text-right shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card"
            >
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-primary via-[#116E88] to-[#062A3C] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />

              <div
                className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-primary/5 transition duration-300 group-hover:bg-primary/10"
                aria-hidden
              />

              <div className="relative mb-6 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container text-primary ring-1 ring-primary/20 transition duration-300 group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-md">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    {it.icon}
                  </span>
                </div>

                <span className="text-4xl font-bold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-h3 text-lg mb-3 text-primary">
                {it.title}
              </h3>

              <p className="font-body-md text-body-md leading-7 text-on-surface-variant">
                {it.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}