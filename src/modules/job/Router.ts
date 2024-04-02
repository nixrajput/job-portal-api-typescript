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
 * @access private
 */
JobRouter.route("/create").all(
  AuthMiddleware.isAuthenticatedUser,
  JobController.createJob
);

/**
 * @name getJobs
 * @description Perform get jobs.
 * @route GET /api/v1/job/all
 * @access public
 */
JobRouter.route("/all").all(JobController.getJobs);

export default JobRouter;
