import type { ReactNode } from "react";
import { eventConfig } from "@/lib/event";
import CTAButton from "../CTAButton";
import Icon, { type IconName } from "../ui/Icon";
import HotmartCheckout from "./HotmartCheckout";

interface OptionCardProps {
  icon: IconName;
  tag: string;
  title: string;
  description: string;
  highlighted?: boolean;
  children: ReactNode;
}

function OptionCard({ icon, tag, title, description, highlighted = false, children }: OptionCardProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-[24px] bg-white p-6 transition duration-300 hover:-translate-y-0.5 sm:p-8 ${
        highlighted
          ? "shadow-[0_30px_60px_-35px_rgb(20_38_66/0.5)] ring-2 ring-accent"
          : "shadow-[0_20px_50px_-35px_rgb(20_38_66/0.45)] ring-1 ring-navy/10"
      }`}
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${
            highlighted ? "bg-accent text-white" : "bg-navy text-white"
          }`}
        >
          <Icon name={icon} strokeWidth={1.7} className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-bold tracking-[0.2em] text-navy/50 uppercase">{tag}</p>
          <h2 className="mt-1.5 font-display text-lg leading-snug font-extrabold text-navy sm:text-xl">{title}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{description}</p>
        </div>
      </div>
      <div className="mt-6 sm:mt-7 sm:pl-[4.75rem]">{children}</div>
    </article>
  );
}

export default function PaymentOptions() {
  const { checkoutUrl, whatsappUrl } = eventConfig;

  return (
    <div className="grid gap-5">
      {/* Opción 1 · Hotmart */}
      <OptionCard
        highlighted
        icon="card"
        tag="Opción 1 · Pago en línea"
        title="Paga con tarjeta a través de Hotmart"
        description="Completa tu pago en línea en la plataforma segura de Hotmart."
      >
        {checkoutUrl ? (
          <HotmartCheckout url={checkoutUrl} className="w-full sm:w-auto sm:min-w-[16rem]" />
        ) : (
          // Se activa automáticamente al completar eventConfig.checkoutUrl en lib/event.ts
          <div>
            <span
              aria-disabled="true"
              className="inline-flex min-h-14 w-full cursor-not-allowed items-center justify-center gap-3 rounded-full bg-accent/40 px-9 font-display text-[13px] font-bold tracking-[0.08em] text-white uppercase sm:w-auto sm:min-w-[16rem] sm:text-[15px]"
            >
              Pagar con Hotmart
            </span>
            <p className="mt-3 text-[13px] text-ink/50">Link de pago en configuración.</p>
          </div>
        )}
        <p className="mt-4 flex items-center gap-2 text-[13px] text-ink/55">
          <Icon name="lock" strokeWidth={1.8} className="h-4 w-4 shrink-0" />
          Pago procesado por Hotmart.
        </p>
      </OptionCard>

      {/* Opción 2 · Transferencia con el equipo */}
      <OptionCard
        icon="bank"
        tag="Opción 2 · Transferencia bancaria"
        title="Paga por transferencia con ayuda de nuestro equipo"
        description="Escríbenos por WhatsApp y nuestro equipo te enviará los datos bancarios y te ayudará a confirmar tu entrada."
      >
        {whatsappUrl && (
          <CTAButton
            href={whatsappUrl}
            external
            variant="outline-dark"
            trackCheckout
            size="lg"
            className="w-full sm:w-auto sm:min-w-[16rem]"
          >
            Hablar con mi equipo
          </CTAButton>
        )}
      </OptionCard>
    </div>
  );
}
