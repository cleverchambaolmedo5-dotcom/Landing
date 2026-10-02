/**
 * Configuración en JavaScript (no TypeScript) para que Next.js no necesite compilarla con SWC:
 * en el entorno de build de Hostinger (GLIBC 2.28) el binario nativo de SWC no se puede cargar.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
};

export default nextConfig;
