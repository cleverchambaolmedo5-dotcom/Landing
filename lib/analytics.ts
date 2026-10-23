import { eventConfig } from "@/lib/event";

declare global {
  interface Window {
    /** Definido por el código base de Meta Pixel (components/analytics/MetaPixel.tsx). */
    fbq?: (command: "track", event: string, params?: Record<string, string | number>) => void;
  }
}

/**
 * Envía InitiateCheckout al píxel ya inicializado. Si el píxel no cargó, no hace nada.
 * `ctaLocation` indica qué botón lo disparó (p. ej. "inicio", "header", "pago_hotmart"),
 * para poder desglosarlo en Meta como parámetro personalizado.
 */
export function trackInitiateCheckout(ctaLocation?: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  const price = Number(eventConfig.price);
  window.fbq("track", "InitiateCheckout", {
    content_name: eventConfig.name,
    content_type: "product",
    num_items: 1,
    ...(Number.isFinite(price) ? { value: price, currency: eventConfig.currency } : {}),
    ...(ctaLocation ? { cta_location: ctaLocation } : {}),
  });
}
