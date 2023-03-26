import { type API } from "lambda-api";

import { getStatus } from "@/hello/api/status";
import { serverError } from "@/hello/api/tmp";

export const setRoutes = (api: API): void => {
  api.get("/status", getStatus);
  api.get("/server-error", serverError);
};
