"use client";

import type { MouseEvent, ReactNode } from "react";
import { trackInitiateCheckout } from "@/lib/analytics";
import { getCtaHref } from "@/lib/event";
import Icon from "./ui/Icon";

/** Sección de la página donde está el botón (id de la <section>, o "header"/"footer"), para el parámetro cta_location. */
function ctaLocation(element: HTMLElement): string | undefined {
  const container = element.closest<HTMLElement>("section[id], header, footer, [role='dialog'], dialog");
  if (!container) return undefined;
  if (container.matches("[role='dialog'], dialog")) return "popup";
  return container.id || container.tagName.toLowerCase();
}

type Variant = "primary" | "outline-light" | "outline-dark";
type Size = "sm" | "md" | "lg";

interface CTAButtonProps {
  children: ReactNode;
  /** Por defecto apunta a la página de pago (/pago). */
  href?: string;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  /** Abre el enlace en una pestaña nueva (WhatsApp, Hotmart). */
  external?: boolean;
  /**
   * Envía InitiateCheckout a Meta Pixel al hacer clic.
   * Por defecto solo los botones naranjas (variant "primary"); los demás deben activarlo explícitamente.
   */
  trackCheckout?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_10px_30px_-10px_rgb(245_106_10/0.6)] hover:bg-accent-600 hover:shadow-[0_14px_34px_-10px_rgb(245_106_10/0.7)]",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white/5",
  "outline-dark": "border border-navy/25 text-navy hover:border-navy hover:bg-navy/5",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-5 text-xs",
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-5 text-[13px] sm:px-9 sm:text-[15px]",
};

export default function CTAButton({
  children,
  href = getCtaHref(),
  variant = "primary",
  size = "md",
  fullWidth = false,
  showArrow = true,
  className = "",
  onClick,
  external = false,
  trackCheckout = variant === "primary",
}: CTAButtonProps) {
  return (
    <a
      href={href}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        if (trackCheckout) trackInitiateCheckout(ctaLocation(event.currentTarget));
        onClick?.();
      }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-3 rounded-full text-center font-display font-bold tracking-[0.06em] uppercase sm:whitespace-nowrap sm:tracking-[0.08em] transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:translate-y-0 ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      <span>{children}</span>
      {showArrow && (
        <Icon
          name="arrowRight"
          strokeWidth={2}
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </a>
  );
}
