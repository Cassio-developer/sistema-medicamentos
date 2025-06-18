/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Adiciona fallbacks para módulos do Node.js
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
      canvas: false,
    };

    // Ignora warnings de módulos problemáticos
    config.ignoreWarnings = [
      { module: /node_modules\/puppeteer-core/ },
      { module: /node_modules\/@wppconnect/ },
      { module: /node_modules\/clone-deep/ },
    ];

    return config;
  },
  // Desabilita a otimização de imagens do Next.js para evitar problemas com o Puppeteer
  images: {
    unoptimized: true,
  },
  // Configurações experimentais para melhor compatibilidade
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@wppconnect-team/wppconnect']
  }
}

module.exports = nextConfig 