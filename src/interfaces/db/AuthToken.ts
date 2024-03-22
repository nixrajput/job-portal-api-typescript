import { ObjectId, Document } from "mongoose";

export interface IAuthToken {
  userId: ObjectId;
  token: string;
  expiresAt: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IAuthTokenModel extends IAuthToken, Document {
  isExpired(): Promise<boolean>;
}

export default IAuthTokenModel;
