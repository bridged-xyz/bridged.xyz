const withTM = require("next-transpile-modules");
const withVideos = require("next-videos");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const FIREBASE_ENV_VARS = {
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUKET: process.env.FIREBASE_STORAGE_BUKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
};

module.exports = withBundleAnalyzer(
  withVideos(
    withMDX(
      withTM({
        pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
        webpack: function(config, { isServer }) {
          config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
              loader: "url-loader",
              options: {
                limit: 100000,
                name: "[name].[ext]",
              },
            },
          });
          config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
          });
          // config.plugins.push(new CompressionPlugin());
          if (!isServer) {
            config.node = {
              fs: "empty",
            };
          }
          return config;
        },
        transpileModules: [
          "lodash-es",
          "@web/layouts",
          "@web/styles",
          "@web/utils",
          "@web/common",
          "@web/components",
        ],
        images: {
          domains: ["img.youtube.com", "via.placeholder.com"],
        },
        env: {
          ...FIREBASE_ENV_VARS,
        },
        analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ["browser", "both"].includes(
          process.env.BUNDLE_ANALYZE,
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: "static",
            reportFilename: "../../bundles/server.html",
          },
          browser: {
            analyzerMode: "static",
            reportFilename: "../bundles/client.html",
          },
        },
        async rewrites() {
          return [
            {
              source: "/docs/:path*",
              destination: "https://docs.bridged.xyz/:path*",
            },
          ];
        },
        async redirects() {
          return [
            // disabling globalization page access since it's not fully implemented. (temporary)
            {
              source: "/globalization",
              destination: "/",
              permanent: false,
            },
          ];
        },
      }),
    ),
  ),
);
