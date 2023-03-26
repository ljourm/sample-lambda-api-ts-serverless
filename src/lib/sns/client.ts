import { SNS } from "@aws-sdk/client-sns";

export const publishSns = async (message: string): Promise<void> => {
  const sns = new SNS({ apiVersion: "2010-03-31" });

  const params = {
    Message: message,
    TopicArn: "arn:aws:sns:ap-northeast-1:123456789101:sample-lambda-api-ts-notification",
  };

  await sns.publish(params);
};
