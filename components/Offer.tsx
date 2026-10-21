import { displayValue, eventConfig, type Pending } from "@/lib/event";
import CTAButton from "./CTAButton";
import SectionTitle from "./SectionTitle";
import Container from "./ui/Container";
import Icon, { type IconName } from "./ui/Icon";
import Reveal from "./ui/Reveal";

/** Iconos en el mismo orden que `eventConfig.includes` (si se agrega un ítem, usa "check"). */
const includeIcons: IconName[] = ["clock", "award", "utensils", "chat"];

const details: { label: string; value: Pending; icon: IconName }[] = [
  { label: "Fecha", value: eventConfig.date, icon: "calendar" },
  { label: "Ciudad", value: eventConfig.city, icon: "pin" },
  { label: "Lugar", value: eventConfig.venue, icon: "building" },
  { label: "Horario", value: eventConfig.schedule, icon: "clock" },
];

/** Botón de compra: lleva a la página de pago (/pago). */
function BuyButton({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <CTAButton size="lg" fullWidth className="min-h-16 text-[15px] sm:text-base">
        Quiero mi entrada
      </CTAButton>
      <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-current opacity-60">
        <Icon name="shield" strokeWidth={1.8} className="h-4 w-4 shrink-0" />
        Paga con Hotmart o por transferencia
      </p>
    </div>
  );
}

export default function Offer() {
  const { price, currency, includes } = eventConfig;

  return (
    <section id="entradas" className="relative isolate overflow-hidden bg-mist py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow="Tu entrada"
            title="Asegura tu lugar en Wake Up."
            description={`Un día completo de formación presencial en ${displayValue(eventConfig.city)} para aprender a mirar los bienes raíces de otra manera.`}
          />
        </Reveal>

        <Reveal delay={120} className="relative mx-auto mt-12 max-w-5xl lg:mt-16">
          {/* Halo naranja muy sutil detrás de la tarjeta */}
          <div
            aria-hidden="true"
            className="absolute inset-x-10 -inset-y-6 -z-10 rounded-[48px] bg-accent/20 blur-3xl"
          />

          <article className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_-40px_rgb(20_38_66/0.55)] ring-1 ring-navy/10 lg:grid-cols-[1.05fr_1fr]">
            {/* Panel izquierdo: precio */}
            <div className="relative isolate overflow-hidden bg-navy p-7 text-white sm:p-10 lg:p-12">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-accent" />
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-[90px]"
              />
              <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Entrada presencial
                </span>
                <span className="text-[12px] font-medium text-white/60">Cupos limitados</span>
              </div>

              <p className="mt-8 font-display text-xs font-bold tracking-[0.28em] text-white/60 uppercase">
                {eventConfig.brand.primary} · {eventConfig.brand.secondary}
              </p>

              <p className="mt-3 flex items-start font-display leading-none font-black tracking-tight">
                {price ? (
                  <>
                    <span className="mt-3 text-3xl text-accent sm:mt-4 sm:text-4xl">$</span>
                    <span className="text-[5.5rem] sm:text-[7rem]">{price}</span>
                    <span className="mt-4 ml-2 text-base font-bold tracking-widest text-white/60 sm:mt-6 sm:text-lg">
                      {currency}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl">{displayValue(price)}</span>
                )}
              </p>
              <p className="mt-2 text-sm text-white/60">Valor de la entrada</p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6">
                {details.map(({ label, value, icon }) => (
                  <div key={label} className="min-w-0">
                    <dt className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.2em] text-white/50 uppercase">
                      <Icon name={icon} strokeWidth={1.8} className="h-3.5 w-3.5 shrink-0 text-accent" />
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-snug font-semibold">{displayValue(value)}</dd>
                  </div>
                ))}
              </dl>

              <BuyButton className="mt-10 hidden text-white lg:block" />
            </div>

            {/* Panel derecho: qué incluye */}
            <div className="p-7 sm:p-10 lg:p-12">
              <h3 className="font-display text-xl font-extrabold text-navy sm:text-2xl">Tu entrada incluye</h3>

              <ul className="mt-6 divide-y divide-navy/10">
                {includes.map((item, index) => (
                  <li key={item} className="flex items-center gap-4 py-4 first:pt-0">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon name={includeIcons[index] ?? "check"} strokeWidth={1.8} className="h-5 w-5" />
                    </span>
                    <span className="text-[15px] leading-snug font-semibold text-ink sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>

              <BuyButton className="mt-8 text-ink lg:hidden" />
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
