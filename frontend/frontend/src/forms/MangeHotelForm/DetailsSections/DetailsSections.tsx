import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../../types";

const DetailsSections = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label htmlFor="frist" className="text-gray-700 text-sm font-bold flex-1">
        {" "}
        Name
        <input
          type="text"
          id="frist"
          className="bg-slate-300 border rounded w-full py-1 px-2 font-normal "
          {...register("name", {
            required: "this field is required",
          })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-4">
        <label
          htmlFor="frist"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          {" "}
          City
          <input
            type="text"
            id="frist"
            className="bg-slate-300 border rounded w-full py-1 px-2 font-normal "
            {...register("city", {
              required: "this field is required",
            })}
          />
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city.message}</span>
          )}
        </label>
        <label
          htmlFor="frist"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          {" "}
          Country
          <input
            type="text"
            id="country"
            className="bg-slate-300 border rounded w-full py-1 px-2 font-normal "
            {...register("country", {
              required: "this field is required",
            })}
          />
          {errors.country && (
            <span className="text-red-500 text-sm">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label htmlFor="frist" className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="bg-slate-300 border rounded w-full py-1 px-2 font-normal "
          {...register("description", {
            required: "this field is required",
          })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </label>
      <label
        htmlFor="frist"
        className="text-gray-700 text-sm font-bold max-w-[50%]"
      >
        price/night
        <input
          type="number"
          min={1}
          className="bg-slate-300 border rounded w-full py-1 px-2 font-normal "
          {...register("pricePerNight", {
            required: "this field is required",
          })}
        ></input>
        {errors.pricePerNight && (
          <span className="text-red-500 text-sm">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
      <label
        htmlFor="frist"
        className="text-gray-700 text-sm font-bold max-w-[50%]"
      >
        Starts Rating
        <select
          {...register("starRating", {
            required: "this field is requried",
          })}
          className="border rounded w-full my-4 p-5"
        >
          <option value="" className="text-sm font-bold">
            select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((number) => {
            return (
              <option key={crypto.randomUUID()} value={number}>
                {number}
              </option>
            );
          })}
        </select>
        {errors.pricePerNight && (
          <span className="text-red-500 text-sm">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default DetailsSections;
