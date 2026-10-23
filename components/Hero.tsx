import { eventConfig } from "@/lib/event";
import CTAButton from "./CTAButton";
import HeroVideoBackground from "./HeroVideoBackground";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";

/**
 * Hero a pantalla completa: video de fondo (capa 1), overlay azul marino (capa 2)
 * y todo el contenido centrado encima (capa 3).
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-navy text-white lg:min-h-[max(92svh,680px)]"
    >
      <HeroVideoBackground />

      <Container className="relative pt-28 pb-20 text-center sm:pt-32 sm:pb-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy/40 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-sm sm:text-[11px] sm:tracking-[0.22em]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Evento presencial · Quito, Ecuador
            </p>
          </Reveal>

          <Reveal delay={60}>
            <p className="mt-6 font-display text-sm font-extrabold tracking-[0.18em] text-white uppercase sm:text-base sm:tracking-[0.24em]">
              <span className="text-accent">Wake Up:</span> Riqueza Inmobiliaria
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mx-auto mt-5 max-w-[17ch] font-display text-[2rem] leading-[1.06] font-extrabold tracking-tight text-balance uppercase drop-shadow-[0_2px_18px_rgb(0_0_0/0.35)] sm:text-5xl md:text-6xl xl:text-[4.25rem]">
              ¿Trabajas cada vez más, pero <span className="text-accent">tu dinero no crece</span> como
              esperabas?
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-white/85 sm:text-lg">
              Aprende a identificar oportunidades inmobiliarias, conocer diferentes modelos de inversión y
              evaluar nuevas posibilidades para construir patrimonio, incluso si todavía no sabes por dónde
              empezar.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-9 flex w-full flex-col items-center">
            <CTAButton size="lg" className="w-full max-w-sm sm:w-auto sm:min-w-[18rem]">
              Quiero mi entrada
            </CTAButton>

            <p className="mt-5 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
              <span className="font-display text-2xl font-extrabold text-white sm:text-[1.7rem]">
                ${eventConfig.price} {eventConfig.currency}
              </span>
              <span className="text-sm font-medium text-white/75">· Entrada presencial</span>
            </p>
          </Reveal>

          <Reveal delay={300} className="mt-8 w-full">
            <ul className="mx-auto max-w-2xl space-y-2.5 border-t border-white/15 pt-6 text-[11.5px] leading-relaxed font-semibold tracking-[0.12em] text-balance text-white/90 uppercase sm:text-[13px] sm:tracking-[0.18em]">
              <li>
                <Icon name="calendar" strokeWidth={1.8} className="mr-2 -mt-0.5 inline-block h-4 w-4 text-accent" />
                5 de diciembre de 2026 · 09:00 a 18:00
              </li>
              <li>
                <Icon name="pin" strokeWidth={1.8} className="mr-2 -mt-0.5 inline-block h-4 w-4 text-accent" />
                Hotel Wyndham Garden · Quito, Ecuador
              </li>
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
