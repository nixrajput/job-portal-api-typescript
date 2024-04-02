import type {
  ICurrency,
  IJobLocation,
  ISalaryRange,
  IWorkExperienceRange,
} from "../entities/job";

export interface IJobBodyData {
  title: string;
  mandatorySkills: string[];
  optionalSkills?: string[];
  salary: ISalaryRange;
  currency?: ICurrency;
  hasProbationPeriod?: boolean;
  probationDuration?: number;
  probationSalary?: ISalaryRange;
  jobType: string;
  location: IJobLocation;
  isImmediateJoining: boolean;
  preferredJoiningDate?: Date;
  workExperience: IWorkExperienceRange;
  openings: number;
  extraBenefits?: string[];
  description: string;
}
