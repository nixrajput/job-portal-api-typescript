/**
 * Define Routes
 */

import { Application } from "express";
import LocalConfig from "../config/LocalConfig";
import Logger from "../logger";
import JobRouter from "../modules/job/Router";
import AuthRouter from "../modules/auth/Router";

class Routes {
  /**
   * @name mountApi
   * @description Mount all api routes
   * @param _express
   * @returns Application
   */
  public mountApi(_express: Application): Application {
    const apiPrefix = LocalConfig.getConfig().API_PREFIX;
    Logger.info("Routes :: Mounting API routes...");

    // Mounting Routes
    _express.use(`/${apiPrefix}/auth`, AuthRouter);
    _express.use(`/${apiPrefix}/job`, JobRouter);

    return _express;
  }
}

export default new Routes();
