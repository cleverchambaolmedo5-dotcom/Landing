import EventIntro from "@/components/EventIntro";
import FAQ from "@/components/FAQ";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Testimonials from "@/components/Testimonials";
import Transformation from "@/components/Transformation";
import Offer from "@/components/Offer";
import OfferPopup from "@/components/OfferPopup";
import Logo from "@/components/ui/Logo";

export default function Home() {
  return (
    <>
      <Header logo={<Logo preload />} />
      <main>
        <Hero />
        <Problem />
        <EventIntro />
        <Transformation />
        <Testimonials />
        <Offer />
        <FAQ />
      </main>
      <OfferPopup trigger="timer" delayMs={5_000} title="Asegura tu lugar en Wake Up." storageKey="wu-popup-landing" />
    </>
  );
}
