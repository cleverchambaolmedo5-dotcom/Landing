import { eventConfig } from "@/lib/event";
import CTAButton from "./CTAButton";
import HeroVideoBackground from "./HeroVideoBackground";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Logo from "./ui/Logo";
import Reveal from "./ui/Reveal";

/**
 * Hero a pantalla completa: video de fondo (capa 1), overlay azul marino (capa 2)
 * y el contenido centrado encima (capa 3): etiqueta → logo → titular → descripción → CTA → precio y datos.
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-navy text-white lg:min-h-[max(90svh,640px)]"
    >
      <HeroVideoBackground />

      <Container className="relative pt-24 pb-16 text-center sm:pt-28 sm:pb-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <Reveal>
            {/* En móvil se parte en dos líneas por el separador; desde sm, una sola línea */}
            <p className="inline-flex flex-col items-center justify-center gap-x-2 gap-y-0.5 rounded-2xl sm:flex-row border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md sm:rounded-full sm:text-xs sm:tracking-[0.2em]">
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <Icon name="calendar" strokeWidth={1.8} className="h-3.5 w-3.5 shrink-0 text-accent" />
                5 de diciembre de 2026
                <span className="max-sm:hidden" aria-hidden="true">·</span>
              </span>
              <span className="whitespace-nowrap">Evento presencial en Quito</span>
            </p>
          </Reveal>

          <Reveal delay={60}>
            <Logo preload className="mx-auto mt-6 h-auto w-[min(72vw,16rem)] sm:mt-7 sm:w-[19rem] lg:w-[21rem]" />
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mx-auto mt-6 max-w-[24ch] font-display text-[1.95rem] leading-[1.05] font-extrabold tracking-tight text-balance text-white uppercase drop-shadow-[0_2px_18px_rgb(0_0_0/0.35)] sm:mt-7 sm:text-5xl md:text-6xl xl:text-[4.25rem]">
              ¿Trabajas cada vez más, pero tu dinero no crece como esperabas?
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pretty text-white/85 sm:mt-6 sm:text-lg">
              Aprende a identificar oportunidades inmobiliarias, conocer diferentes modelos de inversión y
              evaluar nuevas posibilidades para construir patrimonio, incluso si todavía no sabes por dónde
              empezar.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-8 flex w-full flex-col items-center sm:mt-9">
            <CTAButton size="lg" className="w-full max-w-sm sm:w-auto sm:min-w-[20rem] sm:px-12">
              Quiero mi entrada
            </CTAButton>

            <p className="mt-5 font-display text-lg font-bold text-white sm:text-xl">
              <span className="text-accent">
                ${eventConfig.price} {eventConfig.currency}
              </span>{" "}
              · Entrada presencial
            </p>
            {/* En móvil la ciudad pasa a su propia línea (sin separador inicial); desde sm, una sola línea */}
            <p className="mt-2 text-sm text-white/70 sm:text-[15px]">
              <span className="font-semibold whitespace-nowrap text-white">09:00 a 18:00</span>
              <span className="text-accent"> · </span>
              <span className="whitespace-nowrap">Hotel Wyndham Garden</span>
              <span className="text-accent max-sm:hidden"> · </span>
              <span className="whitespace-nowrap max-sm:block">Quito, Ecuador</span>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
