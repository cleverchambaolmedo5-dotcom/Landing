/**
 * Imágenes reales del proyecto (archivos en /public).
 * Se importan de forma estática para obtener dimensiones y blur placeholder automáticos.
 */
import event03 from "@/public/events/event-03.webp";
import fondo2 from "@/public/fondo2.jpeg";
import heroVideoPoster from "@/public/hero-video-poster.webp";

/** Fotografía de contexto para el fondo del hero (se muestra muy tenue). */
export const heroBackground = {
  src: fondo2,
  alt: "Público asistente a un evento Wake Up",
};

/**
 * Video del hero (16:9). Fuente: public/VIDEO LANDING WAKEUP.mp4 (1080p, 19 MB),
 * comprimido a 720p para la web (H.264 sin audio: el original es mudo; faststart, ~8 MB).
 * La portada es un fotograma del propio video (segundo 3) exportado a webp.
 */
export const heroVideo = {
  src: "/video-landing-wakeup-720p.mp4",
  poster: heroVideoPoster,
  title: "Video de presentación de Wake Up: Riqueza Inmobiliaria",
};

/** Imagen del pop-up de oferta. Para cambiarla, importar otra foto y reemplazar `src`. */
export const popupImage = {
  src: event03,
  alt: "Asistentes celebrando durante un evento Wake Up",
};
