/**
 * Define Auth Router
 */

import { Router } from "express";
import RegisterController from "./RegisterController";
import LoginController from "./LoginController";

const AuthRouter: Router = Router();

/**
 * @name RegisterController.sendRegisterOtp
 * @description Send OTP for registration.
 * @route POST /api/v1/auth/send-register-otp
 * @access Public
 */
AuthRouter.route("/send-register-otp").all(RegisterController.sendRegisterOtp);

/**
 * @name RegisterController.register
 * @description Create a new account.
 * @route POST /api/v1/auth/register
 * @access Public
 */
AuthRouter.route("/register").all(RegisterController.register);

/**
 * @name LoginController.login
 * @description Create a new account.
 * @route POST /api/v1/auth/login
 * @access Public
 */
AuthRouter.route("/login").all(LoginController.login);

export default AuthRouter;
