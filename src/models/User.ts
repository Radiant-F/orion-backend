import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
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
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format."],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = model<IUser>("User", UserSchema);

export default User;
