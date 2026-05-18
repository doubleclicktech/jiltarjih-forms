import { Container } from "@/components/ui/Container";
import { RegistrationForm } from "@/components/forms/RegistrationForm";

export function RegistrationSection() {
  return (
    <section id="register" className="py-20 bg-surface-container-low">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-card p-8 md:p-10">
            <RegistrationForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
