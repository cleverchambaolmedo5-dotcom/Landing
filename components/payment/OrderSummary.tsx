import { displayValue, eventConfig, type Pending } from "@/lib/event";
import Icon, { type IconName } from "../ui/Icon";

const details: { label: string; value: Pending; icon: IconName }[] = [
  { label: "Fecha", value: eventConfig.date, icon: "calendar" },
  { label: "Ciudad", value: eventConfig.city, icon: "pin" },
  { label: "Lugar", value: eventConfig.venue, icon: "building" },
  { label: "Horario", value: eventConfig.schedule, icon: "clock" },
];

/** Resumen de la compra (columna lateral en desktop). */
export default function OrderSummary() {
  const { name, price, currency, includes, whatsappUrl } = eventConfig;

  return (
    <aside className="overflow-hidden rounded-[24px] bg-white shadow-[0_20px_50px_-35px_rgb(20_38_66/0.45)] ring-1 ring-navy/10">
      <div className="relative bg-navy px-6 py-5 text-white sm:px-7">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-accent" />
        <p className="text-[11px] font-bold tracking-[0.2em] text-white/55 uppercase">Resumen de tu entrada</p>
        <p className="mt-1.5 font-display text-lg leading-snug font-extrabold">{name}</p>
        <p className="mt-0.5 text-sm text-white/65">{eventConfig.format}</p>
      </div>

      <div className="px-6 py-6 sm:px-7">
        <dl className="grid grid-cols-2 gap-x-5 gap-y-4">
          {details.map(({ label, value, icon }) => (
            <div key={label} className="min-w-0">
              <dt className="flex items-center gap-1.5 text-[10.5px] font-semibold tracking-[0.18em] text-navy/45 uppercase">
                <Icon name={icon} strokeWidth={1.8} className="h-3.5 w-3.5 shrink-0 text-accent" />
                {label}
              </dt>
              <dd className="mt-1 text-sm leading-snug font-semibold text-ink">{displayValue(value)}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 space-y-2.5 border-t border-navy/10 pt-5">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink/75">
              <Icon name="check" strokeWidth={2.2} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-navy/10 pt-5">
          <span className="text-sm font-semibold text-ink/60">Total</span>
          <span className="font-display leading-none font-black text-navy">
            <span className="text-3xl">${displayValue(price)}</span>
            <span className="ml-1.5 text-sm font-bold tracking-widest text-navy/50">{currency}</span>
          </span>
        </div>
      </div>

      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-t border-navy/10 bg-mist px-6 py-4 text-[13px] font-semibold text-navy transition-colors hover:text-accent"
        >
          <Icon name="chat" strokeWidth={1.8} className="h-4 w-4" />
          ¿Tienes dudas? Escríbenos por WhatsApp
        </a>
      )}
    </aside>
  );
}
