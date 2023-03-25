import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "sample-lambda-api-ts",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    region: "ap-northeast-1",
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
      destinations: {
        // onSuccess: {
        //   type: "sns",
        //   arn: { Ref: "!Ref snsTopic" },
        // },
        onFailure: {
          type: "sns",
          arn: { Ref: "!GetAtt MyCustomTopic.arn" },
        },
      },
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
  resources: {
    Resources: {
      snsTopic: {
        Type: "AWS::SNS::Topic",
        Properties: { TopicName: "MyCustomTopic" },
      },
    },
  },
};

module.exports = serverlessConfiguration;
