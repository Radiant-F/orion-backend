import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // exclude the password field because of course
    const users = await User.find({}, "-password");
    res.json({ status: "success", data: users });
  } catch (error) {
    next(error);
  }
};
