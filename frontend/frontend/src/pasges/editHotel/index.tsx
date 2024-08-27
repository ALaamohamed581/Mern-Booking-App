// import { useMutation, useQuery } from "react-query";
// import { useParams } from "react-router-dom";
// import * as apiClient from "../../apis/api-clients";
// import MangeHotelForm from "../../forms/MangeHotelForm";
// const EditHotel = () => {
//   const { hotelId } = useParams();
//   const { data: hotel } = useQuery(
//     "fetMyHotelById",
//     () => apiClient.fetchMyHotelById(hotelId || ""),
//     {
//       enabled: !!hotelId,
//     }
//   );
//   const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
//     onSuccess: () => {},
//     onError: () => {},
//   });
//   const handelSave = (hotelFormData: FormData, id) => {
//     mutate(hotelFormData, id);
//   };
//   return (
//     <MangeHotelForm
//       hotel={hotel!}
//       onSave={handelSave}
//       id={hotelId}
//       isLoading={isLoading}
//     />
//   );
// };

// export default EditHotel;
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../../apis/api-clients";
import MangeHotelForm from "../../forms/MangeHotelForm";
import { UseAppContext } from "../../context/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  const { showToast } = UseAppContext();
  console.log(hotel);
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Somthing wentwrong!", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <MangeHotelForm hotel={hotel!} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditHotel;
