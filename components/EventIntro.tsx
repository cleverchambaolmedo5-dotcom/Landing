import { eventConfig } from "@/lib/event";
import CTAButton from "./CTAButton";
import EventGallery from "./EventGallery";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";

/** Columna de texto: permanece fija mientras la galería rota. */
function EventInfo() {
  return (
    <div className="min-w-0">
      <p className="mb-5 inline-flex items-center gap-3 font-display text-xs font-bold tracking-[0.28em] text-white/70 uppercase">
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        El evento
      </p>
      <h2 className="font-display text-[1.75rem] leading-[1.15] font-extrabold tracking-tight text-balance text-white sm:text-4xl lg:text-[2rem] xl:text-[2.4rem]">
        Esto no es otra conferencia motivacional.
      </h2>
      <p className="mt-7 border-l-2 border-accent pl-5 text-base leading-relaxed text-pretty text-white/80 sm:text-lg">
        <strong className="font-semibold text-white">{eventConfig.name}</strong> es una experiencia
        presencial diseñada para ayudarte a comprender cómo funcionan las oportunidades
        inmobiliarias y qué debes analizar antes de tomar una decisión.
      </p>
      <CTAButton size="lg" className="mt-9 w-full sm:w-auto">
        Asegura tu entrada
      </CTAButton>
    </div>
  );
}

export default function EventIntro() {
  return (
    <section id="evento" className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-28">
      <div
        aria-hidden="true"
        className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_bottom_right,black_20%,transparent_70%)]"
      />

      {/* Desktop: [ foto grande | miniaturas ] [ texto ] → 50% / 16% / 34% */}
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,66fr)_minmax(0,34fr)] lg:gap-12 xl:gap-16">
        <Reveal>
          <EventGallery />
        </Reveal>

        <Reveal delay={120}>
          <EventInfo />
        </Reveal>
      </Container>
    </section>
  );
}
