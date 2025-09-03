/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "ittcon-cms.onrender.com" }, // на всякий
      { protocol: "https", hostname: "colorful-flowers-5cff98aadb.media.strapiapp.com" }, // на всякий
    ],
  },
};

module.exports = nextConfig;
