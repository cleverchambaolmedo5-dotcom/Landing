import Link from "next/link";
import Logo from "../ui/Logo";
import Icon from "../ui/Icon";

/** Header simplificado del flujo de pago: logo + volver a la landing (sin navegación que distraiga). */
export default function PaymentHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-8">
        <Link href="/" aria-label="Volver a la página del evento" className="shrink-0">
          <Logo preload />
        </Link>
        <Link
          href="/#entradas"
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[13px] font-medium text-white/70 transition-colors hover:text-white"
        >
          <Icon name="arrowLeft" strokeWidth={1.8} className="h-4 w-4" />
          <span className="hidden sm:inline">Volver al evento</span>
          <span className="sm:hidden">Volver</span>
        </Link>
      </div>
    </header>
  );
}
