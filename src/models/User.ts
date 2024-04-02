import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { IAuthTokenModel } from "../interfaces/db/authToken";
import type { IUserModel } from "../interfaces/db/user";
import { UserStatus, UserType } from "../interfaces/db/user";
import LocalConfig from "../config/LocalConfig";
import StringValues from "../constants/Strings";
import Logger from "../logger";
import AuthToken from "./AuthToken";
import TokenServiceHelper from "../helpers/TokenServiceHelper";

const UserSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return v.length <= 100;
        },
        msg: "Name length should not be greater than 100 characters",
      },
    },

    nameChangedAt: {
      type: Date,
    },

    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return v.length <= 100;
        },
        msg: "Email length should not be greater than 100 characters",
      },
    },

    emailChangedAt: {
      type: Date,
    },

    countryCode: {
      type: String,
    },

    phone: {
      type: String,
      validate: {
        validator: function (v: string) {
          return v.length === 10;
        },
        msg: "Phone number length should be equal to 10 characters",
      },
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    phoneChangedAt: {
      type: Date,
    },

    whatsAppNo: {
      type: String,
      validate: {
        validator: function (v: string) {
          return v.length === 10;
        },
        msg: "Phone number length should be equal to 10 characters",
      },
    },

    password: {
      type: String,
      validate: [
        {
          validator: function (v: string) {
            return v.length >= 8;
          },
          msg: "Password length should be greater than or equal to 8 characters",
        },
        {
          validator: function (v: string) {
            return v.length <= 32;
          },
          msg: "Password length should not be greater than 32 characters",
        },
      ],
    },

    passwordChangedAt: {
      type: Date,
    },

    accountStatus: {
      type: String,
      enum: UserStatus,
      default: UserStatus.active,
    },

    userType: {
      type: String,
      enum: UserType,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

/**
 * @name pre-save
 * @description Update user's password if modified
 * @returns Promise<void>
 */
UserSchema.pre("save", async function (next): Promise<void> {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 16);
});

/**
 * @name generateToken
 * @description Generate user's auth token
 * @returns Promise<IAuthTokenModel>
 */
UserSchema.methods.generateToken = async function (): Promise<IAuthTokenModel> {
  const jwtSecret = LocalConfig.getConfig().JWT_SECRET!;
  const jwtExpiresIn = LocalConfig.getConfig().JWT_EXPIRES_IN! || 2592000000;

  if (!jwtSecret) throw new Error(StringValues.JWT_SECRET_NOT_FOUND);

  const token = jwt.sign({ id: this._id }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });

  if (!token) {
    Logger.error(`JwtError :: An error occurred while creating JwtToken`);
    throw new Error(StringValues.JWT_TOKEN_CREATE_ERROR);
  }

  const decodedData = jwt.decode(token);

  if (!decodedData || typeof decodedData === "string") {
    Logger.error(`JwtError :: An error occurred while decoding JwtToken`);
    throw new Error(StringValues.JWT_TOKEN_CREATE_ERROR);
  }

  const authToken = await AuthToken.create({
    token: token,
    userId: this._id,
    expiresAt: decodedData.exp,
  });

  if (!authToken) {
    Logger.error(`AuthToken :: An error occurred while creating AuthToken`);
    throw new Error(StringValues.JWT_TOKEN_CREATE_ERROR);
  }

  Logger.info(`AuthToken :: created`);
  return authToken;
};

/**
 * @name getToken
 * @description Get user's auth token
 * @returns Promise<IAuthTokenModel>
 */
UserSchema.methods.getToken = async function (): Promise<IAuthTokenModel> {
  const authToken = await AuthToken.findOne({ userId: this._id });

  if (!authToken) {
    const newToken = await this.generateToken();
    return newToken;
  }

  const isExpired = await TokenServiceHelper.isTokenExpired(
    authToken.expiresAt
  );

  if (isExpired) {
    await AuthToken.deleteOne({ userId: this._id });

    const newToken = await this.generateToken();
    return newToken;
  }

  return authToken;
};

/**
 * @name isProfileComplete
 * @description Check if user's profile is complete
 * @returns Promise<boolean>
 */
UserSchema.methods.isProfileComplete = async function (): Promise<boolean> {
  if (!this.fullName) return false;

  if (!this.email) return false;

  if (!this.username) return false;

  return true;
};

/**
 * @name matchPassword
 * @description Check if user's password is correct
 * @returns Promise<boolean>
 */
UserSchema.methods.matchPassword = async function (
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

UserSchema.index({ name: "text", email: "text" });
const User = model<IUserModel>("User", UserSchema);

export default User;
