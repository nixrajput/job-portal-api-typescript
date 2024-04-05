import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import type { IAuthTokenModel } from "../interfaces/entities/authToken";
import type { IUserModel } from "../interfaces/entities/user";
import { UserStatus, UserType } from "../interfaces/entities/user";
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
    },

    passwordChangedAt: {
      type: Date,
    },

    salt: {
      type: String,
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

// /**
//  * @name pre-save
//  * @description Update user's password if modified
//  * @returns Promise<void>
//  */
// UserSchema.pre("save", async function (next): Promise<void> {
//   if (!this.isModified("password")) {
//     next();
//   }

//   await this.setPassword(this.password);
// });

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
 * @description Set user's password
 * @returns Promise<boolean>
 */
UserSchema.methods.setPassword = async function (
  password: string
): Promise<void> {
  const _currentDateTime = new Date(Date.now());

  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations,
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  this.passwordChangedAt = _currentDateTime;

  await this.save();
};

/**
 * @name matchPassword
 * @description Check if user's password is correct
 * @returns Promise<boolean>
 */
UserSchema.methods.matchPassword = async function (
  password: string
): Promise<boolean> {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return this.password === hash;
};

UserSchema.index({ name: "text", email: "text" });
const User = model<IUserModel>("User", UserSchema);

export default User;
