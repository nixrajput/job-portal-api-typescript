import { PipelineStage } from "mongoose";
import StatusCodes from "../../constants/StatusCodes";
import StringValues from "../../constants/Strings";
import ApiError from "../../exceptions/ApiError";
import { IRequest, IResponse, INext } from "../../interfaces/core/Express";
import {
  ICurrency,
  IJobLocation,
  ISalaryRange,
  IWorkExperienceRange,
} from "../../interfaces/db/Job";
import { UserType } from "../../interfaces/db/User";
import Logger from "../../logger";
import Job from "../../models/Job";
import RecruiterProfile from "../../models/RecruiterProfile";

export interface IJobBodyData {
  title: string;
  mandatorySkills: string[];
  optionalSkills?: string[];
  salary: ISalaryRange;
  currency?: ICurrency;
  hasProbationPeriod?: boolean;
  probationDuration?: number;
  probationSalary?: ISalaryRange;
  jobType: string;
  location: IJobLocation;
  isImmediateJoining: boolean;
  preferredJoiningDate?: Date;
  workExperience: IWorkExperienceRange;
  openings: number;
  extraBenefits?: string[];
  description: string;
}

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
      const data: IJobBodyData = req.body;

      if (!data) {
        return next(
          new ApiError(StringValues.JOB_DATA_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (!data.title) {
        return next(
          new ApiError(StringValues.JOB_TITLE_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (!data.mandatorySkills) {
        return next(
          new ApiError(
            StringValues.JOB_MANDATORY_SKILLS_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (data.mandatorySkills.length < 1) {
        return next(
          new ApiError(
            StringValues.JOB_MANDATORY_SKILLS_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (data.mandatorySkills.length > 5) {
        return next(
          new ApiError(
            StringValues.JOB_MANDATORY_SKILLS_MAX_LIMIT_ERROR,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (data.optionalSkills && data.optionalSkills.length > 10) {
        return next(
          new ApiError(
            StringValues.JOB_OPTIONAL_SKILLS_MAX_LIMIT_ERROR,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.salary) {
        return next(
          new ApiError(
            StringValues.JOB_SALARY_RANGE_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.salary.minSalary) {
        return next(
          new ApiError(
            StringValues.JOB_MIN_SALARY_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.salary.maxSalary) {
        return next(
          new ApiError(
            StringValues.JOB_MAX_SALARY_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (data.currency && !data.currency.code) {
        return next(
          new ApiError(
            StringValues.CURRENCY_CODE_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (data.currency && !data.currency.symbol) {
        return next(
          new ApiError(
            StringValues.CURRENCY_SYMBOL_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (data.hasProbationPeriod === true) {
        if (!data.probationDuration) {
          return next(
            new ApiError(
              StringValues.JOB_PROBATION_DURATION_REQUIRED,
              StatusCodes.BAD_REQUEST
            )
          );
        }

        if (!data.probationSalary) {
          return next(
            new ApiError(
              StringValues.JOB_PROBATION_SALARY_RANGE_REQUIRED,
              StatusCodes.BAD_REQUEST
            )
          );
        }

        if (!data.probationSalary.minSalary) {
          return next(
            new ApiError(
              StringValues.JOB_MIN_PROBATION_SALARY_REQUIRED,
              StatusCodes.BAD_REQUEST
            )
          );
        }

        if (!data.probationSalary.maxSalary) {
          return next(
            new ApiError(
              StringValues.JOB_MAX_PROBATION_SALARY_REQUIRED,
              StatusCodes.BAD_REQUEST
            )
          );
        }
      }

      if (!data.jobType) {
        return next(
          new ApiError(StringValues.JOB_TYPE_REQUIRED, StatusCodes.BAD_REQUEST)
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

      if (!data.location.city) {
        return next(
          new ApiError(
            StringValues.JOB_LOCATION_CITY_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.location.state) {
        return next(
          new ApiError(
            StringValues.JOB_LOCATION_STATE_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.location.country) {
        return next(
          new ApiError(
            StringValues.JOB_LOCATION_COUNTRY_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (data.isImmediateJoining === false && !data.preferredJoiningDate) {
        return next(
          new ApiError(
            StringValues.JOB_PREFERRED_JOINING_DATE_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.workExperience) {
        return next(
          new ApiError(
            StringValues.JOB_WORK_EXPERIENCE_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.workExperience.minExperience) {
        return next(
          new ApiError(
            StringValues.JOB_MIN_WORK_EXPERIENCE_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.workExperience.maxExperience) {
        return next(
          new ApiError(
            StringValues.JOB_MAX_WORK_EXPERIENCE_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.openings) {
        return next(
          new ApiError(
            StringValues.JOB_OPENINGS_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!data.description) {
        return next(
          new ApiError(
            StringValues.JOB_DESCRIPTION_REQUIRED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      const job = await Job.create({
        recruiterId: currentUser._id,
        title: data.title,
        mandatorySkills: data.mandatorySkills,
        optionalSkills: data.optionalSkills,
        salary: data.salary,
        currency: data.currency,
        hasProbationPeriod: data.hasProbationPeriod,
        probationDuration: data.probationDuration,
        probationSalary: data.probationSalary,
        jobType: data.jobType,
        location: data.location,
        isImmediateJoining: data.isImmediateJoining,
        preferredJoiningDate: data.preferredJoiningDate,
        workExperience: data.workExperience,
        openings: data.openings,
        extraBenefits: data.extraBenefits,
        description: data.description,
      });

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

  // Get jobs
  /// @route  GET /api/v1/job/all
  public static async getJobs(
    req: IRequest,
    res: IResponse,
    next: INext
  ): Promise<any> {
    if (req.method !== "GET") {
      return next(
        new ApiError(StringValues.INVALID_REQUEST_METHOD, StatusCodes.NOT_FOUND)
      );
    }

    let findParams: Record<string, any> = {};
    let sortParams: Record<string, any> = {};

    const reqQueries: Record<string, any> = req.query;

    // await utility.checkIfAuth(req, res, next);

    const page = reqQueries.page ? parseInt(reqQueries.page) : 1;
    const limit = reqQueries.limit ? parseInt(reqQueries.limit) : 10;
    const skip = page - 1 >= 0 ? (page - 1) * limit : 0;

    // if (reqQueries.minQualification) {
    //   findParams = {
    //     ...findParams,
    //     minQualification: reqQueries.minQualification,
    //   };
    // }

    // if (reqQueries.industry) {
    //   findParams = {
    //     ...findParams,
    //     industry: reqQueries.industry,
    //   };
    // }

    // if (reqQueries.category) {
    //   findParams = {
    //     ...findParams,
    //     category: reqQueries.category,
    //   };
    // }

    // if (reqQueries.district) {
    //   findParams = {
    //     ...findParams,
    //     "location.district": reqQueries.district,
    //   };
    // }

    if (reqQueries.q) {
      findParams = {
        ...findParams,
        title: {
          $regex: new RegExp(reqQueries.q, "i"),
        },
      };
    }

    if (reqQueries.asc) {
      if (Array.isArray(reqQueries.asc)) {
        reqQueries.asc.map((key) => {
          sortParams = {
            ...sortParams,
            [key]: 1,
          };
        });
      } else {
        sortParams = {
          ...sortParams,
          [reqQueries.asc]: 1,
        };
      }
    }

    if (reqQueries.desc) {
      if (Array.isArray(reqQueries.desc)) {
        reqQueries.desc.map((key) => {
          sortParams = {
            ...sortParams,
            [key]: -1,
          };
        });
      } else {
        sortParams = {
          ...sortParams,
          [reqQueries.desc]: -1,
        };
      }
    }

    // console.log("findParams:", findParams);
    // console.log("sortParams:", sortParams);

    let pipeline: PipelineStage[] = [
      { $match: findParams },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "recruiterprofiles",
          localField: "recruiterId",
          foreignField: "userId",
          pipeline: [
            {
              $project: {
                _id: 1,
                userId: 1,
                companyName: 1,
                website: 1,
                logoUrl: 1,
                about: 1,
                address: 1,
                createdAt: 1,
                updatedAt: 1,
              },
            },
          ],
          as: "recruiter",
        },
      },
      { $unwind: "$recruiter" },
      {
        $lookup: {
          from: "jobapplications",
          let: { job_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$jobId", "$$job_id"] },
                    { $eq: ["$userId", req.currentUser?._id] },
                  ],
                },
              },
            },
          ],
          as: "yourApplications",
        },
      },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $addFields: {
                _id: "$_id",
                isApplied: { $anyElementTrue: ["$yourApplications"] },
              },
            },
            {
              $project: { yourApplications: 0, __v: 0 },
            },
          ],
        },
      },
      { $unwind: "$total" },
      {
        $project: {
          currentPage: {
            $literal: skip / limit + 1,
          },
          hasNextPage: {
            $lt: [{ $multiply: [limit, Number(page)] }, "$total.count"],
          },
          totalPages: {
            $ceil: {
              $divide: ["$total.count", limit],
            },
          },
          totalItems: "$total.count",
          results: {
            $slice: ["$data", skip, { $ifNull: [limit, "$total.count"] }],
          },
        },
      },
    ];

    if (Object.keys(sortParams).length > 0) {
      sortParams = {
        ...sortParams,
        createdAt: -1,
      };

      pipeline = [
        { $match: findParams },
        { $sort: sortParams },
        {
          $lookup: {
            from: "recruiterprofiles",
            localField: "recruiterId",
            foreignField: "userId",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  userId: 1,
                  companyName: 1,
                  website: 1,
                  logoUrl: 1,
                  about: 1,
                  address: 1,
                  createdAt: 1,
                  updatedAt: 1,
                },
              },
            ],
            as: "recruiter",
          },
        },
        { $unwind: "$recruiter" },
        {
          $lookup: {
            from: "jobapplications",
            let: { job_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$jobId", "$$job_id"] },
                      { $eq: ["$userId", req.currentUser?._id] },
                    ],
                  },
                },
              },
            ],
            as: "yourApplications",
          },
        },
        {
          $facet: {
            total: [{ $count: "count" }],
            data: [
              {
                $addFields: {
                  _id: "$_id",
                  isApplied: { $anyElementTrue: ["$yourApplications"] },
                },
              },
              {
                $project: { yourApplications: 0, __v: 0 },
              },
            ],
          },
        },
        { $unwind: "$total" },
        {
          $project: {
            currentPage: {
              $literal: skip / limit + 1,
            },
            hasNextPage: {
              $lt: [{ $multiply: [limit, Number(page)] }, "$total.count"],
            },
            totalPages: {
              $ceil: {
                $divide: ["$total.count", limit],
              },
            },
            totalItems: "$total.count",
            results: {
              $slice: ["$data", skip, { $ifNull: [limit, "$total.count"] }],
            },
          },
        },
      ];
    }

    console.log("pipeline:", pipeline);

    const response = await Job.aggregate(pipeline);

    let finalResponse = {
      currentPage: 1,
      hasNextPage: false,
      totalPages: 1,
      totalItems: 0,
      results: [],
    };

    if (response.length > 0) {
      finalResponse = response[0];
    }

    res.status(StatusCodes.OK);
    return res.json({
      success: true,
      message: StringValues.SUCCESS,
      ...finalResponse,
    });
  }
}

export default JobController;
