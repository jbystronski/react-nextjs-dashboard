"use strict";

const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const joi = require("joi");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "./.env") });

const envVarsSchema = joi
  .object()
  .keys({
    LOCAL_DB_PATH: joi.string(),
    NODE_ENV: joi
      .string()
      .valid("development", "production", "test", "provision")
      .required()
      .default("development"),
    PORT: joi.number().default(3000),
    DOMAIN: joi.string().default("localhost"),
    DB_CLIENT: joi
      .string()
      .valid("persist", "no_persist", "mongo")
      .default("no_persist"),
    DB_HOST: joi.string().default("test"),
    DB_DATABASE: joi.string().default("test"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);
if (error) {
  console.log(error.message);
  throw new Error(`Config validation error`);
}

const options = {
  reactStrictMode: true,

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new DuplicatePackageCheckerPlugin());
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    [
      "react-is",
      "@emotion/unitless",
      "@babel/runtime",
      "@react-pdf/pdfkit",
      "restructure",
      "clone",
      "scheduler",
      "unicode-trie",
    ].forEach(
      (mod) =>
        (config.resolve.alias[mod] = path.resolve(
          __dirname,
          `node_modules/${mod}`
        ))
    );

    config.resolve.alias["iconv-lite"] = false;

    // if (ANALYZE) {
    //   config.plugins.push(
    //     new BundleAnalyzerPlugin({
    //       analyzerMode: "server",
    //       analyzerPort: isServer ? 8888 : 8889,
    //       openAnalyzer: true
    //     })
    //   );
    // }

    return config;
  },
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true
  // },

  env: {
    localDbPath: envVars.LOCAL_DB_PATH,
    env: envVars.NODE_ENV,
    weather_app_key: envVars.WEATHER_APP_KEY,
    db: envVars.DB_CLIENT,
    domain: envVars.DOMAIN,
    port: envVars.PORT,
    baseUrl: "http://" + envVars.DOMAIN + ":" + envVars.PORT + "/",

    seedersPath: envVars.SEEDERS_PATH,
    isDevelopment: envVars.NODE_ENV === "development",

    db: {
      client: envVars.DB_CLIENT,
      host: envVars.DB_HOST,
      database: envVars.DB_DATABASE,
      resourceParam: "model",
    },
  },
};

module.exports = {
  ...withBundleAnalyzer(options),
  images: {
    domains: ["localhost"],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/admin/charts",
  //       permanent: false
  //     }
  //   ];
  // }
};
