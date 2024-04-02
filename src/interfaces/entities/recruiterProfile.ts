import type { ObjectId, Document } from "mongoose";
import type { IAddress } from "../core/address";

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
}

export interface IRecruiterProfileModel extends IRecruiterProfile, Document {
  jobPostsCount: number;
  createdAt: Date;
  updatedAt: Date;
}
