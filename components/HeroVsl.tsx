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
 * Video del hero (16:9, sin audio): arranca solo, en silencio y en bucle.
 * - No se descarga hasta que entra en pantalla; mientras tanto se ve la portada optimizada.
 * - Se pausa al salir de pantalla para no gastar batería ni datos.
 * - Con prefers-reduced-motion no arranca solo: queda la portada y el botón permite reproducirlo.
 * - El botón de la esquina pausa / reanuda el movimiento en cualquier momento.
 */
export default function HeroVsl() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );

  // Reproduce solo mientras el video está en pantalla (y si el visitante no lo pausó ni pidió menos movimiento).
  useEffect(() => {
    const video = ref.current;
    if (!video || reducedMotion || userPaused) return;

    // `muted` se fija por JS: React no siempre lo emite como atributo y sin él el navegador bloquea el autoplay.
    video.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay bloqueado (p. ej. modo ahorro de batería): queda la portada y el botón de reproducir.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
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
    <div className="relative aspect-video overflow-hidden rounded-[22px] bg-navy-950 shadow-[0_30px_70px_-30px_rgb(0_0_0/0.75)] ring-1 ring-white/10 sm:rounded-[26px]">
      <Image
        src={heroVideo.poster}
        alt=""
        fill
        sizes="(min-width: 1280px) 680px, (min-width: 1024px) 54vw, (min-width: 640px) 40rem, 100vw"
        placeholder="blur"
        preload
        className="object-cover"
      />

      {!failed && (
        <>
          <video
            ref={ref}
            src={heroVideo.src}
            muted
            loop
            playsInline
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setFailed(true)}
            aria-label={heroVideo.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pausar video" : "Reproducir video"}
            className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-navy/70 text-white ring-1 ring-white/15 backdrop-blur-sm transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-4 sm:bottom-4"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
                <rect x="14" y="5" width="3.5" height="14" rx="1" />
              </svg>
            ) : (
              <Icon name="play" className="ml-0.5 h-5 w-5" />
            )}
          </button>
        </>
      )}
    </div>
  );
}
