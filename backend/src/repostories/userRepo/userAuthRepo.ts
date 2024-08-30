import { UserType, ReposnObg } from "../../../types";
import User from "../../models/usser"; // Corrected import path
import bcrypt from "bcrypt";
import { SingToken } from "../../utuls/jwt";
import { comparePassword } from "../../utuls/comparePassword";

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
  } catch (err) {
    return {
      success: false,
      code: 500,
      message: "internal server error",
    };
  }
};

export const signIn = async (email: string, Password: string) => {
  try {
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
  } catch (err) {
    return {
      success: false,
      code: 500,
      message: "internal server error",
    };
  }
};

export const signOut = async () => {
  try {
    const token = "";
    return {
      data: [, token],
      success: true,
      code: 200,
      message: "you have sigend out",
    };
  } catch (err) {
    return {
      success: false,
      code: 500,
      message: "internal server error",
    };
  }
};
