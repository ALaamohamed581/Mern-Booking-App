import { HotelType } from "../../../types";
import Hotel from "../../models/hotel";

export const create = async (filtriedObg: HotelType) => {
  try {
    console.log(filtriedObg);
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
