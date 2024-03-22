import { Schema, model, Types } from "mongoose";
import IJobModel from "../interfaces/db/Job";

const JobSchema = new Schema<IJobModel>(
  {
    userId: {
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

    description: {
      type: String,
      validate: {
        validator: function (v: string) {
          return v.split(" ").filter((ele) => ele != "").length <= 1000;
        },
        msg: "Job description should not be greater than 1000 words",
      },
    },

    openings: {
      type: Number,
      validate: [
        {
          validator: Number.isInteger,
          msg: "No. of vacancies should be an integer",
        },
        {
          validator: function (value: number) {
            return value > 0;
          },
          msg: "No. of vacancies should be greater than 0",
        },
      ],
    },

    experienceRequired: {
      type: String,
      maxlength: 100,
    },

    category: {
      type: String,
      maxlength: 100,
    },

    industryType: {
      type: String,
      maxlength: 100,
    },

    location: {
      address: {
        type: String,
        maxlength: 100,
      },

      city: {
        type: String,
        maxlength: 100,
      },

      district: {
        type: String,
        maxlength: 100,
      },

      state: {
        type: String,
        maxlength: 100,
      },

      pincode: {
        type: String,
        maxlength: 100,
      },
    },

    // duration: {
    //   type: Number,
    //   min: 0,
    //   validate: [
    //     {
    //       validator: Number.isInteger,
    //       msg: "Job duration should be an integer",
    //     },
    //   ],
    // },

    applicantsCount: {
      type: Number,
      default: 0,
      min: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: "Applicatants count should be an integer",
        },
      ],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

JobSchema.virtual("employer", {
  ref: "CompanyProfile",
  localField: "userId",
  foreignField: "user",
  justOne: true,
});

JobSchema.index({
  title: "text",
  minQualification: "text",
  category: "text",
  industry: "text",
  "location.city": "text",
  "location.district": "text",
  "location.state": "text",
  "location.pincode": "text",
  description: "text",
});

const Job = model<IJobModel>("Job", JobSchema);

export default Job;
