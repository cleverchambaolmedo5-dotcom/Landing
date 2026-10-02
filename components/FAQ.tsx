import { faq } from "@/lib/faq";
import CTAButton from "./CTAButton";
import SectionTitle from "./SectionTitle";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";

/**
 * Preguntas frecuentes / objeciones.
 * Acordeón nativo (<details name="faq">): accesible, sin JavaScript y con una sola respuesta abierta a la vez.
 */
export default function FAQ() {
  return (
    <section id="preguntas" className="bg-white py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Columna fija con el mensaje y el CTA */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionTitle
              eyebrow="Preguntas frecuentes"
              title="¿Todavía tienes dudas? Resolvámoslas."
              description="Estas son las preguntas que más nos hacen antes de asegurar una entrada."
            />
            <div className="mt-8 hidden lg:block">
              <CTAButton size="lg">Quiero mi entrada</CTAButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {faq.map((item, index) => (
              <details key={item.question} name="faq" open={index === 0} className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-base leading-snug font-bold text-navy sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition-all duration-300 group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-white"
                  >
                    <Icon name="plus" strokeWidth={2} className="h-4 w-4" />
                  </span>
                </summary>
                <p className="-mt-1 max-w-2xl pr-14 pb-6 text-[15px] leading-relaxed text-ink/70 sm:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal className="text-center lg:hidden">
          <CTAButton size="lg" className="w-full sm:w-auto">
            Quiero mi entrada
          </CTAButton>
        </Reveal>
      </Container>
    </section>
  );
}
