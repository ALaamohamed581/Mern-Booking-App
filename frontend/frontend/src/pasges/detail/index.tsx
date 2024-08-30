import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../../apis/api-clients";
import { AiFillStar } from "react-icons/ai";
import GuestnfroForm from "../../forms/guestInfor";
// import Slider from "../../components/slider";

const Details = () => {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    { enabled: !!hotelId }
  );
  if (hotel) {
    return (
      <div className="space-y-6">
        <div>
          <span className="flex items-center al">
            {" "}
            {hotel ? (
              Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))
            ) : (
              <></>
            )}
            <h1 className="text-3xl font-bold">{hotel ? hotel.name : ""}</h1>
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
          {/* <Slider images={hotel.Images} /> */}
          {hotel.Images.map((img) => (
            <div className="h-[300px]">
              <img
                src={img}
                alt={hotel.name}
                className="rounded-md w-full h-full object-contain object-center "
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {hotel.facilities.map((facility) => (
            <div className="border border-slate-300 rounded-sm p-3 sm:hover:shadow-lg hover:duration-500 sm:text-center sm:w-[50%] md:w-[100%] text-start mx-0 sm:mx-auto  ">
              {facility}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
          <div className="whitespace-pre-line">{hotel.description}</div>
          <div className="h-fit">
            {
              <GuestnfroForm
                hotelId={hotel._id}
                pricePerNight={hotel.pricePerNight}
              />
            }
          </div>
        </div>
      </div>
    );
  }
};
export default Details;
