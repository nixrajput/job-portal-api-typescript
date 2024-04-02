import { Schema, model, Types } from "mongoose";
import type { IRecruiterProfileModel } from "../interfaces/entities/recruiterProfile";

const RecruiterProfileSchema = new Schema<IRecruiterProfileModel>(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },

    companyName: {
      type: String,
      maxlength: 100,
      required: true,
    },

    designation: {
      type: String,
      maxlength: 100,
      required: true,
    },

    linkedInUrl: {
      type: String,
      maxlength: 100,
    },

    website: {
      type: String,
      maxlength: 100,
    },

    totalEmployees: {
      type: String,
      maxlength: 50,
    },

    address: {
      addressLine1: {
        type: String,
        maxlength: 100,
      },

      addressLine2: {
        type: String,
        maxlength: 100,
      },

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

      pincode: {
        type: String,
        maxlength: 10,
      },
    },

    industryType: {
      type: String,
      maxlength: 100,
    },

    companyType: {
      type: String,
      maxlength: 100,
    },

    about: {
      type: String,
      maxlength: 1000,
    },

    logoUrl: {
      type: String,
      maxlength: 100,
    },

    tagline: {
      type: String,
      maxlength: 100,
    },

    xUrl: {
      type: String,
      maxlength: 100,
    },

    instagramUrl: {
      type: String,
      maxlength: 100,
    },

    facebookUrl: {
      type: String,
      maxlength: 100,
    },

    jobPostsCount: {
      type: Number,
      default: 0,
      min: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: "Job posts count should be an integer",
        },
      ],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

RecruiterProfileSchema.index({ user: "text" });
const RecruiterProfile = model<IRecruiterProfileModel>(
  "RecruiterProfile",
  RecruiterProfileSchema
);

export default RecruiterProfile;
