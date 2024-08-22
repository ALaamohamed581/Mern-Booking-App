import { UserType, ReposnObg } from "../../types";
import User from "../models/usser"; // Corrected import path
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Password from "antd/es/input/Password";
import { SingToken } from "../utuls/jwt";
import { comparePassword } from "../utuls/comparePassword";

export const createUser = async (user: UserType): Promise<ReposnObg | null> => {
  try {
    const existingObject = (await User.findOne({
      email: user.email,
    })) as UserType | null;
    if (existingObject) {
      if (!existingObject.isActivated) {
        return {
          success: false,
          code: 400,
          message: "usr exists but not activated pls activated your email",
        };
      }

      return {
        success: false,
        code: 400,
        message: "User already exists",
      };
    }

    // If user does not exist, create a new user

    user.password = await bcrypt.hash(user.password!, 10);
    const newUser = new User(user);
    await newUser.save();
    //TODO sen email witha n activation link to user

    const token = SingToken(newUser.id);

    const userObject = newUser.toObject() as UserType;
    delete userObject.password;
    return {
      data: [userObject, token],
      success: true,
      code: 201,
      message:
        "An email with an activation link has been sent to your email account.",
    };
  } catch (error: any) {
    console.error("Error registering user:", error);
    return null;
  }
};

export const signIn = async (email: string, Password: string) => {
  if (!email || !Password) {
    return {
      success: false,
      code: 404,
      message: "please provide an email and passsword",
    };
  }
  const exsisingUser = await User.findOne({ email: email });
  if (!exsisingUser) {
    return {
      success: false,
      code: 404,
      message: "wrong email",
    };
  }

  const comaprePaasord = await comparePassword(
    Password,
    exsisingUser?.password as string
  );
  if (!comaprePaasord) {
    return {
      success: false,
      code: 401,
      message: "email or password are wrong",
    };
  }
  const token = SingToken(exsisingUser.id);

  const userObject = exsisingUser.toObject() as UserType;

  delete userObject.password;
  return {
    data: [userObject, token],
    success: true,
    code: 200,
    message: "welcome back",
  };
};
