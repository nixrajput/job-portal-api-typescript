import type { ObjectId, Document } from "mongoose";

export enum JobType {
  Remote = "remote",
  InOffice = "in-office",
  Hybrid = "hybrid",
}

export interface IJobLocation {
  city: string;
  state: string;
  country: string;
}

export interface ISalaryRange {
  minSalary: number;
  maxSalary: number;
}

export interface IWorkExperienceRange {
  minExperience: number;
  maxExperience: number;
}

export interface ICurrency {
  symbol: string;
  code: string;
}

export interface IJob {
  recruiterId: ObjectId;
  title: string;
  mandatorySkills: string[];
  optionalSkills?: string[];
  salary: ISalaryRange;
  currency: ICurrency;
  hasProbationPeriod: boolean;
  probationDuration?: number;
  probationSalary?: ISalaryRange;
  jobType: string;
  location: IJobLocation;
  preferredJoiningDate?: Date;
  isImmediateJoining: boolean;
  workExperience: IWorkExperienceRange;
  openings: number;
  extraBenefits?: string[];
  description: string;

  // category?: string;
  // industryType?: string;
  // department?: string;
  // roleCategory?: string;
}

export interface IJobModel extends IJob, Document {
  applicants: number;
  createdAt: Date;
  updatedAt: Date;
}
