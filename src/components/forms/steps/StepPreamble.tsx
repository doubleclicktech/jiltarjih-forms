import { STEPS } from "../form-types";

export function StepPreamble({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-right space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>edit_document</span>
        </div>
        <div>
          <h2 className="font-h2 text-h2 text-on-surface">استمارة الانضمام للفرق</h2>
          <p className="text-sm text-on-surface-variant mt-1">أكاديمية جيل الترجيح</p>
        </div>
      </div>

      <div className="bg-surface-container border border-primary/20 rounded-2xl p-6 space-y-3 text-on-surface leading-relaxed">
        <p className="font-semibold text-primary text-base">توطئة</p>
        <p>
          انطلاقاً من رؤية أكاديمية جيل الترجيح في إعداد قيادات فاعلة، وقادرة على صناعة الأثر في المجتمع؛
          نفتح باب الانخراط في الفرق التخصصية ضمن فضاءات الفاعلية في الأكاديمية، بهدف تمكين الأفراد من
          تطوير مهاراتهم، توسيع خبراتهم، والمساهمة في مشاريع ومبادرات تخدم الرؤية والرسالة.
        </p>
        <ul className="space-y-2 mt-4">
          {[
            "يمكن لكل مترشح اختيار فريق واحد أو أكثر حسب اهتماماته ومهاراته.",
            "يرجى تعبئة الاستمارة بجدية ووضوح.",
            "بعض الأسئلة تهدف لفهم طريقة التفكير والقدرة على العمل الجماعي وتحمل المسؤولية.",
            "سيتم دراسة الاستمارات واختيار الأفراد وفق مدى التوافق مع طبيعة الفرق واحتياجاتها.",
            "تعبئة الاستمارة لا تعني القبول النهائي، وإنما تمثل مرحلة أولية ضمن مسار الانتقاء والتوجيه.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0" style={{ fontVariationSettings: '"FILL" 1' }}>
                arrow_circle_left
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-primary font-semibold text-center mt-4">معاً نحو صناعة جيل قيادي أكثر وعياً وتأثيراً ✨</p>
      </div>

      <div className="bg-surface-container rounded-xl p-4 text-sm text-on-surface-variant">
        <p className="font-medium text-on-surface mb-2">تتضمن الاستمارة ٧ مراحل:</p>
        <div className="grid grid-cols-2 gap-1.5">
          {STEPS.map(s => (
            <div key={s.id} className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                {s.id}
              </span>
              <span className="text-xs">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full bg-secondary text-on-secondary font-semibold text-lg py-4 rounded-2xl hover:bg-secondary-container active:scale-[0.98] transition-all shadow-card"
      >
        ابدأ الآن
      </button>
    </div>
  );
}
