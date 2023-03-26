import { type Handler } from "aws-lambda";
import createAPI from "lambda-api";
import { setErrorHandler } from "./middlewares/error";
import { setRoutes } from "./routes";

const api = createAPI({ logger: { access: true, level: "info", stack: true } });

setRoutes(api);
setErrorHandler(api);

api.routes(true);

export const call: Handler = (event, context, callback) => {
  api.run(event, context, callback);
};
