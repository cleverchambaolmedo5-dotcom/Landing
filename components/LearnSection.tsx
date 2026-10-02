import SectionTitle from "./SectionTitle";
import Container from "./ui/Container";
import FeatureCard from "./ui/FeatureCard";
import type { IconName } from "./ui/Icon";
import Reveal from "./ui/Reveal";

// Descripciones breves PROVISIONALES: validar o reemplazar con el contenido oficial del programa.
const topics: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "target",
    title: "Detectar oportunidades",
    description: "Aprende a reconocer qué distingue una oportunidad real de una simple oferta.",
  },
  {
    icon: "trending",
    title: "Entender cómo funciona el dinero",
    description: "Comprende el papel de tus ingresos y cómo se mueve el dinero en una inversión inmobiliaria.",
  },
  {
    icon: "layers",
    title: "Conocer estrategias inmobiliarias",
    description: "Explora distintos enfoques para invertir en bienes raíces y cuándo encaja cada uno.",
  },
  {
    icon: "chart",
    title: "Analizar oportunidades",
    description: "Identifica las variables clave que debes revisar antes de tomar una decisión.",
  },
  {
    icon: "home",
    title: "Construir una visión de patrimonio",
    description: "Pasa de pensar solo en ingresos a pensar en patrimonio con una mirada de largo plazo.",
  },
];

export default function LearnSection() {
  return (
    <section id="aprenderas" className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow="Qué vas a aprender"
            title="En Wake Up vas a aprender a mirar los bienes raíces de otra manera."
          />
        </Reveal>

        <ul className="mt-14 flex flex-wrap justify-center gap-5 lg:mt-16 lg:gap-6">
          {topics.map((topic, index) => (
            <li
              key={topic.title}
              className="w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <Reveal delay={(index % 3) * 90} className="h-full">
                <FeatureCard index={index + 1} {...topic} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
