/**
 * Define Auth Router
 */

import { Router } from "express";
import RegisterController from "./RegisterController";
import LoginController from "./LoginController";
import UserService from "../../services/UserService";
import ProfileService from "services/ProfileService";

const AuthRouter: Router = Router();

const userSvc = new UserService();
const profileSvc = new ProfileService();
const registerCtlr = new RegisterController(userSvc, profileSvc);
const loginCtlr = new LoginController(userSvc);

/**
 * @name RegisterController.sendRegisterOtp
 * @description Send OTP for registration.
 * @route POST /api/v1/auth/send-register-otp
 * @access Public
 */
AuthRouter.route("/send-register-otp").all(registerCtlr.sendRegisterOtp);

/**
 * @name RegisterController.register
 * @description Create a new account.
 * @route POST /api/v1/auth/register
 * @access Public
 */
AuthRouter.route("/register").all(registerCtlr.register);

/**
 * @name LoginController.login
 * @description Create a new account.
 * @route POST /api/v1/auth/login
 * @access Public
 */
AuthRouter.route("/login").all(loginCtlr.login);

export default AuthRouter;
