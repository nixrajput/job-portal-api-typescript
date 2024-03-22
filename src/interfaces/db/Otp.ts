import { ObjectId, Document } from "mongoose";

export interface IOtp {
  otp: string;
  expiresAt: Date;
  email?: string;
  phone?: string;
  userId?: ObjectId;
  isUsed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IOtpModel extends IOtp, Document {
  isExpired(): Promise<boolean>;
  isAleadyUsed(): Promise<boolean>;
}

export default IOtpModel;
