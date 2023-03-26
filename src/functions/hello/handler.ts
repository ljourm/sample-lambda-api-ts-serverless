import { type APIGatewayEvent, type Context } from "aws-lambda";
import createAPI from "lambda-api";
import { setRoutes } from "./routes";

const api = createAPI({ logger: true });

setRoutes(api);

api.routes(true);

exports.call = async (event: APIGatewayEvent, context: Context) => {
  return await api.run(event, context);
};
