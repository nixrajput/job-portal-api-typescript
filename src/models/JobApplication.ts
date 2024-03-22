import { Schema, model, Types } from "mongoose";
import IJobApplicationModel, {
  JobStatus,
} from "../interfaces/db/JobApplication";

const JobAppLicationSchema = new Schema<IJobApplicationModel>(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },

    recruiterId: {
      type: Types.ObjectId,
      required: true,
    },

    jobId: {
      type: Types.ObjectId,
      required: true,
    },

    status: {
      type: String,
      enum: JobStatus,
      default: JobStatus.Applied,
      required: true,
    },

    dateOfJoining: {
      type: Date,
    },

    remarks: {
      type: String,
      validate: {
        validator: function (v: string) {
          return v.split(" ").filter((ele) => ele != "").length <= 1000;
        },
        msg: "Remarks should not be greater than 1000 words",
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// JobAppLicationSchema.virtual("candidate", {
//   ref: "CandidateProfile",
//   localField: "userId",
//   foreignField: "user",
//   justOne: true,
// });

JobAppLicationSchema.virtual("employer", {
  ref: "CompanyProfile",
  localField: "recruiterId",
  foreignField: "user",
  justOne: true,
});

JobAppLicationSchema.virtual("job", {
  ref: "Job",
  localField: "jobId",
  foreignField: "_id",
  justOne: true,
});

JobAppLicationSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

JobAppLicationSchema.index({
  jobId: "text",
  userId: "text",
  recruiterId: "text",
});

const JobApplication = model<IJobApplicationModel>(
  "JobApplication",
  JobAppLicationSchema
);

export default JobApplication;
