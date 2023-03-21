import { type APIGatewayEvent, type Context } from "aws-lambda";
import createAPI, { type Request, type Response } from "lambda-api";

const api = createAPI({ logger: true });

api.get("/status", (_req: Request, _res: Response) => {
  return { status: "ok" };
});

api.routes(true);

exports.call = async (event: APIGatewayEvent, context: Context) => {
  return await api.run(event, context);
};
