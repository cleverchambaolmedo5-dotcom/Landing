import Icon, { type IconName } from "./Icon";

interface FeatureCardProps {
  index: number;
  icon: IconName;
  title?: string;
  description: string;
  className?: string;
}

/** Tarjeta reutilizable: número + icono + (título) + descripción. */
export default function FeatureCard({ index, icon, title, description, className = "" }: FeatureCardProps) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_1px_2px_rgb(20_38_66/0.04)] transition duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_18px_40px_-18px_rgb(20_38_66/0.35)] sm:p-7 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-navy-800">
          <Icon name={icon} className="h-6 w-6" />
        </span>
        <span className="font-display text-sm font-bold tracking-widest text-navy/25 transition-colors duration-300 group-hover:text-accent">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {title && (
        <h3 className="mt-6 font-display text-lg leading-snug font-bold text-navy">{title}</h3>
      )}
      <p className={`${title ? "mt-2.5 text-[15px] text-ink/70" : "mt-6 text-base font-medium text-ink/85"} leading-relaxed`}>
        {description}
      </p>
    </article>
  );
}
