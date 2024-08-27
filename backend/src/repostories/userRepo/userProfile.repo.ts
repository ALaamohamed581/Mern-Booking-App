import { date } from "joi";
import { UserType, ReposnObg, CustomFile } from "../../../types";
import User from "../../models/usser"; // Corrected import path

export const uploadImage = async (
  image: Express.Multer.File,
  userId: string
) => {
  try {
    const exsistingUser = await User.findOneAndUpdate(
      { _id: userId },
      { image: image }
    );
    if (!exsistingUser || !image) {
      return {
        success: false,
        code: 400,
        message: "invalid userId or Image",
      };
    }
    const userObject = exsistingUser.toObject() as UserType;
    delete userObject.password;
    return {
      data: [userObject],
      success: true,
      code: 200,
      message: "user image has been uploaded",
    };
  } catch (err) {
    return {
      success: false,
      code: 500,
      message: "internal server error",
    };
  }
};
