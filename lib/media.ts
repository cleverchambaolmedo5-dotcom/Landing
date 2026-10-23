/**
 * Imágenes reales del proyecto (archivos en /public).
 * Se importan de forma estática para obtener dimensiones y blur placeholder automáticos.
 */
import event03 from "@/public/events/event-03.webp";
import heroVideoPoster from "@/public/hero-video-poster.webp";

/**
 * Video de fondo del hero (16:9, decorativo). Fuente: public/VIDEO LANDING WAKEUP.mp4 (1080p, 19 MB),
 * comprimido a 720p para la web (H.264 sin audio: el original es mudo; faststart, ~8 MB).
 * La portada es un fotograma del propio video (segundo 3) exportado a webp.
 */
export const heroVideo = {
  src: "/video-landing-wakeup-720p.mp4",
  poster: heroVideoPoster,
};

/** Imagen del pop-up de oferta. Para cambiarla, importar otra foto y reemplazar `src`. */
export const popupImage = {
  src: event03,
  alt: "Asistentes celebrando durante un evento Wake Up",
};
