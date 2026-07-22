import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CompanionsForm } from "./CompanionsForm";

export const metadata: Metadata = {
  title: "استمارة المرافقين | منارة",
  description: "استمارة الانخراط ضمن فريق المرافقين للفرق التخصصية في أكاديمية جيل الترجيح.",
};

const CONTRIBUTIONS = [
  "احتضان الأفراد الجدد وتوجيههم",
  "دعم المنسقين والفرق في التسيير والمتابعة",
  "نقل الخبرات والتجارب السابقة",
  "تعزيز روح الانضباط والفاعلية داخل الفرق",
  "المساهمة في بناء بيئة تربوية وقيادية صحية",
];

const NOTES = [
  "هذه الاستمارة مخصصة لأفراد الدفعات السابقة",
  "دور المرافق توجيهي وتربوي وتنظيمي وليس إدارياً فقط",
  "تعبئة الاستمارة لا تعني القبول النهائي",
  "سيتم اختيار المرافقين وفق الخبرة، الجاهزية، والقدرة على المتابعة والتوجيه",
];

export default function CompanionsPage() {
  return (
    <div className="bg-surface-container-low">
      <section className="relative isolate overflow-hidden py-16 md:py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-secondary/30 to-transparent" aria-hidden />
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 md:p-8 shadow-card">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-secondary">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                    diversity_3
                  </span>
                  <span className="text-sm font-bold">فريق المرافقين</span>
                </div>

                <h1 className="font-h2 text-h2 text-on-surface">استمارة المرافقين</h1>
                <p className="mt-4 leading-8 text-on-surface-variant">
                  إيماناً من أكاديمية جيل الترجيح بأهمية التراكم القيادي ونقل الخبرات بين الدفعات، نفتح باب الانخراط ضمن فريق المرافقين للفرق التخصصية، بهدف دعم الفرق، توجيه الأفراد، ومرافقة المسارات العملية والتكوينية داخل فضاءات الفاعلية بالأكاديمية.
                </p>

                <div className="mt-7 space-y-5">
                  <InfoList title="يمثل المرافق حلقة وصل بين الرؤية والتنفيذ، حيث يساهم في:" items={CONTRIBUTIONS} icon="task_alt" />
                  <InfoList title="ملاحظات مهمة:" items={NOTES} icon="info" />
                </div>

                <p className="mt-7 rounded-xl bg-primary/10 px-4 py-3 text-center font-bold text-primary">
                  معاً نحو صناعة بيئة قيادية أكثر نضجاً وتأثيراً
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <CompanionsForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function InfoList({ title, items, icon }: { title: string; items: string[]; icon: string }) {
  return (
    <div>
      <h2 className="mb-3 flex items-center gap-2 font-h3 text-base text-on-surface">
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>
          {icon}
        </span>
        {title}
      </h2>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2 text-sm leading-7 text-on-surface-variant">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
