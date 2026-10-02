import CTAButton from "./CTAButton";
import ImagePlaceholder from "./ImagePlaceholder";
import SectionTitle from "./SectionTitle";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";

const before = [
  "No sé por dónde comenzar.",
  "Creo que necesito muchísimo dinero.",
  "No sé reconocer una buena oportunidad.",
  "Tengo miedo de equivocarme.",
  "No sé qué analizar.",
];

const after = [
  "Entiendo qué debo analizar.",
  "Conozco diferentes estrategias.",
  "Tengo una visión más clara.",
  "Sé identificar variables importantes.",
  "Salgo con una dirección más clara.",
];

export default function Transformation() {
  return (
    <section id="experiencia" className="bg-mist py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle align="center" eyebrow="La transformación" title="Tu realidad puede ser diferente." />
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:mt-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* ANTES */}
          <Reveal className="h-full">
            <article className="flex h-full flex-col rounded-3xl border border-navy/10 bg-white p-5 sm:p-7">
              <ImagePlaceholder label="Fotografía: antes" hint="Se agregará próximamente" aspect="wide" />
              <p className="mt-7 font-display text-xs font-bold tracking-[0.3em] text-navy/45 uppercase">Antes</p>
              <ul className="mt-5 space-y-4">
                {before.map((item) => (
                  <li key={item} className="flex items-start gap-3.5 text-[15px] leading-relaxed text-ink/65 sm:text-base">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy/40">
                      <Icon name="x" strokeWidth={2} className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* Flecha */}
          <div className="flex items-center justify-center" aria-hidden="true">
            <span className="flex h-14 w-14 rotate-90 items-center justify-center rounded-full bg-accent text-white shadow-[0_12px_30px_-10px_rgb(245_106_10/0.7)] lg:rotate-0">
              <Icon name="arrowRight" strokeWidth={2} className="h-6 w-6" />
            </span>
          </div>

          {/* DESPUÉS */}
          <Reveal delay={150} className="h-full">
            <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-navy p-5 text-white shadow-[0_30px_60px_-30px_rgb(20_38_66/0.6)] sm:p-7">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-accent" />
              <ImagePlaceholder label="Fotografía: después" hint="Se agregará próximamente" aspect="wide" tone="dark" />
              <p className="mt-7 font-display text-xs font-bold tracking-[0.3em] text-accent uppercase">Después</p>
              <ul className="mt-5 space-y-4">
                {after.map((item) => (
                  <li key={item} className="flex items-start gap-3.5 text-[15px] leading-relaxed font-medium text-white/90 sm:text-base">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Icon name="check" strokeWidth={2.2} className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        <Reveal className="mt-14 text-center">
          <CTAButton size="lg">Quiero asegurar mi entrada</CTAButton>
        </Reveal>
      </Container>
    </section>
  );
}
