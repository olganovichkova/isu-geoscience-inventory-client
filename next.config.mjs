/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/search",
        destination: "/search/term",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
