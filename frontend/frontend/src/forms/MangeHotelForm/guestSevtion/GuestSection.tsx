import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../../types";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className=" flex rounded-md  bg-gray-400  gap-10 mb-5">
      <label className="flex flex-col flex-1 p-5 font-semibold">
        <span>Adult count</span>
        <input
          type="number"
          {...register("adultCount", {
            required: "this field is required",
          })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500 text-sm">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
      <label className="flex flex-col flex-1 p-5 font-semibold">
        <span>Child count</span>
        <input type="number" {...register("childCount")} min={0} />
        {errors.pricePerNight && (
          <span className="text-red-500 text-sm">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default GuestSection;
