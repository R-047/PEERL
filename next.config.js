module.exports = {
  // reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config
  },
  images: {
    domains: [process.env.HOST_NAME, "192.168.1.103"],
    formats: ["image/webp"],
},
}
