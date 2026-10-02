"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { displayValue, eventConfig } from "@/lib/event";
import { popupImage } from "@/lib/media";
import CTAButton from "./CTAButton";
import styles from "./OfferPopup.module.css";
import Icon from "./ui/Icon";

interface OfferPopupProps {
  /**
   * - "timer": se abre tras `delayMs` (landing principal).
   * - "exit": se abre al intentar salir (cursor hacia arriba para cerrar la pestaña,
   *   clic en un enlace a la landing o botón "atrás" del navegador) — página de pago.
   */
  trigger: "timer" | "exit";
  delayMs?: number;
  title: string;
  /** Destino del botón. En /pago lleva a las opciones de pago de la misma página. */
  ctaHref?: string;
  /** Clave para mostrarlo solo una vez por sesión. */
  storageKey: string;
}

function alreadyShown(key: string) {
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function markShown(key: string) {
  try {
    sessionStorage.setItem(key, "1");
  } catch {
    // Almacenamiento no disponible (modo privado): el pop-up simplemente puede repetirse.
  }
}

/** Enlaces internos que salen de /pago hacia la landing. */
function isExitLink(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href") ?? "";
  return anchor.target !== "_blank" && (href === "/" || href.startsWith("/#"));
}

export default function OfferPopup({ trigger, delayMs = 10_000, title, ctaHref, storageKey }: OfferPopupProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  /** Acción de salida pendiente (si la persona cierra el pop-up, se completa). */
  const pendingExit = useRef<(() => void) | null>(null);

  // Disparadores
  useEffect(() => {
    if (alreadyShown(storageKey)) return;

    const show = (onDismiss?: () => void) => {
      if (alreadyShown(storageKey)) return false;
      // Nunca encima de otro modal abierto (p. ej. el checkout de Hotmart)
      if (document.querySelector("dialog[open]")) return false;
      markShown(storageKey);
      pendingExit.current = onDismiss ?? null;
      setOpen(true);
      return true;
    };

    if (trigger === "timer") {
      const timer = window.setTimeout(() => show(), delayMs);
      return () => window.clearTimeout(timer);
    }

    // trigger === "exit"
    const onMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget && event.clientY <= 0) show();
    };

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || !isExitLink(anchor) || event.metaKey || event.ctrlKey) return;
      const href = anchor.href;
      if (show(() => window.location.assign(href))) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    // Botón "atrás": se agrega una entrada al historial para poder interceptarlo una vez.
    if (!window.history.state?.offerPopupGuard) {
      window.history.pushState({ ...window.history.state, offerPopupGuard: true }, "");
    }
    const onPopState = () => {
      if (!show(() => window.history.back())) window.history.back();
    };

    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState, { once: true });
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, [trigger, delayMs, storageKey]);

  // Sincroniza el estado con el <dialog> nativo y bloquea el scroll de fondo
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

  /** Cerrar con la X, Esc o clic fuera: si la persona intentaba salir, se le deja salir. */
  const dismiss = () => {
    setOpen(false);
    const exit = pendingExit.current;
    pendingExit.current = null;
    exit?.();
  };

  /** Clic en "Quiero mi entrada": se queda en el flujo de compra. */
  const accept = () => {
    pendingExit.current = null;
    setOpen(false);
  };

  const { price, currency, date, city, includes } = eventConfig;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="offer-popup-title"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => event.target === event.currentTarget && dismiss()}
    >
      {open && (
        <div className="w-[calc(100vw-2rem)] max-w-[26rem] py-6">
          <div className={`${styles.card} relative overflow-hidden rounded-[24px] bg-white shadow-[0_40px_90px_-30px_rgb(0_0_0/0.6)]`}>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Cerrar"
              className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy/70 text-white backdrop-blur-sm transition hover:bg-navy"
            >
              <Icon name="x" strokeWidth={2} className="h-5 w-5" />
            </button>

            {/* Espacio para imagen (configurable en lib/media.ts → popupImage) */}
            <div className="relative aspect-[16/9] bg-navy">
              <Image
                src={popupImage.src}
                alt={popupImage.alt}
                fill
                placeholder="blur"
                sizes="416px"
                className="object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
              <span className="absolute bottom-3 left-4 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-white uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                Cupos limitados
              </span>
            </div>

            <div className="px-6 pt-5 pb-6 text-center sm:px-7">
              <p className="text-[11px] font-bold tracking-[0.22em] text-navy/50 uppercase">
                Entrada presencial · {displayValue(date)} · {displayValue(city)}
              </p>
              <h2
                id="offer-popup-title"
                className="mt-2 font-display text-xl leading-tight font-extrabold text-balance text-navy sm:text-2xl"
              >
                {title}
              </h2>

              {/* Precio bien visible */}
              <p className="mt-4 flex items-start justify-center font-display leading-none font-black text-navy">
                <span className="mt-2 text-2xl text-accent">$</span>
                <span className="text-[4.25rem] tracking-tight">{displayValue(price)}</span>
                <span className="mt-3 ml-1.5 text-sm font-bold tracking-widest text-navy/50">{currency}</span>
              </p>

              <ul className="mx-auto mt-4 grid max-w-xs grid-cols-1 gap-1.5 text-left text-[13px] text-ink/70">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Icon name="check" strokeWidth={2.2} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <CTAButton href={ctaHref} size="lg" fullWidth className="mt-6" onClick={accept}>
                Quiero mi entrada
              </CTAButton>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
