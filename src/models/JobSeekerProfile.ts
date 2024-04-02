import { Schema, model, Types } from "mongoose";
import type { IJobSeekerProfileModel } from "../interfaces/db/jobSeekerProfile";

const JobSeekerProfileSchema = new Schema<IJobSeekerProfileModel>(
  {
    user: {
      type: Types.ObjectId,
      required: true,
    },

    aadhar: {
      type: String,
      maxlength: 20,
    },

    gender: {
      type: String,
      maxlength: 20,
    },

    dob: {
      type: String,
      maxlength: 50,
    },

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
      maxlength: 10,
    },

    whatsAppNo: {
      type: String,
      maxlength: 20,
    },

    sendNotificationOnWhatsApp: {
      type: Boolean,
      default: false,
    },

    highestEducationalQualification: {
      type: String,
      maxlength: 100,
    },

    educationalDetails: [
      {
        qualification: { type: String, maxlength: 100 },

        course: { type: String, maxlength: 100 },

        branch: { type: String, maxlength: 100 },

        specialization: { type: String, maxlength: 100 },

        boardUniversityName: { type: String, maxlength: 100 },

        yearOfPassing: { type: String, maxlength: 100 },

        gradePercentage: { type: String, maxlength: 100 },

        marksheetDoc: { type: String, maxlength: 100 },
      },
    ],

    appliedJobs: [Types.ObjectId],

    appliedJobsCount: {
      type: Number,
      default: 0,
      min: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: "appliedJobs should be an integer",
        },
      ],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const JobSeekerProfile = model<IJobSeekerProfileModel>(
  "JobSeekerProfile",
  JobSeekerProfileSchema
);

export default JobSeekerProfile;
