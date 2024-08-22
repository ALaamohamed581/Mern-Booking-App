import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../apis/api-clients";
import { UseAppContext } from "../../context/AppContext";
const SignOutButton = () => {
  const quertClient = useQueryClient();
  const { showToast } = UseAppContext();
  const mutation = useMutation(() => apiClient.signOut(), {
    onSuccess: async () => {
      await quertClient.invalidateQueries("validteToken");
      showToast({ message: "sign out success", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-200"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
