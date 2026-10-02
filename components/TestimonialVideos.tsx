"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Testimonial } from "@/lib/testimonials";
import Icon from "./ui/Icon";

interface TestimonialVideosProps {
  items: Testimonial[];
}

/**
 * Videos que se reproducen dentro de su propia tarjeta (sin ventana modal).
 * - El video no se descarga hasta pulsar "play" (preload="none").
 * - Solo se reproduce uno a la vez: al iniciar uno, se pausan los demás.
 */
export default function TestimonialVideos({ items }: TestimonialVideosProps) {
  const [started, setStarted] = useState<Record<string, boolean>>({});
  const videos = useRef<Record<string, HTMLVideoElement | null>>({});

  const pauseOthers = (id: string) => {
    for (const [key, video] of Object.entries(videos.current)) {
      if (key !== id && video && !video.paused) video.pause();
    }
  };

  const play = (id: string) => {
    const video = videos.current[id];
    if (!video) return;
    pauseOthers(id);
    setStarted((state) => ({ ...state, [id]: true }));
    void video.play();
  };

  return (
    // Mobile: carrusel horizontal con snap · Tablet+: grilla de 3 columnas
    <ul className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:scroll-pl-8 sm:px-8 md:mx-auto md:grid md:max-w-5xl md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
      {items.map((item) => {
        const isStarted = started[item.id] ?? false;
        const label = item.name ? `testimonio de ${item.name}` : `testimonio: ${item.detail}`;

        return (
          <li key={item.id} className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-auto">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[20px] bg-navy-800 shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_18px_40px_-28px_rgb(0_0_0/0.6)]">
              <video
                ref={(element) => {
                  videos.current[item.id] = element;
                }}
                src={item.video}
                poster={item.poster.src}
                preload="none"
                playsInline
                controls={isStarted}
                onPlay={() => pauseOthers(item.id)}
                onEnded={() => setStarted((state) => ({ ...state, [item.id]: false }))}
                aria-label={`Video: ${label}`}
                className="absolute inset-0 h-full w-full bg-black object-cover"
              />

              {/* Portada + botón de reproducción (se oculta al iniciar el video) */}
              {!isStarted && (
                <button
                  type="button"
                  onClick={() => play(item.id)}
                  aria-label={`Reproducir ${label} (${item.duration})`}
                  className="group absolute inset-0 block text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <Image
                    src={item.poster}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 320px, 72vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-[0_12px_30px_-8px_rgb(245_106_10/0.75)] transition-transform duration-300 group-hover:scale-110">
                      <Icon name="play" className="ml-1 h-7 w-7" />
                    </span>
                  </span>
                </button>
              )}
            </div>

            <div className="mt-4 px-1">
              <p className="font-display text-base leading-tight font-bold text-white">
                {item.name ?? "Asistentes de Wake Up"}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-white/60">
                {item.detail} <span className="text-white/40">· {item.duration}</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
