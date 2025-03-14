import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, confirm_password } = req.body;

    if (!name || !email || !password || !confirm_password) {
      res
        .status(400)
        .json({ status: "error", message: "all fields are required." });
      return;
    }

    // name: only alphabets
    if (!/^[A-Za-z]+$/.test(name)) {
      res.status(400).json({
        status: "error",
        message: "name must contain only alphabets (a-z, A-Z).",
      });
      return;
    }

    // email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      res
        .status(400)
        .json({ status: "error", message: "invalid email format." });
      return;
    }

    // password
    if (password.length < 6) {
      res.status(400).json({
        status: "error",
        message: "password must be at least 6 characters long.",
      });
      return;
    }
    if (password !== confirm_password) {
      res.status(400).json({
        status: "error",
        message: "password and confirm_password do not match.",
      });
      return;
    }

    // check for registered email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ status: "error", message: "email is already registered." });
      return;
    }

    // hash the thing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "user has been successfully signed up.",
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ status: "error", message: "email and password are required." });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      res
        .status(400)
        .json({ status: "error", message: "invalid email format." });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        status: "error",
        message: "password must be at least 6 characters long.",
      });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(401)
        .json({ status: "error", message: "invalid credentials." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(401)
        .json({ status: "error", message: "invalid credentials." });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "some-secret-key",
      { expiresIn: "1h" }
    );

    res.json({
      status: "success",
      message: "sign in success.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
