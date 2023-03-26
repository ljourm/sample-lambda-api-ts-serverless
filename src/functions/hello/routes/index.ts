import { type API } from "lambda-api";

import { getStatus } from "@/hello/api/status";

export const setRoutes = (api: API): void => {
  api.get("/status", getStatus);
};
