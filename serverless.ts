import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "sample-lambda-api-ts-serverless",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: {
    hello: {
      handler: "src/functions/hello/handler.call",
      events: [
        {
          httpApi: {
            method: "*",
            path: "*",
          },
        },
      ],
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
      // NOTE: esbuild 0.17系にあげるとエラーになる
      // https://github.com/floydspace/serverless-esbuild/pull/440
      // watch: {
      //   pattern: ['src/**/*.ts'],
      // },
    },
  },
};

module.exports = serverlessConfiguration;
