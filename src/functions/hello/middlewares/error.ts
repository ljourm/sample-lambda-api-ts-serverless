import { type API } from "lambda-api";

export const setErrorHandler = (api: API): void => {
  api.use((err, req, _res, next) => {
    req.log.error("sns published", { name: err.name, message: err.message });
    // TODO

    next();
  });
};
