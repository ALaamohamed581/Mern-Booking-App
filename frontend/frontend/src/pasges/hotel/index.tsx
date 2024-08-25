import { useMutation } from "react-query";
import MangeHotelForm from "../../forms/MangeHotelForm";
import { UseAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../../apis/api-clients";
const Hotel = () => {
  const { showToast } = UseAppContext(); //قثبهسثTODO
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: async () => {
      showToast({ message: "Hotel Created", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const handleSave = (hotelformData: FormData) => {
    mutate(hotelformData);
  };

  return <MangeHotelForm onSave={handleSave} isLoading={isLoading} />;
};
export default Hotel;
