import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { eventConfig } from "@/lib/event";

interface LogoProps {
  className?: string;
  preload?: boolean;
}

/**
 * Logo oficial de WAKE UP servido desde /public/logo/.
 * Mientras el archivo no exista, muestra un marcador neutro (no recrea el logo con texto).
 */
export default function Logo({ className = "h-8 w-auto sm:h-10", preload = false }: LogoProps) {
  const { src, alt, width, height } = eventConfig.logo;
  const fileExists = existsSync(path.join(process.cwd(), "public", src));

  if (!fileExists) {
    return (
      <span
        role="img"
        aria-label={alt}
        title={`Agregar logo en /public${src}`}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-dashed border-white/30 px-3 text-[10px] font-semibold tracking-[0.2em] text-white/55 uppercase sm:h-10"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        Logo
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      preload={preload}
      unoptimized={src.endsWith(".svg")}
      className={className}
    />
  );
}
