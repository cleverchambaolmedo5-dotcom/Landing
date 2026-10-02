"use client";

import { useEffect, useState, type ReactNode } from "react";
import { navigation } from "@/lib/event";
import CTAButton from "./CTAButton";
import Icon from "./ui/Icon";

interface HeaderProps {
  /** Logo renderizado en el servidor (ver components/ui/Logo.tsx). */
  logo: ReactNode;
}

export default function Header({ logo }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-navy/95 shadow-[0_10px_30px_-15px_rgb(0_0_0/0.5)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-8">
        {/* El hero ya muestra el logo en grande: el del header aparece al hacer scroll */}
        <a
          href="#inicio"
          onClick={close}
          aria-label="Ir al inicio"
          tabIndex={scrolled || open ? undefined : -1}
          className={`shrink-0 transition-all duration-500 ${
            scrolled || open ? "opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          {logo}
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-10">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative py-2 text-[13px] font-medium text-white/75 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <CTAButton size="sm" showArrow={false}>
            Asegura tu entrada
          </CTAButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
        >
          <Icon name={open ? "x" : "menu"} strokeWidth={1.8} className="h-6 w-6" />
        </button>
      </div>

      {/* Menú mobile */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`overflow-hidden transition-[max-height,opacity] duration-400 ease-out lg:hidden ${
          open ? "max-h-[calc(100dvh-4rem)] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Móvil" className="mx-auto max-w-7xl overflow-y-auto px-5 pt-2 pb-8 sm:px-8">
          <ul className="divide-y divide-white/10 border-t border-white/10">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="flex min-h-14 items-center justify-between font-display text-base font-semibold text-white/85 transition-colors hover:text-white"
                >
                  {item.label}
                  <Icon name="arrowRight" className="h-4 w-4 text-white/30" />
                </a>
              </li>
            ))}
          </ul>
          <CTAButton size="lg" fullWidth className="mt-6" onClick={close}>
            Asegura tu entrada
          </CTAButton>
        </nav>
      </div>
    </header>
  );
}
