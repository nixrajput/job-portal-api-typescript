import type { ObjectId, Document } from "mongoose";

export interface IAuthToken {
  userId: ObjectId;
  token: string;
  expiresAt: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthTokenModel extends IAuthToken, Document {
  isExpired(): Promise<boolean>;
}
