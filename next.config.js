/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gói gọn thành server độc lập để Dockerfile chạy `node server.js`.
  output: 'standalone',
}

module.exports = nextConfig
