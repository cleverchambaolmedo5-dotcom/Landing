/**
 * Testimonios en video de asistentes a Wake Up (archivos en /public/testimonios).
 * Fuente: public/web1.mp4, web2.mp4 y web3.mp4 (comprimidos a 720p para la web).
 *
 * `name: null` = el video no corresponde a una sola persona o no muestra el nombre.
 */
import type { StaticImageData } from "next/image";
import poster1 from "@/public/testimonios/wake-up-1.webp";
import poster2 from "@/public/testimonios/wake-up-2.webp";
import poster3 from "@/public/testimonios/wake-up-3.webp";

export interface Testimonial {
  id: string;
  name: string | null;
  /** Texto bajo el nombre. */
  detail: string;
  video: string;
  poster: StaticImageData;
  /** Duración mostrada en la tarjeta (m:ss). */
  duration: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "wake-up-1",
    name: null,
    detail: "¿Qué te motivó a asistir a Wake Up?",
    video: "/testimonios/wake-up-1.mp4",
    poster: poster1,
    duration: "1:31",
  },
  {
    id: "wake-up-2",
    name: "Mabel Villon",
    detail: "Asistente de Wake Up",
    video: "/testimonios/wake-up-2.mp4",
    poster: poster2,
    duration: "1:16",
  },
  {
    id: "wake-up-3",
    name: "Juan Mendieta",
    detail: "Asistente de Wake Up",
    video: "/testimonios/wake-up-3.mp4",
    poster: poster3,
    duration: "0:48",
  },
];
