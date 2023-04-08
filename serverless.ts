/* eslint-disable no-template-curly-in-string */
import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "sample-lambda-api-ts",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    region: "ap-northeast-1",
    runtime: "nodejs18.x",
    memorySize: 128,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    // iamRoleStatements: [
    //   {
    //     Effect: "Allow",
    //     Action: "sns:Publish",
    //     Resource: "arn:aws:sns:ap-northeast-1:*:sample-lambda-api-ts-notification",
    //   },
    // ],
    stage: "${opt:stage, self:custom.defaultStage}",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      SLACK_WEBHOOK_URI: "${self:custom.environmentFile.${self:provider.stage}.SLACK_WEBHOOK_URI}",
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
    defaultStage: "dev",
    environmentFile: {
      dev: "${file(./environments/dev.yml)}",
      prd: "${file(./environments/prd.yml)}",
    },
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
  // resources: {
  //   Resources: {
  //     snsTopic: {
  //       Type: "AWS::SNS::Topic",
  //       Properties: { TopicName: "sample-lambda-api-ts-notification" },
  //     },
  //   },
  // },
};

module.exports = serverlessConfiguration;
