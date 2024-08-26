import { useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import * as apiClient from "../../apis/api-clients";
import { HotelType } from "../../../../../backend/src/shared/sharedTypes/HotelTypes";
import { useState } from "react";

const MyHotels = () => {
  const navigate = useNavigate();
  const quertClient = useQueryClient();
  const [page, setPage] = useState(1);

  const fetchMyHotels = async () => {
    return await apiClient.fetchMyHotels(page);
  };
  const { data: hotelData } = useQuery(
    ["fetchMyHotels", page],
    fetchMyHotels,

    {
      onSuccess: async () => {
        await quertClient.invalidateQueries("fetchMyHotels");
      },
    }
  );

  if (!hotelData) {
    return <span>no hotel found</span>;
  }

  const prevpag = () => {
    navigate(`?page=${page}`, {
      replace: true,
    });
    setPage((current) => current - 1);
  };
  const next = () => {
    setPage((current) => current + 1);
    navigate(`?page=${page}`, {
      replace: true,
    });
  };
  const gotTOPAgeNumber = (pagnumber: number) => {
    setPage(pagnumber);
    navigate(`?page=${page}`, {
      replace: true,
    });
  };
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/addhotel"
          className="flex bg-blue-600 text-white  text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.data.map((hotel: HotelType) => (
          <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
            <h2 className="text-2xl">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city},{hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />
                {hotel.pricePerNight} price per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults,{hotel.childCount} childern
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                className="flex bg-blue-600 text-white  text-xl font-bold p-2 hover:bg-blue-500"
                to={`/edit-hotel/${hotel._id}`}
              >
                view Details
              </Link>
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-around content-center align-middle text-center">
        <button
          onClick={prevpag}
          className="bg-blue-600 text-white rounded p-2"
        >
          previos
        </button>
        <span className="flex justify-between text-center gap-5">
          {[1, 2, 3, 4, 5 /*TODO ENRESULT*/].map((pagnumber) => (
            <button onClick={() => gotTOPAgeNumber(pagnumber)}>
              {pagnumber}
            </button>
          ))}
        </span>
        <button onClick={next} className="bg-blue-600 text-white rounded p-3">
          next
        </button>
      </div>
    </div>
  );
};
export default MyHotels;
