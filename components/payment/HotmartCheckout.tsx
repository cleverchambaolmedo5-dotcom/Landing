"use client";

import { useEffect, useRef, useState } from "react";
import { eventConfig } from "@/lib/event";
import Icon from "../ui/Icon";

declare global {
  interface Window {
    /** Definido por el código base de Meta Pixel (components/analytics/MetaPixel.tsx). */
    fbq?: (command: "track", event: string, params?: Record<string, string | number>) => void;
  }
}

/** Envía InitiateCheckout al píxel ya inicializado. Si el píxel no cargó, no hace nada. */
function trackInitiateCheckout() {
  if (typeof window.fbq !== "function") return;
  const price = Number(eventConfig.price);
  window.fbq("track", "InitiateCheckout", {
    content_name: eventConfig.name,
    content_type: "product",
    num_items: 1,
    ...(Number.isFinite(price) ? { value: price, currency: eventConfig.currency } : {}),
  });
}

interface HotmartCheckoutProps {
  /** Link de pago de Hotmart (eventConfig.checkoutUrl). */
  url: string;
  className?: string;
}

/** checkoutMode=2 es el modo que usa el botón oficial de Hotmart para mostrar el checkout embebido. */
function embedUrl(url: string) {
  const parsed = new URL(url);
  parsed.searchParams.set("checkoutMode", "2");
  return parsed.toString();
}

/**
 * Botón "Pagar con Hotmart" que abre el checkout de Hotmart en un modal dentro de la misma página.
 * Es un enlace real: si JavaScript falla (o con Ctrl/Cmd + clic) abre el checkout normalmente.
 */
export default function HotmartCheckout({ url, className = "" }: HotmartCheckoutProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  /** InitiateCheckout se envía una sola vez por visita a la página. */
  const checkoutTracked = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setLoaded(false);
  };

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          if (!checkoutTracked.current) {
            checkoutTracked.current = true;
            trackInitiateCheckout();
          }
          if (event.metaKey || event.ctrlKey || event.shiftKey) return;
          event.preventDefault();
          setOpen(true);
        }}
        className={`group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-accent px-9 text-center font-display text-[13px] font-bold tracking-[0.06em] text-white uppercase shadow-[0_10px_30px_-10px_rgb(245_106_10/0.6)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-[15px] sm:tracking-[0.08em] ${className}`}
      >
        <Icon name="lock" strokeWidth={2} className="h-4 w-4 shrink-0" />
        Pagar con Hotmart
        <Icon
          name="arrowRight"
          strokeWidth={2}
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>

      <dialog
        ref={dialogRef}
        aria-label="Checkout de Hotmart"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => event.target === event.currentTarget && close()}
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-navy-950/80 backdrop:backdrop-blur-sm sm:m-auto sm:h-[min(92dvh,860px)] sm:w-[min(640px,calc(100vw-2rem))]"
      >
        {open && (
          <div className="flex h-full flex-col overflow-hidden bg-white sm:rounded-[24px] sm:shadow-[0_40px_90px_-30px_rgb(0_0_0/0.6)]">
            {/* Barra superior */}
            <div className="relative flex shrink-0 items-center justify-between gap-4 bg-navy px-5 py-3.5 text-white">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-accent" />
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Icon name="lock" strokeWidth={2} className="h-4 w-4 text-accent" />
                Pago seguro con Hotmart
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar checkout"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Icon name="x" strokeWidth={2} className="h-5 w-5" />
              </button>
            </div>

            {/* Checkout embebido */}
            <div className="relative flex-1 bg-white">
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-ink/60">
                  <span className="h-8 w-8 animate-spin rounded-full border-2 border-navy/15 border-t-accent motion-reduce:animate-none" />
                  Cargando checkout seguro…
                </div>
              )}
              <iframe
                src={embedUrl(url)}
                title="Checkout de Hotmart"
                allow="payment *; clipboard-write"
                onLoad={() => setLoaded(true)}
                className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
              />
            </div>

            {/* Alternativa si el navegador bloquea algo dentro del iframe */}
            <p className="shrink-0 border-t border-navy/10 bg-mist px-5 py-3 text-center text-[12px] text-ink/60">
              ¿Problemas para completar el pago?{" "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-navy underline underline-offset-2 hover:text-accent"
              >
                Abrir el checkout en una pestaña nueva
              </a>
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
