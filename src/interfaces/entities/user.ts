import type { Document } from "mongoose";
import type { IAuthTokenModel } from "./authToken";

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
  nameChangedAt?: Date;
  email: string;
  isEmailVerified?: boolean;
  emailChangedAt?: Date;
  countryCode?: string;
  phone: string;
  isPhoneVerified?: boolean;
  phoneChangedAt?: Date;
  whatsAppNo?: string;
  password: string;
  passwordChangedAt?: Date;
  userType: string;
  accountStatus?: string;
}

export interface IUserModel extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;

  // Methods
  generateToken(): Promise<IAuthTokenModel>;
  getToken(): Promise<IAuthTokenModel>;
  isProfileComplete(): Promise<boolean>;
  matchPassword(password: string): Promise<boolean>;
}
