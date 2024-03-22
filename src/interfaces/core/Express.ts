import { NextFunction, Request, Response } from "express";
import IUserModel from "../db/User";

/**
 * Define custom Express's Request interface
 */
export interface IRequest extends Request {
  currentUser?: IUserModel;
}

/**
 * Define custom Express's Response interface
 */
export interface IResponse extends Response {}

/**
 * Define custom Express's NextFunction interface
 */
export interface INext extends NextFunction {}
