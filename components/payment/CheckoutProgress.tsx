import Icon from "../ui/Icon";

const steps = ["Elegiste tu entrada", "Método de pago", "Confirmación"] as const;

interface CheckoutProgressProps {
  /** Paso actual (1-indexado). */
  current: number;
}

/** Barra de progreso del flujo de compra. */
export default function CheckoutProgress({ current }: CheckoutProgressProps) {
  const progress = ((current - 1) / (steps.length - 1)) * 100;

  return (
    <div>
      <p className="text-center text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase">
        Paso {current} de {steps.length}
      </p>

      <div className="relative mx-auto mt-5 max-w-xl">
        {/* Riel + relleno */}
        <div aria-hidden="true" className="absolute top-4 right-[16.66%] left-[16.66%] h-0.5 rounded-full bg-white/15">
          <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
        </div>

        <ol className="relative grid grid-cols-3">
          {steps.map((label, index) => {
            const step = index + 1;
            const done = step < current;
            const active = step === current;

            return (
              <li
                key={label}
                aria-current={active ? "step" : undefined}
                className="flex flex-col items-center gap-2.5 text-center"
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                    done
                      ? "bg-accent text-white"
                      : active
                        ? "bg-white text-navy ring-4 ring-accent/40"
                        : "border border-white/25 bg-navy text-white/50"
                  }`}
                >
                  {done ? <Icon name="check" strokeWidth={2.4} className="h-4 w-4" /> : step}
                </span>
                <span
                  className={`text-[11px] leading-tight font-semibold sm:text-xs ${
                    active ? "text-white" : done ? "text-white/75" : "text-white/45"
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
