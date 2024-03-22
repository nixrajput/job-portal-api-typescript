import { Document } from "mongoose";
import IAuthTokenModel from "./AuthToken";

export enum UserStatus {
  active = "active",
  inactive = "inactive",
  deactivated = "deactivated",
  suspended = "suspended",
  blocked = "blocked",
  deleted = "deleted",
  banned = "banned",
  reported = "reported",
  pending = "pending",
  withheld = "withheld",
  restricted = "restricted",
}

export enum UserType {
  JobSeeker = "job-seeker",
  Recruiter = "recruiter",
}

export interface IUser {
  name: string;
  nameChangedAt: Date;
  email: string;
  isEmailVerified: boolean;
  emailChangedAt: Date;
  countryCode: string;
  phone: string;
  isPhoneVerified: boolean;
  phoneChangedAt: Date;
  whatsAppNo?: string;
  password: string;
  passwordChangedAt: Date;
  accountStatus: UserStatus;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserModel extends IUser, Document {
  generateToken(): Promise<IAuthTokenModel>;
  getToken(): Promise<IAuthTokenModel>;
  isProfileComplete(): Promise<boolean>;
  matchPassword(password: string): Promise<boolean>;
}

export default IUserModel;
