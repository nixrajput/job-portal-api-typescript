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
  userType: string;
  accountStatus?: string;
}

export interface IUserModel extends IUser, Document {
  password?: string;
  passwordChangedAt?: Date;
  salt: string;
  createdAt: Date;
  updatedAt: Date;

  // Methods
  generateToken(): Promise<IAuthTokenModel>;
  getToken(refreshToken?: boolean): Promise<IAuthTokenModel>;
  isProfileComplete(): Promise<boolean>;
  setPassword(password: string): Promise<void>;
  matchPassword(password: string): Promise<boolean>;
}
