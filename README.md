This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Meta Pixel (Facebook / Instagram Ads)

### Configuración

| Variable | Valor | Dónde |
| --- | --- | --- |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID numérico del píxel | `.env.local` (local, no se sube a Git) y variables de entorno de la app Node.js en Hostinger |

La variable se incrusta **durante el build**: después de crearla o cambiarla en Hostinger hay que volver a desplegar (nuevo build).
Si falta o no es numérica, el píxel no se carga y la web funciona igual.

### Dónde se inicializa

- `components/analytics/MetaPixel.tsx`: solo el código base oficial (`init` + `PageView`), montado una sola vez en `app/layout.tsx`.

El código de la landing no envía ningún otro evento. Las navegaciones internas de Next.js las registra el propio píxel como `PageView` (detecta los cambios de historial).
Los eventos de conversión se configuran y gestionan desde las herramientas de Meta.
