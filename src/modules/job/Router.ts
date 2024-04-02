/**
 * Define Job Router
 */

import { Router } from "express";
import AuthMiddleware from "../../middlewares/Auth";
import JobController from "./JobController";
import JobService from "../../services/JobService";

const JobRouter: Router = Router();

const jobSvc = new JobService();
const jobCtlr = new JobController(jobSvc);

/**
 * @name createJob
 * @description Perform create job.
 * @route GET /api/v1/job/create
 * @access private
 */
JobRouter.route("/create").all(
  AuthMiddleware.isAuthenticatedUser,
  jobCtlr.createJob
);

/**
 * @name getJobs
 * @description Perform get jobs.
 * @route GET /api/v1/job/all
 * @access public
 */
JobRouter.route("/all").all(jobCtlr.getJobs);

export default JobRouter;
