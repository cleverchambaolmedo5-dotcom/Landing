import Script from "next/script";
import { META_PIXEL_ID } from "@/lib/meta-pixel";
import MetaPixelEvents from "./MetaPixelEvents";

/**
 * Código base oficial de Meta Pixel. Se monta una sola vez en el layout raíz.
 * `beforeInteractive` lo coloca en el <head> del HTML inicial: `fbq` existe antes de la hidratación,
 * de modo que los eventos de los componentes cliente nunca se pierden. El script fbevents.js
 * se sigue descargando de forma asíncrona y no bloquea la página.
 */
export default function MetaPixel() {
  if (!META_PIXEL_ID) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      <MetaPixelEvents />
    </>
  );
}
