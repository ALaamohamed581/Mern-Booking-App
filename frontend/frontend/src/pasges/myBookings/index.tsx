import { useQuery } from "react-query";
import * as apiClient from "../../apis/api-clients";

const MyBookings = () => {
  const { data: hotels } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBooking
  );

  if (!hotels || hotels.length === 0) {
    return <MyBookingsSkelton />;
  }
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {hotels.map((hotel) => {
        const image = hotel.Images[0];
        console.log(image);
        return (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
            <div className="lg:w-full lg:h-[250px]">
              <img
                src={image}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
              <div className="text-2xl font-bold">
                {hotel.name}
                <div className="text-xs font-normal">
                  {hotel.city}, {hotel.country}
                </div>
              </div>
              {hotel.bookings.map((booking: any) => (
                <div>
                  <div>
                    <span className="font-bold mr-2">Dates: </span>
                    <span>
                      {new Date(booking.checkIn).toDateString()} -
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold mr-2">Guests:</span>
                    <span>
                      {booking.adultCount} adults, {booking.childCount} children
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyBookings;

const MyBookingsSkelton = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold"></h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
        <div className="lg:w-full lg:h-[250px]">
          <img className="w-full h-full object-cover object-center" />
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
          <div className="text-2xl font-bold">
            <div className="text-xs font-normal">
              {" "}
              <label className="text-gray-700 text-sm font-bold  flex-col flex flex-1">
                <input
                  type="text"
                  className="mt-1 rounded w-ful py-2 px-3 animate-pulse text-gray-700 bg-gray-400"
                  readOnly
                  disabled
                />
              </label>
            </div>
          </div>

          <div>
            <div>
              <span className="font-bold mr-2">
                <label className="text-gray-700 text-sm font-bold  flex-col flex flex-1">
                  <input
                    type="text"
                    className="mt-1 rounded w-ful py-2 px-3 animate-pulse text-gray-700 bg-gray-400"
                    readOnly
                    disabled
                  />
                </label>{" "}
              </span>
              <span>
                {" "}
                <label className="text-gray-700 text-sm font-bold  flex-col flex flex-1">
                  <input
                    type="text"
                    className="mt-1 rounded w-ful py-2 px-3 animate-pulse text-gray-700 bg-gray-400"
                    readOnly
                    disabled
                  />
                </label>
              </span>
            </div>
            <div>
              <span className="font-bold mr-2">
                <label className="text-gray-700 text-sm font-bold  flex-col flex flex-1">
                  <input
                    type="text"
                    className="mt-1 rounded w-ful py-2 px-3 animate-pulse text-gray-700 bg-gray-400"
                    readOnly
                    disabled
                  />
                </label>
              </span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
