import Image from "next/image";
import { displayValue, eventConfig, type Pending } from "@/lib/event";
import { expertPhoto, heroBackground } from "@/lib/media";
import CTAButton from "./CTAButton";
import Container from "./ui/Container";
import Icon, { type IconName } from "./ui/Icon";
import Logo from "./ui/Logo";
import Reveal from "./ui/Reveal";

const details: { label: string; value: Pending; icon: IconName }[] = [
  { label: "Fecha", value: eventConfig.date, icon: "calendar" },
  { label: "Ciudad", value: eventConfig.city, icon: "pin" },
  { label: "Lugar", value: eventConfig.venue, icon: "building" },
  { label: "Horario", value: eventConfig.schedule, icon: "clock" },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-navy text-white">
      {/* Fondo: una sola fotografía de contexto, muy tenue, bajo un overlay azul marino */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={heroBackground.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.08] blur-[2px] grayscale"
        />
        <div className="absolute inset-0 bg-navy/70 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy lg:via-navy/85 lg:to-navy/60" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
      </div>

      <Container className="grid items-center gap-12 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:grid-cols-[minmax(0,48fr)_minmax(0,52fr)] lg:gap-12 lg:pt-24 lg:pb-16 xl:gap-16">
        {/* Contenido */}
        <div className="min-w-0">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-white uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {eventConfig.format}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <Logo preload className="mt-6 h-auto w-full max-w-[15.5rem] sm:max-w-[20rem] xl:max-w-[22rem]" />
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-7 font-display text-[1.85rem] leading-[1.08] font-extrabold tracking-tight text-balance uppercase sm:text-5xl lg:text-[2.5rem] xl:text-[2.85rem]">
              ¿Trabajas cada vez más, pero <span className="text-accent">tu dinero no crece</span> como
              esperabas?
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-white/70 sm:mt-6 sm:text-lg">
              Únete a WAKE UP: Riqueza Inmobiliaria, una experiencia presencial donde aprenderás a
              identificar oportunidades inmobiliarias, analizar inversiones y descubrir nuevas formas de
              construir patrimonio, incluso si todavía no sabes por dónde empezar.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6 sm:gap-x-10 xl:max-w-none xl:grid-cols-4 xl:gap-x-6">
              {details.map(({ label, value, icon }) => (
                <div key={label} className="min-w-0">
                  <dt className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.2em] text-white/50 uppercase">
                    <Icon name={icon} strokeWidth={1.8} className="h-3.5 w-3.5 shrink-0 text-accent" />
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-snug font-semibold text-white sm:text-[15px]">
                    {displayValue(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 lg:mt-9">
              <CTAButton size="lg" className="w-full sm:w-auto sm:min-w-[17rem]">
                Estoy listo para empezar
              </CTAButton>
              <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-white/60 sm:justify-start">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Cupos presenciales limitados
              </p>
            </div>
          </Reveal>
        </div>

        {/* Fotografía principal del experto */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-md sm:max-w-lg lg:-mr-3 lg:max-w-none xl:-mr-6 min-[1400px]:-mr-14">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-navy-800 shadow-[0_30px_60px_-35px_rgb(0_0_0/0.6)] lg:aspect-auto lg:h-[clamp(540px,78vh,720px)]">
            <Image
              src={expertPhoto.src}
              alt={expertPhoto.alt}
              fill
              sizes="(min-width: 1280px) 680px, (min-width: 1024px) 52vw, (min-width: 640px) 32rem, 100vw"
              placeholder="blur"
              preload
              className="object-cover object-[center_30%]"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy/35 to-transparent" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
