
const webpack = require("webpack");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const withTM = require("next-transpile-modules")([
  // `monaco-editor` isn't published to npm correctly: it includes both CSS
  // imports and non-Node friendly syntax, so it needs to be compiled.
  "monaco-editor"
]);


module.exports = withTM({
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

    



    const rule = config.module.rules
      .find(rule => rule.oneOf)
      .oneOf.find(
        r =>
          // Find the global CSS loader
          r.issuer && r.issuer.include && r.issuer.include.includes("_app")
      );
    if (rule) {
      rule.issuer.include = [
        rule.issuer.include,
        // Allow `monaco-editor` to import global CSS:
        /[\\/]node_modules[\\/]monaco-editor[\\/]/
      ];
    }
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: [
          "json",
          "markdown",
          "css",
          "typescript",
          "javascript",
          "html",
          "graphql",
          "python",
          "scss",
          "yaml"
        ],
        filename: "static/[name].worker.js"
      })
    );


    return config
  },


  images: {
    domains: [process.env.HOST_NAME, "192.168.1.103", "lh3.googleusercontent.com"],
    formats: ["image/webp"],
  },
  
});
