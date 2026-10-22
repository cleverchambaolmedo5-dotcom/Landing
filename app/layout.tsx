import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import MetaPixel from "@/components/analytics/MetaPixel";
import { eventConfig } from "@/lib/event";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const title = "Wake Up: Riqueza Inmobiliaria | Evento Presencial";
const description =
  "Descubre nuevas estrategias y oportunidades para comenzar a construir patrimonio mediante bienes raíces.";

export const metadata: Metadata = {
  metadataBase: new URL(eventConfig.siteUrl),
  title,
  description,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: eventConfig.name,
    title,
    description,
    // TODO: agregar imagen Open Graph (1200x630) cuando exista material gráfico oficial.
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#142642",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${montserrat.variable} antialiased`}
    >
      <body className="font-sans">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
