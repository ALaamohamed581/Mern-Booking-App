import { HotelType } from "../../../../../backend/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNight: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNight,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-spacing-3 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2 ">
        Location:
        {hotel ? (
          <div className="font-bold">{`${hotel.name},${hotel.city},${hotel.country}`}</div>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-between">
        <div>
          Check-in <div className="font-bold">{checkIn.toDateString()}</div>
        </div>
        <div>
          Check-out <div className="font-bold">{checkOut.toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total Length of stay:
        <div className="font-bold ">{numberOfNight} Nights</div>
      </div>
      <div>
        Guests{" "}
        <div className="font-bold">
          {adultCount} adults & childern {childCount}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;

export const BookingDetailsSummarySkekltion = () => {
  return (
    <div className="grid gap-4 rounded-lg border border-spacing-3 p-5  animate-pulse">
      <h2 className="text-xl font-bold"></h2>
      <div className="border-b py-2 ">
        {" "}
        <input
          readOnly
          type="text"
          className="mt-1 rounded w-ful  px-3 text-gray-700 bg-gray-400"
          disabled
        ></input>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="font-bold">
            <input
              readOnly
              type="text"
              className="mt-1 rounded  w-[75%]  px-3 text-gray-700 bg-gray-400"
              disabled
            ></input>
          </div>
        </div>
        <div>
          <div className="font-bold">
            {" "}
            <input
              readOnly
              type="text"
              className="mt-1 rounded w-[75%]   px-3 text-gray-700 bg-gray-400"
              disabled
            ></input>{" "}
          </div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        <div className="font-bold ">
          <input
            readOnly
            type="text"
            className="mt-1 rounded w-ful  px-3 text-gray-700 bg-gray-400"
            disabled
          ></input>
        </div>
      </div>
      <div>
        <div className="font-bold">
          {" "}
          <input
            readOnly
            type="text"
            className="mt-1 rounded w-ful  px-3 text-gray-700 bg-gray-400"
            disabled
          ></input>
        </div>
      </div>
    </div>
  );
};
