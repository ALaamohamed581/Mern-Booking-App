import { HotelType } from "../../../types";
import { filterObj } from "../../helpers/filterobj";
import Hotel from "../../models/hotel";
import User from "../../models/usser";
import APIFeatures from "../../helpers/Apiprocceing";
import { date } from "joi";
export const create = async (filtriedObg: HotelType) => {
  try {
    const newHotel = await Hotel.create(filtriedObg);
    return {
      data: [newHotel],
      success: true,
      code: 200,
      message: "new hotel has been added",
    };
  } catch (err) {
    return {
      success: false,
      code: 500,
      message: "internal server error",
    };
  }
};

export const list = async (userId: string, q: any) => {
  try {
    if (!userId) {
      return {
        success: false,
        code: 401,
        message: "please sign or register",
      };
    }

    const exsitiongUser = await User.findOne({ _id: userId });
    if (!exsitiongUser)
      return {
        success: false,
        code: 404,
        message: "customer  not found",
      };

    const proceecedHotesl = new APIFeatures(Hotel.find(), q)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    console.log(Hotel.find(), q);

    const hotels = await proceecedHotesl.query;
    console.log(userId);

    return {
      data: [hotels],
      success: true,
      code: 200,
      message: "here is  a list of hotels",
    };
  } catch (err) {
    console.log(err);
    return {
      data: [err],
      success: false,
      code: 500,
      message: "somthing went wrong",
    };
  }
};
