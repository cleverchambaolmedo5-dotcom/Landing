"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { heroVideo } from "@/lib/media";
import Icon from "./ui/Icon";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/**
 * Video decorativo de fondo del hero (cubre toda la sección, sin audio, en bucle).
 * - La portada (imagen optimizada) se pinta primero; el video se pide después de hidratar, sin bloquear el texto.
 * - Se pausa fuera de pantalla. Con prefers-reduced-motion no arranca y queda la portada.
 * - Si el navegador bloquea el autoplay o el archivo falla, el hero se ve igual con la portada.
 * - Botón discreto para pausar el movimiento (accesibilidad: contenido animado de más de 5 s).
 */
export default function HeroVideoBackground() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );

  useEffect(() => {
    const video = ref.current;
    if (!video || reducedMotion || userPaused) return;

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
  }, [reducedMotion, userPaused]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (playing) {
      setUserPaused(true);
      video.pause();
    } else {
      setUserPaused(false);
      video.muted = true;
      void video.play();
    }
  };

  return (
    <>
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
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {/* Overlay azul marino: oscurece el centro (texto) y los bordes, deja ver el video */}
        <div className="absolute inset-0 bg-navy/75 sm:bg-navy/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(20_38_66/0.35)_0%,rgb(11_22_40/0.75)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy to-transparent" />
      </div>

      {!failed && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pausar video de fondo" : "Reproducir video de fondo"}
          className="absolute right-4 bottom-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 ring-1 ring-white/15 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-6 sm:bottom-6"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor">
              <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
              <rect x="14" y="5" width="3.5" height="14" rx="1" />
            </svg>
          ) : (
            <Icon name="play" className="ml-0.5 h-4 w-4" />
          )}
        </button>
      )}
    </>
  );
}
