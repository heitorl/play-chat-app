/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw-bucket-upload.s3.sa-east-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
