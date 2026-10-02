import type { ReactNode } from "react";

interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** "light" = sobre fondo claro; "dark" = sobre fondo azul marino. */
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  className = "",
}: SectionTitleProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <p
          className={`mb-5 inline-flex items-center gap-3 font-display text-xs font-bold tracking-[0.28em] uppercase ${dark ? "text-white/70" : "text-navy/60"}`}
        >
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          {eyebrow}
          {centered && <span className="h-px w-8 bg-accent" aria-hidden="true" />}
        </p>
      )}
      <Heading
        className={`font-display text-[1.75rem] leading-[1.15] font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${dark ? "text-white" : "text-navy"}`}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed text-pretty sm:text-lg ${dark ? "text-white/75" : "text-ink/70"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
