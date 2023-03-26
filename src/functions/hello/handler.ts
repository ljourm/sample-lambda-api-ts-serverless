import { type APIGatewayEvent, type Context } from "aws-lambda";
import createAPI from "lambda-api";
import { setErrorHandler } from "./middlewares/error";
import { setRoutes } from "./routes";

const api = createAPI({ logger: { access: true, level: "info", stack: true } });

setRoutes(api);
setErrorHandler(api);

api.routes(true);

exports.call = async (event: APIGatewayEvent, context: Context) => {
  return await api.run(event, context);
};
