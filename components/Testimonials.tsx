import { testimonials } from "@/lib/testimonials";
import CTAButton from "./CTAButton";
import SectionTitle from "./SectionTitle";
import TestimonialVideos from "./TestimonialVideos";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";

export default function Testimonials() {
  return (
    <section id="testimonios" className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-28">
      <div
        aria-hidden="true"
        className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_65%)]"
      />

      <Container>
        <Reveal>
          <SectionTitle
            align="center"
            tone="dark"
            eyebrow="Testimonios"
            title="Lo que dicen quienes ya vivieron Wake Up."
            description="Asistentes del evento cuentan, con sus propias palabras, cómo vivieron la experiencia presencial."
          />
        </Reveal>

        <Reveal delay={100} className="mt-12 lg:mt-16">
          <TestimonialVideos items={testimonials} />
        </Reveal>

        <Reveal className="mt-12 text-center lg:mt-16">
          <CTAButton size="lg" className="w-full sm:w-auto">
            Quiero mi entrada
          </CTAButton>
        </Reveal>
      </Container>
    </section>
  );
}
