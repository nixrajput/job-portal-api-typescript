/**
 * Define User Service Class
 */

import type { IUser, IUserModel } from "../interfaces/entities/user";
import Logger from "../logger";
import User from "../models/User";

class UserService {
  // Create User Service
  public createExc = async (_user: IUser): Promise<IUserModel> => {
    try {
      const _currentDateTime = Date.now();

      const user = await User.create({
        userType: _user.userType,
        name: _user.name,
        nameChangedAt: _currentDateTime,
        email: _user.email,
        isEmailVerified: true,
        emailChangedAt: _currentDateTime,
        countryCode: _user.countryCode?.trim(),
        phone: _user.phone,
        phoneChangedAt: _currentDateTime,
        whatsAppNo: _user.whatsAppNo?.trim(),
        password: _user.password?.trim(),
        passwordChangedAt: _currentDateTime,
      });

      return Promise.resolve(user);
    } catch (error) {
      Logger.error(
        "UserService: createExc",
        "errorInfo:" + JSON.stringify(error)
      );
      return Promise.reject(error);
    }
  };
}

export default UserService;
