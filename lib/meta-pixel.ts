import { eventConfig } from "./event";

/**
 * Meta Pixel (Facebook / Instagram Ads).
 *
 * El ID se define con NEXT_PUBLIC_META_PIXEL_ID. Se incrusta en el bundle durante `next build`,
 * así que la variable debe existir en el entorno de build (Hostinger) antes de compilar.
 * Si no está definida, el píxel no se carga y `trackEvent` no hace nada.
 */
const rawPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
/** Solo se acepta un ID numérico (se inserta en un script inline). */
export const META_PIXEL_ID = /^\d+$/.test(rawPixelId) ? rawPixelId : null;

/** Eventos estándar que se envían desde la web. `Purchase` NO se envía desde aquí (ver README). */
export type MetaStandardEvent = "PageView" | "ViewContent" | "InitiateCheckout" | "Contact";

/** Eventos que se disparan al hacer clic en un enlace marcado con `data-meta-event`. */
export type MetaClickEvent = Extract<MetaStandardEvent, "InitiateCheckout" | "Contact">;

type MetaEventParams = Record<string, string | number>;

declare global {
  interface Window {
    fbq?: (command: "track", event: MetaStandardEvent, params?: MetaEventParams) => void;
  }
}

const price = eventConfig.price ? Number(eventConfig.price) : NaN;

/** Parámetros de la entrada al evento. Nunca incluir datos personales. */
export const offerParams: MetaEventParams = {
  content_name: eventConfig.name,
  content_type: "product",
  ...(Number.isFinite(price) ? { value: price, currency: eventConfig.currency } : {}),
};

export const eventParams: Record<MetaClickEvent | "ViewContent", MetaEventParams> = {
  ViewContent: offerParams,
  InitiateCheckout: { ...offerParams, num_items: 1 },
  Contact: { content_name: eventConfig.name },
};

/** Envía un evento al píxel. No hace nada si el píxel no está configurado o fue bloqueado. */
export function trackEvent(event: MetaStandardEvent, params?: MetaEventParams) {
  if (!META_PIXEL_ID || typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}
