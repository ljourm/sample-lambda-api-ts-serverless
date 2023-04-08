import { type Context } from "aws-lambda";
import { buildCloudWatchLogStreamUrl } from "./url";

export const getCloudWatchLogStreamUrlByLambda = (context: Context): string | undefined => {
  const region = process.env.AWS_REGION;

  if (!region) return;

  return buildCloudWatchLogStreamUrl({
    region,
    groupName: context.logGroupName,
    streamName: context.logStreamName,
    filterPattern: context.awsRequestId,
  });
};
