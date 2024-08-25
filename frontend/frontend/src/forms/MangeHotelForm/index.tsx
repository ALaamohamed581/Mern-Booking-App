import { FormProvider, useForm } from "react-hook-form";
import { HotelFormData } from "../../types";
import DetailsSections from "./DetailsSections/DetailsSections";
import TypesSection from "./typesSEction/typesSsection";
import FacilitiesSection from "./facilitiesSection/FacilitiesSection";
import GuestSection from "./guestSevtion/GuestSection";
import ImageSection from "./imageSection/ImageSErction";

type Props = {
  onSave: (HotelFormData: FormData) => void;
  isLoading: boolean;
};

const MangeHotelForm = ({ onSave, isLoading }: Props) => {
  const formMetods = useForm<HotelFormData>();
  const { handleSubmit } = formMetods;

  const onSubmit = handleSubmit((formJson: HotelFormData) => {
    const formData = new FormData();
    formData.append("name", formJson.name);
    formData.append("city", formJson.city);
    formData.append("country", formJson.country);
    formData.append("description", formJson.description);
    formData.append("type", formJson.type);
    formData.append("adultCount", formJson.adultCount.toString());
    formData.append("starRating", formJson.starRating.toString());
    formData.append("childCount", formJson.childCount.toString());
    formData.append("pricePerNight", formJson.pricePerNight.toString());
    //appendig array of faciities

    formJson.facilities.forEach((facility, i) => {
      formData.append(`facilities[${i}]`, facility);
    });
    console.log(formJson.Images);
    Array.from(formJson.Images).forEach((imageFile) => {
      formData.append(`Images`, imageFile);
    });

    onSave(formData);
  });
  return (
    <FormProvider {...formMetods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSections />
        <TypesSection />
        <FacilitiesSection />
        <GuestSection />
        <ImageSection />
        <span className="flex justify-end">
          <button
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-300 text-lg disabled:bg-gray-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Save...." : "save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default MangeHotelForm;
