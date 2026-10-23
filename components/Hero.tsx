import Image from "next/image";
import { eventConfig } from "@/lib/event";
import { heroBackground } from "@/lib/media";
import CTAButton from "./CTAButton";
import HeroVsl from "./HeroVsl";
import Container from "./ui/Container";
import Icon, { type IconName } from "./ui/Icon";
import Logo from "./ui/Logo";
import Reveal from "./ui/Reveal";

const details: { label: string; value: string; icon: IconName }[] = [
  { label: "Fecha", value: "5 de diciembre de 2026", icon: "calendar" },
  { label: "Horario", value: "09:00 a 18:00", icon: "clock" },
  { label: "Ciudad", value: "Quito, Ecuador", icon: "pin" },
  { label: "Lugar", value: "Hotel Wyndham Garden", icon: "building" },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-navy text-white">
      {/* Fondo: fotografía de contexto muy tenue + halo naranja discreto detrás del video */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={heroBackground.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.08] blur-[2px] grayscale"
        />
        <div className="absolute inset-0 bg-navy/70 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy lg:via-navy/90 lg:to-navy/70" />
        <div className="absolute top-1/3 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px] max-lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
      </div>

      {/*
        Móvil: identidad → titular → descripción → CTA y precio → video → datos (el CTA queda en la primera pantalla).
        Escritorio: texto, CTA y datos a la izquierda; video a la derecha.
      */}
      <Container className="grid gap-x-12 gap-y-8 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:items-center lg:gap-y-0 lg:pt-28 lg:pb-20 xl:gap-x-16">
        {/* Identidad, titular y descripción */}
        <div className="min-w-0 lg:col-start-1 lg:row-start-1 lg:self-end">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-white uppercase sm:text-[11px] sm:tracking-[0.22em]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Evento presencial · Quito, Ecuador
            </p>
          </Reveal>

          <Reveal delay={60}>
            <Logo preload className="mt-6 h-auto w-full max-w-[14rem] sm:max-w-[18rem] xl:max-w-[20rem]" />
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-7 font-display text-[1.85rem] leading-[1.08] font-extrabold tracking-tight text-balance uppercase sm:text-5xl lg:text-[2.6rem] xl:text-[3rem]">
              ¿Trabajas cada vez más, pero <span className="text-accent">tu dinero no crece</span> como
              esperabas?
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-white/70 sm:mt-6 sm:text-lg">
              Aprende a identificar oportunidades inmobiliarias, conocer diferentes modelos de inversión y
              evaluar nuevas posibilidades para construir patrimonio, incluso si todavía no sabes por dónde
              empezar.
            </p>
          </Reveal>
        </div>

        {/* CTA y precio */}
        <Reveal delay={220} className="min-w-0 lg:col-start-1 lg:row-start-2 lg:mt-9">
          <CTAButton size="lg" className="w-full sm:w-auto sm:min-w-[17rem]">
            Quiero mi entrada
          </CTAButton>

          <p className="mt-5 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 sm:justify-start">
            <span className="font-display text-2xl font-extrabold text-white sm:text-[1.7rem]">
              ${eventConfig.price} {eventConfig.currency}
            </span>
            <span className="text-sm font-medium text-white/60">· Entrada presencial</span>
          </p>
        </Reveal>

        {/* Video */}
        <Reveal
          delay={200}
          className="mx-auto w-full max-w-2xl min-w-0 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:max-w-none"
        >
          <HeroVsl />
        </Reveal>

        {/* Datos del evento */}
        <Reveal delay={260} className="min-w-0 lg:col-start-1 lg:row-start-3 lg:self-start">
          <dl className="grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6 sm:gap-x-10 lg:mt-6">
            {details.map(({ label, value, icon }) => (
              <div key={label} className="min-w-0">
                <dt className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.2em] text-white/50 uppercase">
                  <Icon name={icon} strokeWidth={1.8} className="h-3.5 w-3.5 shrink-0 text-accent" />
                  {label}
                </dt>
                <dd className="mt-1.5 text-sm leading-snug font-semibold text-white sm:text-[15px]">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
