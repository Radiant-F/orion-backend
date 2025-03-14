// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => /^[A-Za-z]+$/.test(value),
      message: "Name must contain only alphabets (a-z, A-Z).",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure each email is unique
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long."],
  },
});

export default mongoose.model<IUser>("User", UserSchema);
