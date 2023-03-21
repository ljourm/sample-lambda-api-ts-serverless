import { APIGatewayEvent, Context } from "aws-lambda";
import createAPI, { Request, Response } from "lambda-api";

const api = createAPI({ logger: true });

api.get("/status", async (req: Request, res: Response) => {
  return { status: "ok" };
});

api.routes(true);

exports.call = async (event: APIGatewayEvent, context: Context) => {
  return await api.run(event, context);
};
