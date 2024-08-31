import Hotel from "../../models/hotel";
import { bookingsType } from "../../shared/sharedTypes/bookingType";
export const create = async (
  bookingData: bookingsType,
  userId: string,
  hotelId: string
) => {
  try {
    bookingData.userId = userId;

    const hotel = await Hotel.findByIdAndUpdate(hotelId, {
      $push: { bookings: bookingData },
    });
    if (!hotel) {
      return {
        success: false,
        code: 401,
        message: "please provde a htoel Id",
      };
    }
    return {
      data: [hotel],
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
