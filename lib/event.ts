/**
 * Configuración central del evento WAKE UP: RIQUEZA INMOBILIARIA.
 *
 * Regla: todo dato que todavía no ha sido confirmado se deja en `null`.
 * La interfaz muestra automáticamente "Por confirmar" en esos casos.
 * NO reemplazar por valores inventados: completar solo con datos reales.
 */

/** Valor pendiente de confirmar (`null`) o ya definido. */
export type Pending<T = string> = T | null;

export interface EventConfig {
  name: string;
  brand: { primary: string; secondary: string };
  format: string;
  /** Fecha del evento (texto final a mostrar) — PENDIENTE */
  date: Pending;
  /** Ciudad del evento — PENDIENTE */
  city: Pending;
  /** Nombre del lugar / auditorio — PENDIENTE */
  venue: Pending;
  /** Horario del evento (texto final a mostrar) — PENDIENTE */
  schedule: Pending;
  /** Precio de la entrada (solo el número, sin símbolo). */
  price: Pending;
  /** Moneda del precio (código ISO). */
  currency: string;
  /** Qué incluye la entrada (se muestra en la sección de oferta). */
  includes: string[];
  /** Link de WhatsApp del equipo de soporte (pagos por transferencia y dudas). */
  whatsappUrl: Pending;
  /** Link de pago de Hotmart. El botón "Pagar con Hotmart" de /pago lo abre en un modal. */
  checkoutUrl: Pending;
  /** URL pública del sitio (para Open Graph). Se puede definir con NEXT_PUBLIC_SITE_URL. */
  siteUrl: string;
  logo: {
    /** Ruta dentro de /public. Colocar el archivo oficial en /public/logo/ con este nombre. */
    src: string;
    alt: string;
    /** Dimensiones intrínsecas del archivo (ajustar al logo real). */
    width: number;
    height: number;
  };
}

export const eventConfig: EventConfig = {
  name: "Wake Up: Riqueza Inmobiliaria",
  brand: { primary: "WAKE UP", secondary: "RIQUEZA INMOBILIARIA" },
  format: "Evento presencial",
  date: "05 de diciembre",
  city: "Quito, Ecuador",
  venue: "Hotel Wyndham Garden",
  schedule: "09:00 — 18:00",
  price: "197",
  currency: "USD",
  includes: [
    "Capacitación full day",
    "Certificación digital",
    "Almuerzo",
    "Asesoría personalizada durante el evento",
  ],
  whatsappUrl: "https://wa.link/7jruqr",
  checkoutUrl: "https://pay.hotmart.com/T96563424Y?off=nbmcfmks",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logo: {
    src: "/logo/wake-up-logo-horizontal.png",
    alt: "Wake Up: Riqueza Inmobiliaria",
    width: 1098,
    height: 200,
  },
};

export const PENDING_LABEL = "Por confirmar";

export function displayValue(value: Pending): string {
  return value ?? PENDING_LABEL;
}

/** Página de pago: todos los botones de compra de la landing llevan aquí. */
export const PAYMENT_PATH = "/pago";

export function getCtaHref(): string {
  return PAYMENT_PATH;
}

export const navigation = [
  { label: "Inicio", href: "#inicio" },
  { label: "El Evento", href: "#evento" },
  { label: "Qué aprenderás", href: "#aprenderas" },
  { label: "Testimonios", href: "#testimonios" },
] as const;
