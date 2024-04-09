import type { IAddress } from "../../interfaces/core/address";
import type { ObjectId, Document } from "mongoose";

export interface IEducationalDetails {
  qualification: string;
  course: string;
  branch: string;
  specialization: string;
  boardUniversityName: string;
  yearOfPassing: string;
  gradePercentage: string;
  marksheetDoc: string;
}

export interface IJobSeekerProfile {
  userId: ObjectId;
  gender: string;
  dob: string;
  address: IAddress;
  highestEducationalQualification: string;
  educationalDetails: IEducationalDetails;
  aadhar?: string;
}

export interface IJobSeekerProfileModel extends IJobSeekerProfile, Document {
  appliedJobs: ObjectId[];
  appliedJobsCount: number;
  createdAt: Date;
  updatedAt: Date;
}
