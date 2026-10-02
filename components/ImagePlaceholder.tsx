import Icon, { type IconName } from "./ui/Icon";

type Aspect = "portrait" | "landscape" | "square" | "wide";

interface ImagePlaceholderProps {
  /** Qué imagen irá aquí (ej. "Fotografía del experto"). */
  label: string;
  /** Detalle técnico opcional (ej. "Formato vertical 4:5"). */
  hint?: string;
  aspect?: Aspect;
  tone?: "dark" | "light";
  icon?: IconName;
  className?: string;
}

const aspects: Record<Aspect, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

/** Marcador elegante para imágenes reales que se incorporarán más adelante. */
export default function ImagePlaceholder({
  label,
  hint,
  aspect = "landscape",
  tone = "light",
  icon = "image",
  className = "",
}: ImagePlaceholderProps) {
  const dark = tone === "dark";

  return (
    <div
      role="img"
      aria-label={`Espacio reservado: ${label}`}
      className={`relative isolate w-full overflow-hidden rounded-2xl ${aspects[aspect]} ${
        dark
          ? "bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 ring-1 ring-white/10"
          : "bg-gradient-to-br from-mist via-white to-[#e9eef5] ring-1 ring-navy/10"
      } ${className}`}
    >
      {/* Patrón diagonal sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${
            dark ? "rgb(255 255 255 / 0.035)" : "rgb(20 38 66 / 0.035)"
          } 0 1px, transparent 1px 14px)`,
        }}
      />
      {/* Brillo */}
      <div
        aria-hidden="true"
        className={`absolute -top-1/4 -right-1/4 -z-10 h-2/3 w-2/3 rounded-full blur-3xl ${
          dark ? "bg-accent/10" : "bg-navy/5"
        }`}
      />

      {/* Esquinas tipo visor */}
      {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map(
        (corner) => (
          <span
            key={corner}
            aria-hidden="true"
            className={`absolute h-5 w-5 ${corner} ${dark ? "border-white/30" : "border-navy/25"}`}
          />
        ),
      )}

      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-full ${
            dark ? "bg-white/5 text-white/60 ring-1 ring-white/15" : "bg-white text-navy/50 ring-1 ring-navy/10"
          }`}
        >
          <Icon name={icon} className="h-6 w-6" />
        </span>
        <p className={`font-display text-sm font-semibold ${dark ? "text-white/80" : "text-navy/75"}`}>{label}</p>
        {hint && (
          <p className={`text-xs tracking-wide ${dark ? "text-white/45" : "text-navy/45"}`}>{hint}</p>
        )}
      </div>
    </div>
  );
}
