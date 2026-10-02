import CTAButton from "./CTAButton";
import SectionTitle from "./SectionTitle";
import Container from "./ui/Container";
import FeatureCard from "./ui/FeatureCard";
import type { IconName } from "./ui/Icon";
import Reveal from "./ui/Reveal";

const pains: { icon: IconName; text: string }[] = [
  { icon: "wallet", text: "Tienes ingresos, pero al final del mes no queda suficiente para invertir." },
  { icon: "search", text: "Ves propiedades y oportunidades, pero no sabes cómo analizarlas." },
  { icon: "building", text: "Has pensado en invertir en bienes raíces, pero crees que necesitas muchísimo dinero." },
  { icon: "hourglass", text: "Pasan los años y sigues dependiendo únicamente de tus ingresos activos." },
];

export default function Problem() {
  return (
    <section id="problema" className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow="La realidad"
            title="¿Sientes que trabajas cada vez más, pero tu dinero no está construyendo patrimonio?"
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {pains.map((pain, index) => (
            <Reveal key={pain.text} delay={index * 90} className="h-full">
              <FeatureCard index={index + 1} icon={pain.icon} description={pain.text} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="relative mt-14 overflow-hidden rounded-3xl bg-mist px-6 py-10 text-center sm:px-12 sm:py-14 lg:mt-16">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-accent" />
            <p className="mx-auto max-w-2xl font-display text-xl leading-snug font-bold text-balance text-navy sm:text-2xl lg:text-3xl">
              ¿Cuánto tiempo más quieres esperar para comenzar a construir el patrimonio que mereces?
            </p>
            <CTAButton size="lg" className="mt-8">
              Quiero aprender a invertir
            </CTAButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
