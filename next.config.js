
const webpack = require("webpack");

module.exports = {
  // reactStrictMode: true,
  publicRuntimeConfig: {
    HOST_URL: process.env.HOST_URL
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(env));

    return config
  },
  images: {
    domains: [process.env.HOST_NAME, "192.168.1.103", "lh3.googleusercontent.com"],
    formats: ["image/webp"],
},
  
}
