"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { eventParams, trackEvent, type MetaClickEvent } from "@/lib/meta-pixel";

/** Ruta ya contada. El PageView de la carga inicial lo envía el código base, no este componente. */
let lastPathname: string | null = null;

function isClickEvent(value: string | undefined): value is MetaClickEvent {
  return value === "InitiateCheckout" || value === "Contact";
}

/**
 * - PageView en navegaciones internas (client-side) posteriores a la carga inicial.
 * - Eventos de clic para cualquier enlace con `data-meta-event` (Hotmart, WhatsApp).
 *   Un único listener delegado: no modifica el destino ni retrasa la navegación.
 */
export default function MetaPixelEvents() {
  const pathname = usePathname();

  useEffect(() => {
    // Comparar con la última ruta evita duplicados por Strict Mode / re-render.
    if (lastPathname !== null && lastPathname !== pathname) trackEvent("PageView");
    lastPathname = pathname;
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Clic principal o clic con la rueda (abrir en pestaña nueva)
      if (event.type === "auxclick" && event.button !== 1) return;
      const link = (event.target as Element | null)?.closest<HTMLElement>("[data-meta-event]");
      const name = link?.dataset.metaEvent;
      if (isClickEvent(name)) trackEvent(name, eventParams[name]);
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}
