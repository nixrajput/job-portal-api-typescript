import StatusCodes from "../../constants/StatusCodes";
import StringValues from "../../constants/Strings";
import ApiError from "../../exceptions/ApiError";
import { IRequest, IResponse, INext } from "../../interfaces/core/Express";
import { UserType } from "../../interfaces/db/User";
import Logger from "../../logger";
import Job from "../../models/Job";
import RecruiterProfile from "../../models/RecruiterProfile";

class JobController {
  /// @route  POST /api/v1/job/create

  public static async createJob(
    req: IRequest,
    res: IResponse,
    next: INext
  ): Promise<any> {
    if (req.method !== "POST") {
      return next(
        new ApiError(StringValues.INVALID_REQUEST_METHOD, StatusCodes.NOT_FOUND)
      );
    }

    const currentUser = req.currentUser;

    if (currentUser.userType !== UserType.Recruiter) {
      return next(
        new ApiError(
          StringValues.ACTION_NOT_PERMITTED,
          StatusCodes.UNAUTHORIZED
        )
      );
    }

    const userProfile = await RecruiterProfile.findOne({
      userId: currentUser._id,
    });

    if (!userProfile) {
      return next(
        new ApiError(StringValues.PROFILE_NOT_FOUND, StatusCodes.NOT_FOUND)
      );
    }

    try {
      const data = req.body;

      if (!data) {
        return next(
          new ApiError(StringValues.JOB_DATA_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (Object.values(data).length < 1) {
        return next(
          new ApiError(StringValues.JOB_DATA_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (!data.title) {
        return next(
          new ApiError(StringValues.JOB_TITLE_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (!data.noOfVacancies) {
        return next(
          new ApiError(
            StringValues.NO_OF_VACANCIES_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.minQualification) {
        return next(
          new ApiError(
            StringValues.MIN_QUALIFICATION_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.category) {
        return next(
          new ApiError(
            StringValues.JOB_CATEGORY_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.industry) {
        return next(
          new ApiError(
            StringValues.JOB_INDUSTRY_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.location) {
        return next(
          new ApiError(
            StringValues.JOB_LOCATION_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      const job = new Job({
        userId: currentUser._id,
        title: data.title,
        noOfVacancies: data.noOfVacancies,
        minQualification: data.minQualification,
        category: data.category,
        industry: data.industry,
        duration: data.duration,
        location: data.location,
        description: data.description,
      });

      await job.save();

      if (!job) {
        return next(
          new ApiError(
            StringValues.SOMETHING_WENT_WRONG,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      userProfile.jobPostsCount++;
      await userProfile.save();

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: StringValues.SUCCESS,
        data: job,
      });
    } catch (error: any) {
      const errorMessage =
        error?.message || error || StringValues.SOMETHING_WENT_WRONG;

      Logger.error(errorMessage);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return res.json({
        success: false,
        error: errorMessage,
      });
    }
  }
}

export default JobController;
