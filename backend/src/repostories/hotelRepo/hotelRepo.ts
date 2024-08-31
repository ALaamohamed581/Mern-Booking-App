import { HotelType, ReposnObg } from "../../../types";
import Hotel from "../../models/hotel";
import APIFeatures from "../../helpers/Apiprocceing";
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
    const total = await Hotel.countDocuments();
    const proceecedHotesl = new APIFeatures(Hotel.find(), q)
      .filter()
      .sort()
      .limitFields()
      .paginate(total);

    const hotels = await proceecedHotesl.query;
    return {
      data: [hotels],
      success: true,
      code: 200,
      message: "here is  a list of hotels",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      code: 500,
      message: "somthing went wrong",
    };
  }
};

export const update = async (filterObj: any, hotelId: string) => {
  try {
    if (!hotelId) {
      return {
        success: false,
        code: 401,
        message: "please provde a htoel Id",
      };
    }
    filterObj.lastUpdate = new Date();
    const exstingHotel = await Hotel.findOneAndUpdate(
      { _id: hotelId },
      filterObj,
      { new: true }
    );

    if (!exstingHotel)
      return {
        success: false,
        code: 404,
        message: "hotel  not found",
      };
    return {
      data: [exstingHotel],
      success: true,
      code: 201,
      message: "hotel data has been updated",
    };
  } catch (err) {
    return {
      data: [err],
      success: false,
      code: 500,
      message: "somthing went wrong",
    };
  }
};
export const search = async (q: any) => {
  try {
    // if (!hotelId) {
    //   return {
    //     success: false,
    //     code: 401,
    //     message: "please provde a htoel Id",
    //   };
    // }
    const total = await Hotel.countDocuments();
    let x = new APIFeatures(Hotel.find(), q).filter();

    x = await x.query;
    let lettotoalNumberOFresults = { ...x };
    const keysArray = Object.keys(lettotoalNumberOFresults);

    let hotels = new APIFeatures(Hotel.find(), q)
      .filter()
      .sort()
      .limitFields()
      .paginate(keysArray.length);
    const paginatedInfo = hotels.getTotal();
    // if (!exstingHotel)
    //   return {
    //     success: false,
    //     code: 404,
    //     message: "hotel  not found",
    //   };
    hotels = await hotels.query;

    return <ReposnObg>{
      data: [
        hotels,
        {
          pagnation: keysArray.length,
          page: paginatedInfo.pageNumber,
          pages: paginatedInfo.pages,
        },
      ],
      success: true,
      code: 200,
      message: "here is  a list of hotels",
    };
  } catch (err) {
    return {
      data: [err],
      success: false,
      code: 500,
      message: "somthing went wrong",
    };
  }
};
export const get = async (hotelId: string) => {
  try {
    if (!hotelId) {
      return {
        success: false,
        code: 401,
        message: "please provde a htoel Id",
      };
    }
    const exstingHotel = await Hotel.findOne({ _id: hotelId }).lean();

    if (!exstingHotel)
      return {
        success: false,
        code: 404,
        message: "hotel  not found",
      };
    return {
      data: [exstingHotel],
      success: true,
      code: 200,
      message: "here is  a list of hotels",
    };
  } catch (err) {
    return {
      data: [err],
      success: false,
      code: 500,
      message: "somthing went wrong",
    };
  }
};
