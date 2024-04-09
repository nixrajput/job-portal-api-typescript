import { Schema, model, Types } from "mongoose";
import type { IJobModel } from "../interfaces/entities/job";
import { EJobType } from "../enums";

const JobSchema = new Schema<IJobModel>(
  {
    recruiterId: {
      type: Types.ObjectId,
      required: true,
    },

    title: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return v.split(" ").filter((ele) => ele != "").length <= 100;
        },
        msg: "Job title should not be greater than 100 words",
      },
    },

    mandatorySkills: {
      type: [String],
      required: true,
      default: [],
    },

    optionalSkills: {
      type: [String],
      default: [],
    },

    salary: {
      minSalary: {
        type: Number,
        required: true,
        min: 0,
        validate: [
          {
            validator: Number.isInteger,
            msg: "Minimum salary should be an integer",
          },
          {
            validator: function (value: number) {
              return value > 0;
            },
            msg: "Minimum salary should be greater than 0",
          },
        ],
      },

      maxSalary: {
        type: Number,
        required: true,
        min: 0,
        validate: [
          {
            validator: Number.isInteger,
            msg: "Maximum salary should be an integer",
          },
          {
            validator: function (value: number) {
              return value > 0;
            },
            msg: "Maximum salary should be greater than 0",
          },
        ],
      },
    },

    currency: {
      symbol: {
        type: String,
        default: "₹",
      },
      code: {
        type: String,
        default: "INR",
      },
    },

    hasProbationPeriod: {
      type: Boolean,
      default: false,
    },

    probationDuration: {
      type: Number,
      min: 0,
      max: 6,
      validate: [
        {
          validator: Number.isInteger,
          msg: "Probation duration should be an integer",
        },
        {
          validator: function (value: number) {
            return value > 0;
          },
          msg: "Probation duration should be greater than 0",
        },
        {
          validator: function (value: number) {
            return value <= 6;
          },
          msg: "Probation duration should be less or equal to 6",
        },
      ],
    },

    probationSalary: {
      minSalary: {
        type: Number,
        min: 0,
        validate: [
          {
            validator: Number.isInteger,
            msg: "Minimum probation salary should be an integer",
          },
          {
            validator: function (value: number) {
              return value > 0;
            },
            msg: "Minimum probation salary should be greater than 0",
          },
        ],
      },

      maxSalary: {
        type: Number,
        min: 0,
        validate: [
          {
            validator: Number.isInteger,
            msg: "Maximum probation salary should be an integer",
          },
          {
            validator: function (value: number) {
              return value > 0;
            },
            msg: "Maximum probation salary should be greater than 0",
          },
        ],
      },
    },

    jobType: {
      type: String,
      required: true,
      enum: EJobType,
    },

    location: {
      city: {
        type: String,
        maxlength: 100,
      },

      state: {
        type: String,
        maxlength: 100,
      },

      country: {
        type: String,
        maxlength: 100,
      },
    },

    isImmediateJoining: {
      type: Boolean,
      default: false,
    },

    preferredJoiningDate: {
      type: Date,
    },

    workExperience: {
      minExperience: {
        type: Number,
        required: true,
        min: 0,
        validate: [
          {
            validator: Number.isInteger,
            msg: "Minimum work experience should be an integer",
          },
          {
            validator: function (value: number) {
              return value > 0;
            },
            msg: "Minimum work experience should be greater than 0",
          },
        ],
      },

      maxExperience: {
        type: Number,
        required: true,
        min: 0,
        validate: [
          {
            validator: Number.isInteger,
            msg: "Maximum work experience should be an integer",
          },
          {
            validator: function (value: number) {
              return value > 0;
            },
            msg: "Maximum work experience should be greater than 0",
          },
        ],
      },
    },

    openings: {
      type: Number,
      required: true,
      validate: [
        {
          validator: Number.isInteger,
          msg: "No. of openings should be an integer",
        },
        {
          validator: function (value: number) {
            return value > 0;
          },
          msg: "No. of openings should be greater than 0",
        },
      ],
    },

    extraBenefits: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      maxlength: 2000,
    },

    applicants: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

JobSchema.virtual("recruiter", {
  ref: "RecruiterProfile",
  localField: "recruiterId",
  foreignField: "userId",
  justOne: true,
});

JobSchema.index({
  title: "text",
  "location.city": "text",
  "location.state": "text",
  "location.country": "text",
  description: "text",
});

const Job = model<IJobModel>("Job", JobSchema);

export default Job;
