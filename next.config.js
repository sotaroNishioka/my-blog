/** @type {import('next').NextConfig} */
const repoName = 'my-blog'; // Define repository name as a constant

const nextConfig = {
  reactStrictMode: true,
  // Add pageExtensions to only include files ending with .tsx or .ts
  pageExtensions: ['tsx', 'ts'],
  // export 時に末尾に slash をつける
  trailingSlash: true,
  // Set basePath and assetPrefix for GitHub Pages
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  // 画像最適化機能を無効化 (GitHub Pages は SSR を持たないため)
  images: {
    unoptimized: true,
  },
  // 静的サイトとして出力
  output: 'export',
};

module.exports = nextConfig;
