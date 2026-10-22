import Script from "next/script";

/**
 * ID de Meta Pixel. Se define con NEXT_PUBLIC_META_PIXEL_ID y se incrusta durante `next build`,
 * así que la variable debe existir en el entorno de build (Hostinger) antes de compilar.
 * Solo se acepta un ID numérico (se inserta en un script inline); si falta, el píxel no se carga.
 */
const rawPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
const META_PIXEL_ID = /^\d+$/.test(rawPixelId) ? rawPixelId : null;

/**
 * Código base oficial de Meta Pixel (init + PageView). Se monta una sola vez en el layout raíz.
 * Las navegaciones internas de Next.js las registra el propio píxel (detecta los cambios de historial),
 * por eso aquí no se envía ningún PageView adicional. Los eventos de conversión se gestionan desde Meta.
 */
export default function MetaPixel() {
  if (!META_PIXEL_ID) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
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
    </>
  );
}
