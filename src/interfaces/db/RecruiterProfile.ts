import { ObjectId, Document } from "mongoose";
import IAddress from "../core/Address";

export interface IRecruiterProfile {
  userId: ObjectId;
  companyName: string;
  designation: string;
  linkedInUrl?: string;
  website?: string;
  totalEmployees?: string;
  address?: IAddress;
  industryType?: string;
  companyType?: string;
  about?: string;
  logoUrl?: string;
  tagline?: string;
  xUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  jobPostsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IRecruiterProfileModel extends IRecruiterProfile, Document {}

export default IRecruiterProfileModel;
