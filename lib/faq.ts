/**
 * Preguntas frecuentes orientadas a resolver objeciones antes de la compra.
 *
 * Regla: las respuestas solo usan información confirmada del evento (lib/event.ts)
 * y del contenido de la landing. No agregar políticas no confirmadas
 * (reembolsos, cuotas, grabaciones, acompañantes, etc.).
 */
import { displayValue, eventConfig } from "./event";

export interface FaqItem {
  question: string;
  answer: string;
}

const { date, city, venue, schedule, price, currency, includes } = eventConfig;

const lowered = includes.map((item) => item.toLowerCase());
const includesText =
  lowered.length > 1 ? `${lowered.slice(0, -1).join(", ")} y ${lowered.at(-1)}` : (lowered[0] ?? "");

/** "09:00 — 18:00" → "09:00 a 18:00" para leerlo dentro de una frase. */
const scheduleText = displayValue(schedule).replace(/\s*—\s*/, " a ");

export const faq: FaqItem[] = [
  {
    question: "No tengo experiencia en bienes raíces. ¿Este evento es para mí?",
    answer:
      "Wake Up está pensado para quienes sienten que no saben por dónde comenzar, no saben qué analizar o tienen miedo de equivocarse. El objetivo es que comprendas cómo funcionan las oportunidades inmobiliarias y qué debes revisar antes de tomar una decisión.",
  },
  {
    question: "Creo que necesito muchísimo dinero para invertir en inmuebles.",
    answer:
      "Es una de las creencias más comunes. En Wake Up conocerás diferentes estrategias inmobiliarias y aprenderás a analizar las variables de cada oportunidad, para que puedas evaluar con criterio qué alternativas encajan con tu situación.",
  },
  {
    question: "¿Es otra conferencia motivacional?",
    answer:
      "No. Es una experiencia presencial de formación: aprenderás a detectar y analizar oportunidades, a entender cómo funciona el dinero y a construir una visión de patrimonio. Saldrás con una dirección más clara sobre qué analizar.",
  },
  {
    question: "¿Qué incluye mi entrada?",
    answer: `Tu entrada incluye ${includesText}.`,
  },
  {
    question: "¿Puedo resolver dudas sobre mi caso particular?",
    answer:
      "Sí. La entrada incluye asesoría personalizada durante el evento, para que puedas plantear tus dudas en persona.",
  },
  {
    question: "¿Cuándo y dónde es el evento?",
    answer: `El evento es presencial: ${displayValue(date)}, de ${scheduleText}, en el ${displayValue(venue)}, ${displayValue(city)}. Es una jornada full day.`,
  },
  {
    question: "¿Cuánto cuesta y cómo realizo el pago?",
    answer: `La entrada tiene un valor de $${displayValue(price)} ${currency}. Puedes pagar en línea a través de Hotmart o por transferencia bancaria, coordinando con nuestro equipo por WhatsApp.`,
  },
  {
    question: "¿Recibiré algún certificado?",
    answer: "Sí. Tu entrada incluye certificación digital.",
  },
  {
    question: "¿Por qué asegurar mi entrada ahora?",
    answer:
      "Porque los cupos presenciales son limitados. Asegurar tu entrada con anticipación garantiza tu lugar en el evento.",
  },
];
