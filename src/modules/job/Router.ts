/**
 * Define Job Router
 */

import { Router } from "express";
import AuthMiddleware from "../../middlewares/Auth";
import JobController from "./JobController";

const JobRouter: Router = Router();

/**
 * @name createJob
 * @description Perform create job.
 * @route GET /api/v1/job/create
 * @access Private
 */
JobRouter.route("/create").all(
  AuthMiddleware.isAuthenticatedUser,
  JobController.createJob
);

export default JobRouter;
