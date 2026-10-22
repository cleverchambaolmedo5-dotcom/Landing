import type { Metadata } from "next";
import TrackViewContent from "@/components/analytics/TrackViewContent";
import OfferPopup from "@/components/OfferPopup";
import CheckoutProgress from "@/components/payment/CheckoutProgress";
import OrderSummary from "@/components/payment/OrderSummary";
import PaymentHeader from "@/components/payment/PaymentHeader";
import PaymentOptions from "@/components/payment/PaymentOptions";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { displayValue, eventConfig } from "@/lib/event";

export const metadata: Metadata = {
  title: "Reserva tu lugar | Wake Up: Riqueza Inmobiliaria",
  description: "Elige cómo pagar tu entrada al evento presencial Wake Up: Riqueza Inmobiliaria.",
  robots: { index: false, follow: true },
};

export default function PaymentPage() {
  return (
    <>
      <TrackViewContent />
      <PaymentHeader />
      <main className="min-h-screen bg-mist">
        {/* Cabecera azul marino con progreso y título */}
        <section className="relative isolate overflow-hidden bg-navy pt-24 pb-28 text-white sm:pt-28 sm:pb-32">
          <div
            aria-hidden="true"
            className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-40 left-1/2 -z-10 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px]"
          />

          <Container>
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <CheckoutProgress current={2} />
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mx-auto mt-10 max-w-3xl text-center font-display text-[1.9rem] leading-[1.1] font-extrabold tracking-tight text-balance sm:text-5xl">
                  Estás a un paso de <span className="text-accent">reservar tu lugar</span> en Wake Up.
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-white/70 sm:text-lg">
                  Elige el método de pago que prefieras para asegurar tu entrada al evento presencial del{" "}
                  {displayValue(eventConfig.date)} en {displayValue(eventConfig.city)}.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Opciones de pago + resumen (la tarjeta se superpone a la cabecera) */}
        <section id="opciones-de-pago" className="relative -mt-16 pb-20 sm:pb-28">
          <Container className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-8">
            <Reveal delay={120}>
              <PaymentOptions />
            </Reveal>
            <Reveal delay={200} className="lg:sticky lg:top-8">
              <OrderSummary />
            </Reveal>
          </Container>
        </section>
      </main>
      <OfferPopup
        trigger="exit"
        title="¡Espera! Tu lugar aún no está reservado."
        ctaHref="#opciones-de-pago"
        storageKey="wu-popup-pago"
      />
    </>
  );
}
