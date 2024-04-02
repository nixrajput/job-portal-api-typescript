import StatusCodes from "../../constants/StatusCodes";
import StringValues from "../../constants/Strings";
import ApiError from "../../exceptions/ApiError";
import MailServiceHelper from "../../helpers/MailServiceHelper";
import MailTemplateHelper from "../../helpers/MailTemplateHelper";
import OtpServiceHelper from "../../helpers/OtpServiceHelper";
import type { IRequest, IResponse, INext } from "../../interfaces/core/express";
import Logger from "../../logger";
import User from "../../models/User";
import Validators from "../../utils/validator";

class LoginController {
  /**
   * @name sendLoginOtp
   * @description Perform send login otp action.
   * @param req IRequest
   * @param res IResponse
   * @param next INext
   * @returns Promise<any>
   */
  public static async sendLoginOtp(
    req: IRequest,
    res: IResponse,
    next: INext
  ): Promise<any> {
    if (req.method !== "POST") {
      return next(
        new ApiError(StringValues.INVALID_REQUEST_METHOD, StatusCodes.NOT_FOUND)
      );
    }

    try {
      const { email } = req.body;

      if (!email) {
        return next(
          new ApiError(StringValues.EMAIL_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (!Validators.validateEmail(email)) {
        return next(
          new ApiError(
            StringValues.INVALID_EMAIL_FORMAT,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      const _email = email?.toLowerCase().trim();

      const user = await User.findOne({ email: _email });

      if (!user) {
        return next(
          new ApiError(
            StringValues.EMAIL_NOT_REGISTERED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      // Generating OTP
      const newOtp = await OtpServiceHelper.generateOtpFromEmail(user.email);

      if (!newOtp) {
        return next(
          new ApiError(StringValues.OTP_CREATE_ERROR, StatusCodes.BAD_REQUEST)
        );
      }

      const htmlMessage = await MailTemplateHelper.getOtpEmail(
        newOtp.otp,
        user.name
      );

      if (htmlMessage) {
        await MailServiceHelper.sendEmail({
          to: user.email,
          subject: "OTP For Login",
          htmlContent: htmlMessage,
        });
      }

      res.status(StatusCodes.OK);
      return res.json({
        success: true,
        message: StringValues.SUCCESS,
        otp: newOtp.otp,
      });
    } catch (error: any) {
      const errorMessage =
        error?.message || error || StringValues.SOMETHING_WENT_WRONG;

      Logger.error(errorMessage);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return res.json({
        success: false,
        error: errorMessage,
      });
    }
  }

  /**
   * @name login
   * @description Perform login user action.
   * @param req IRequest
   * @param res IResponse
   * @param next INext
   * @returns Promise<any>
   */
  public static async login(
    req: IRequest,
    res: IResponse,
    next: INext
  ): Promise<any> {
    if (req.method !== "POST") {
      return next(
        new ApiError(StringValues.INVALID_REQUEST_METHOD, StatusCodes.NOT_FOUND)
      );
    }

    try {
      const { email, password } = req.body;

      if (!email) {
        return next(
          new ApiError(StringValues.EMAIL_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (!Validators.validateEmail(email)) {
        return next(
          new ApiError(
            StringValues.INVALID_EMAIL_FORMAT,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!password) {
        return next(
          new ApiError(StringValues.PASSWORD_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (password.length < 8) {
        return next(
          new ApiError(
            StringValues.PASSWORD_MIN_LENGTH_ERROR,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (password.length > 32) {
        return next(
          new ApiError(
            StringValues.PASSWORD_MAX_LENGTH_ERROR,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      const _email = email?.toLowerCase().trim();
      const _password = password?.trim();

      const user = await User.findOne({ email: _email });

      if (!user) {
        return next(
          new ApiError(
            StringValues.EMAIL_NOT_REGISTERED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      const isPasswordMatched = await user.matchPassword(_password);

      if (!isPasswordMatched) {
        return next(
          new ApiError(StringValues.INCORRECT_PASSWORD, StatusCodes.BAD_REQUEST)
        );
      }

      const authToken = await user.getToken();

      const resData = {
        token: authToken.token,
        expiresAt: authToken.expiresAt,
      };

      res.status(StatusCodes.OK);
      return res.json({
        success: true,
        message: StringValues.SUCCESS,
        data: resData,
      });
    } catch (error: any) {
      const errorMessage =
        error?.message || error || StringValues.SOMETHING_WENT_WRONG;

      Logger.error(errorMessage);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return res.json({
        success: false,
        error: errorMessage,
      });
    }
  }
}

export default LoginController;
