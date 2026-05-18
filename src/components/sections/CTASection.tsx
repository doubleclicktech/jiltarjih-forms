import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection({
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  text: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="py-20">
      <Container>
        <div className="bg-primary text-white rounded-xl p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="font-h2 text-h2 mb-6">{title}</h2>
            <p className="font-body-lg text-body-lg mb-8 max-w-2xl mx-auto opacity-90">
              {text}
            </p>
            <div className="flex justify-center gap-4 flex-col sm:flex-row">
              <Button as="link" href={primaryHref} variant="white" className="px-10 py-4 rounded-lg">
                {primaryLabel}
              </Button>
              {secondaryLabel && secondaryHref ? (
                <Button
                  as="link"
                  href={secondaryHref}
                  variant="secondary"
                  className="bg-transparent border border-white/40 text-white hover:bg-white/10 px-10 py-4 rounded-lg"
                >
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
          </div>
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"
            aria-hidden
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2"
            aria-hidden
          />
        </div>
      </Container>
    </section>
  );
}

