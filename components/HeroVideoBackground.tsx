"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { heroVideo } from "@/lib/media";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/**
 * Video decorativo de fondo del hero (cubre toda la sección, sin audio, en bucle, sin controles).
 * - La portada (imagen optimizada) se pinta primero; el video se pide después de hidratar, sin bloquear el texto.
 * - Se pausa fuera de pantalla. Con prefers-reduced-motion no arranca y queda la portada.
 * - Si el navegador bloquea el autoplay o el archivo falla, el hero se ve igual con la portada.
 */
export default function HeroVideoBackground() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );

  useEffect(() => {
    const video = ref.current;
    if (!video || reducedMotion) return;

    // `muted` se fija por JS: React no siempre lo emite como atributo y sin él el navegador bloquea el autoplay.
    video.muted = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {
          // Autoplay bloqueado (p. ej. modo ahorro de batería): queda la portada.
        });
      } else {
        video.pause();
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <Image
        src={heroVideo.poster}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        preload
        className="object-cover object-center"
      />
      {!failed && (
        <video
          ref={ref}
          src={heroVideo.src}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      {/* Overlay azul marino con degradado hacia abajo: deja ver el video y asegura la lectura del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy/75 to-navy/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(11_22_40/0.6)_100%)]" />
    </div>
  );
}
