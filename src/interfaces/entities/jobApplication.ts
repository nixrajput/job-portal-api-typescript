import type { ObjectId, Document } from "mongoose";

export interface IJobApplication {
  userId: ObjectId;
  recruiterId: ObjectId;
  jobId: ObjectId;
  status: string;
  dateOfJoining?: Date;
  remarks?: string;
}

export interface IJobApplicationModel extends IJobApplication, Document {
  createdAt: Date;
  updatedAt: Date;
}
