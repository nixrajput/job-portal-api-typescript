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

export interface IJobSeekerProfileProfile {
  user: ObjectId;
  aadhar: string;
  gender: string;
  dob: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  whatsAppNo: string;
  sendNotificationOnWhatsApp: boolean;
  highestEducationalQualification: string;
  educationalDetails: IEducationalDetails;
  appliedJobs: ObjectId[];
  appliedJobsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IJobSeekerProfileModel
  extends IJobSeekerProfileProfile,
    Document {}
