import { useForm } from "react-hook-form";
import { GuestInfroFormData } from "../../types";
import DatePicker from "react-datepicker";
import { useSraechCOntext } from "../../context/searchContext";
import { UseAppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

const GuestnfroForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSraechCOntext();
  const { isLoggedIn } = UseAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfroFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfroFormData) => {
    search.saveSearchValue(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
      ""
    );
    navigate("/sign-in", { state: { from: location } });
  };
  const onSubmitt = (data: GuestInfroFormData) => {
    search.saveSearchValue(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
      ""
    );
    navigate(`/hotel/${hotelId}/booking`);
  };
  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmitt) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="chickin date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="checkOut date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
        </div>
        <div className="flex bg-white px-2 py-1 gap-2">
          <label htmlFor="" className="items-center flex">
            Adults:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              min={1}
              max={20}
              defaultValue={search.adultCount}
              {...(register("adultCount"),
              {
                valueasnumber: true,
              })}
            ></input>
            {errors.adultCount && (
              <span className="text-re font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </label>
          <label htmlFor="" className="items-center flex">
            childern:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              min={0}
              max={20}
              defaultValue={search.childCount}
              {...(register("childCount"),
              {
                valueasnumber: true,
              })}
            ></input>
            {errors.childCount && (
              <span className="text-re font-semibold text-sm">
                {errors.childCount.message}
              </span>
            )}
          </label>
        </div>
        {isLoggedIn ? (
          <button className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
            Book now
          </button>
        ) : (
          <button className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
            Sign in to book
          </button>
        )}
      </form>
    </div>
  );
};

export default GuestnfroForm;
