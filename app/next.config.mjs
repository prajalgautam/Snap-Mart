/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep Turbopack scoped to this app. The parent directory contains other
  // lockfiles, so automatic workspace-root detection selects the wrong one.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/drt20nb92/image/**",
      },
    ],
  },
};

export default nextConfig;
