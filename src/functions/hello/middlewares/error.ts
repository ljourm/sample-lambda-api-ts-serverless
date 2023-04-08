import { type Request, type API } from "lambda-api";
import { getCloudWatchLogStreamUrlByLambda } from "~/lib/cloudWatch/lambda";
import { notifySlack } from "~/lib/slack/notify";

const buildErrorText = (name: string, message: string, req: Request): string => {
  const logUrl = !process.env.IS_OFFLINE && getCloudWatchLogStreamUrlByLambda(req.context);

  return `
[Hello API Error Notification]
:broken_heart: ${name} ${message}

${req.id}
${req.method} ${req.path}
${logUrl ? `<${logUrl}|Show CloudWatch Logs>` : "~Show CloudWatch Logs~"}
`;
};

export const setErrorHandler = (api: API): void => {
  api.use((err, req, _res, next) => {
    const text = buildErrorText(err.name, err.message, req);

    notifySlack(text).catch(next);
  });
};
