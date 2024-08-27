import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../../types";
import { hotelTypes } from "../../../../config/hotel-options-config";

const TypesSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="2xl fornt-bold mb-3 ">Type</h2>
      <div
        className="grid grid-cols-5 gap-5
      mb-2 text-center"
      >
        {hotelTypes.map((type) => (
          <label
            key={crypto.randomUUID()}
            className={
              typeWatch == type
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-1 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-1 font-semibold"
            }
          >
            <input
              className="hidden"
              type="radio"
              value={type}
              {...register("type", {
                required: "this field is required",
              })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypesSection;
