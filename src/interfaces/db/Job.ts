import { ObjectId, Document } from "mongoose";

export interface IJobLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export enum EmploymentType {
  FullTime = "full-time",
  PartTime = "part-time",
  Internship = "internship",
}

export enum ShiftType {}

export interface IJob {
  userId: ObjectId;
  title: string;
  description: string;
  openings: number;
  experienceRequired: string;
  keySkills?: string[];
  educationRequired?: string;
  salary?: string | number;
  currency?: string;
  category?: string;
  industryType?: string;
  department?: string;
  roleCategory?: string;
  location: IJobLocation;
  employmentType: EmploymentType;
  applicantsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IJobModel extends IJob, Document {}

export default IJobModel;
