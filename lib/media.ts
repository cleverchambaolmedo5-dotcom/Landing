/**
 * Imágenes reales del proyecto (archivos en /public).
 * Se importan de forma estática para obtener dimensiones y blur placeholder automáticos.
 */
import event03 from "@/public/events/event-03.webp";
import fondo2 from "@/public/fondo2.jpeg";
import perfil1 from "@/public/perfil1.jpeg";

/** Fotografía de contexto para el fondo del hero (se muestra muy tenue). */
export const heroBackground = {
  src: fondo2,
  alt: "Público asistente a un evento Wake Up",
};

export const expertPhoto = {
  src: perfil1,
  alt: "Experto de Wake Up hablando con el público durante un evento",
};

/** Imagen del pop-up de oferta. Para cambiarla, importar otra foto y reemplazar `src`. */
export const popupImage = {
  src: event03,
  alt: "Asistentes celebrando durante un evento Wake Up",
};
