import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import galeria1 from "@/public/galeria1.jpeg";
import galeria2 from "@/public/galeria2.jpeg";
import galeria4 from "@/public/galeria4.jpeg";
import CTAButton from "./CTAButton";
import Container from "./ui/Container";
import Icon, { type IconName } from "./ui/Icon";
import Reveal from "./ui/Reveal";

interface Benefit {
  number: string;
  icon: IconName;
  title: ReactNode;
  description: ReactNode;
  image: { src: StaticImageData; alt: string };
}

const benefits: Benefit[] = [
  {
    number: "01",
    icon: "trending",
    title: (
      <>
        <span className="text-accent">Estrategias probadas</span> para empezar en bienes raíces
      </>
    ),
    description: (
      <>
        Aprenderás de manera práctica diferentes <strong>modelos de inversión inmobiliaria</strong>, cómo{" "}
        <strong>analizar oportunidades</strong> y qué aspectos debes evaluar para comenzar a{" "}
        <strong>construir tu patrimonio</strong>, incluso si estás empezando.
      </>
    ),
    image: { src: galeria2, alt: "Ponente de Wake Up enseñando a los asistentes durante el evento" },
  },
  {
    number: "02",
    icon: "chat",
    title: (
      <>
        <span className="text-accent">Asesoría personalizada</span> de todo nuestro equipo de trabajo
      </>
    ),
    description: (
      <>
        Tendrás la oportunidad de recibir <strong>orientación de nuestro equipo</strong>,{" "}
        <strong>resolver tus dudas</strong> y conocer perspectivas prácticas para evaluar tus ideas de inversión
        según <strong>tu situación y tus objetivos</strong>.
      </>
    ),
    image: { src: galeria1, alt: "Equipo de Wake Up conversando con los asistentes del evento" },
  },
  {
    number: "03",
    icon: "award",
    title: (
      <>
        <span className="text-accent">Certificación digital</span> de participación
      </>
    ),
    description: (
      <>
        Recibirás una <strong>certificación digital</strong> que acredita tu participación en WAKE UP: Riqueza
        Inmobiliaria, como reconocimiento a tu <strong>compromiso con el aprendizaje</strong> y tu desarrollo
        financiero.
      </>
    ),
    image: { src: galeria4, alt: "Asistente celebrando su participación en el evento Wake Up" },
  },
];

/** Borde irregular tipo papel rasgado para la franja azul marino. */
function TornEdge({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`block h-3 w-full text-navy sm:h-5 ${className}`}
    >
      <path
        fill="currentColor"
        d="M0 24V14l40-6 45 7 45-9 40 6 50-8 45 9 45-6 50 8 40-10 50 6 45-8 45 9 50-5 40 8 50-9 45 6 45-8 50 9 45-5 45 7 45-10 45 6 50-7 45 9 45-6 60 5v12Z"
      />
    </svg>
  );
}

export default function Transformation() {
  return (
    <section id="experiencia" className="bg-mist py-20 sm:py-28">
      {/* Encabezado: franja azul marino con bordes rasgados */}
      <Reveal>
        <TornEdge className="-mb-px" />
        <div className="bg-grid-dark bg-navy py-10 sm:py-14">
          <Container>
            <h2 className="mx-auto max-w-4xl text-center font-display text-[1.6rem] leading-[1.15] font-extrabold tracking-tight text-balance text-white uppercase sm:text-4xl lg:text-[2.75rem]">
              Lo que obtendrás en el <span className="text-accent">evento presencial</span>:
            </h2>
          </Container>
        </div>
        <TornEdge className="-mt-px rotate-180" />
      </Reveal>

      <Container>
        <div className="mx-auto mt-14 grid max-w-xl gap-6 sm:mt-16 lg:max-w-none lg:grid-cols-3 lg:gap-7">
          {benefits.map(({ number, icon, title, description, image }, index) => (
            <Reveal key={number} delay={index * 120} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-navy/10 bg-white p-6 shadow-[0_24px_50px_-35px_rgb(20_38_66/0.45)] sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent font-display text-lg font-extrabold text-white shadow-[0_12px_30px_-10px_rgb(245_106_10/0.7)]">
                    {number}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon name={icon} strokeWidth={1.8} className="h-6 w-6" />
                  </span>
                </div>

                <h3 className="mt-6 font-display text-lg leading-snug font-extrabold text-balance text-navy uppercase sm:text-xl lg:min-h-[3lh]">
                  {title}
                </h3>

                <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl bg-navy-800">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 36rem, 100vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>

                <p className="mt-6 text-[15px] leading-relaxed text-pretty text-ink/70 sm:text-base [&_strong]:font-semibold [&_strong]:text-navy">
                  {description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <CTAButton size="lg">Quiero asegurar mi entrada</CTAButton>
        </Reveal>
      </Container>
    </section>
  );
}
