import type { ObjectId, Document } from "mongoose";

export enum JobStatus {
  Applied = "applied",
  Shortlisted = "shortlisted",
  Accepted = "accepted",
  Rejected = "rejected",
  Deleted = "deleted",
  Cancelled = "cancelled",
  Finished = "finished",
}

export interface IJobApplication {
  userId: ObjectId;
  recruiterId: ObjectId;
  jobId: ObjectId;
  status: JobStatus;
  dateOfJoining?: Date;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IJobApplicationModel extends IJobApplication, Document {}
