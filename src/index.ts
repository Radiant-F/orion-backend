import express, { RequestHandler } from "express";
import mongoose from "mongoose";
import User from "./models/User";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("connected to MongoDB :3"))
  .catch((err) => console.error("ruh roh:", err));

// signup handler with explicit type annotation because the new typescript(?) is being annoying
const signupHandler: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password, confirm_password } = req.body;

    if (!name || !email || !password || !confirm_password) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }

    // for name, only alphabets allowed
    if (!/^[A-Za-z]+$/.test(name)) {
      res
        .status(400)
        .json({ error: "Name must contain only alphabets (a-z, A-Z)." });
      return;
    }

    // email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      res.status(400).json({ error: "Invalid email format." });
      return;
    }

    // password
    if (password.length < 6) {
      res
        .status(400)
        .json({ error: "Password must be at least 6 characters long." });
      return;
    }
    if (password !== confirm_password) {
      res
        .status(400)
        .json({ error: "Password and confirm_password do not match." });
      return;
    }

    // check registered email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "Email is already registered." });
      return;
    }

    // the new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    next(error);
  }
};

app.post("/signup", signupHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
