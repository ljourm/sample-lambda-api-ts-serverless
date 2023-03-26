import { type Context } from "aws-lambda";

export const getCloudWatchLogGroupUrl = (context: Context): string | undefined => {
  const region = process.env.AWS_REGION;

  if (!region) {
    return;
  }

  return [
    "https://console.aws.amazon.com/cloudwatch/home?region=",
    region,
    "#logsV2:log-groups/log-group/",
    encodeURIComponent(context.logGroupName),
    "/log-events/",
    encodeURIComponent(context.logStreamName),
  ].join("");
};
