/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add pageExtensions to only include files ending with .tsx or .ts
  pageExtensions: ['tsx', 'ts'],
  // export 時に末尾に slash をつける
  trailingSlash: true,
  // 画像最適化機能を無効化 (GitHub Pages は SSR を持たないため)
  images: {
    unoptimized: true,
  },
  // 静的サイトとして出力
  output: 'export',
};

module.exports = nextConfig;
