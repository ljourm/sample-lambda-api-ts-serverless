import { type Callback, type APIGatewayEvent, type Context } from "aws-lambda";
import createAPI from "lambda-api";
import { setErrorHandler } from "./middlewares/error";
import { setRoutes } from "./routes";

const api = createAPI({ logger: { access: true, level: "info", stack: true } });

setRoutes(api);
setErrorHandler(api);

api.routes(true);

exports.call = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  api.run(event, context, callback);
};
