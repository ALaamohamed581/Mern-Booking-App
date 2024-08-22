import mongoose from "mongoose";
import { UserType } from "../../types";

const userScehma = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: Object, default: {} },
  isActivated: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model<UserType>("User", userScehma);
export default User;
