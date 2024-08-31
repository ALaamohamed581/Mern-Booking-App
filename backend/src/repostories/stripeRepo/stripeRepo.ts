import Hotel from "../../models/hotel";
import User from "../../models/usser";

export const pay = async (hotelId: string, userId: string) => {
  try {
    if (!hotelId) {
      return {
        success: false,
        code: 401,
        message: "please provide a htoel Id",
      };
    }

    const exstingHotel = await Hotel.findOne({ _id: hotelId });

    if (!exstingHotel)
      return {
        success: false,
        code: 404,
        message: "hotel  not found",
      };

    const exstinguser = await User.findOne({ _id: userId });

    if (!exstinguser)
      return {
        success: false,
        code: 404,
        message: "user not found",
      };
    return {
      data: [exstingHotel],
      success: true,
      code: 201,
      message: "hotel data has been updated",
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      data: [err],
      success: false,
      code: 500,
      message: "somthing went wrong",
    };
  }
};
