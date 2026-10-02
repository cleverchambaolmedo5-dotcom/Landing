"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import event01 from "@/public/events/event-01.webp";
import event02 from "@/public/events/event-02.webp";
import event03 from "@/public/events/event-03.webp";
import event04 from "@/public/events/event-04.webp";
import styles from "./EventGallery.module.css";

/**
 * Fotografías del evento (en /public/events). Para cambiarlas, reemplazar los archivos manteniendo los nombres.
 * Se importan de forma estática: la URL incluye un hash del contenido, así que una foto nueva nunca queda en caché.
 */
const photos = [
  { src: event01, alt: "Experto de Wake Up hablando con micrófono frente a los asistentes" },
  { src: event02, alt: "Experto de Wake Up dando una charla ante el público sentado" },
  { src: event03, alt: "Asistentes celebrando y bailando durante un evento Wake Up" },
  { src: event04, alt: "Asistente de Wake Up sonriendo con la mano en alto" },
] as const;

const INTERVAL_MS = 6500;
const SWAP_MS = 850;
const total = photos.length;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/**
 * Galería rotativa: 1 fotografía grande + 3 miniaturas.
 * Cada 6,5 s la primera miniatura pasa a ser la grande y la grande pasa al final de las miniaturas.
 * Se pausa fuera de pantalla, con la pestaña oculta, al pasar el cursor y con prefers-reduced-motion.
 */
export default function EventGallery() {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const paused = !inView || hovered || reducedMotion;

  const show = (index: number) => {
    if (index === active) return;
    setLeaving(active);
    setActive(index);
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(element);
    const onVisibility = () => document.hidden && setInView(false);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Rotación automática (se reinicia al cambiar manualmente de foto)
  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setLeaving(active);
      setActive((active + 1) % total);
    }, INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  // Limpia el estado "saliendo" al terminar la transición
  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setLeaving(null), SWAP_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  return (
    <div
      ref={ref}
      className={styles.gallery}
      data-paused={paused}
      style={{ "--interval": `${INTERVAL_MS}ms` } as CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="region"
      aria-roledescription="galería"
      aria-label="Fotografías de eventos Wake Up"
    >
      <div className={styles.stage}>
        {photos.map((photo, index) => {
          const slot = (index - active + total) % total;
          const isMain = slot === 0;

          return (
            <button
              key={photo.src.src}
              type="button"
              className={styles.photo}
              data-slot={slot}
              data-leaving={leaving === index}
              onClick={() => show(index)}
              tabIndex={isMain ? -1 : 0}
              aria-label={isMain ? photo.alt : `Ver fotografía: ${photo.alt}`}
              aria-current={isMain}
            >
              <Image
                src={photo.src}
                alt={isMain ? photo.alt : ""}
                fill
                sizes="(min-width: 1024px) 560px, (min-width: 768px) 75vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
              <span aria-hidden="true" className={styles.progress} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
