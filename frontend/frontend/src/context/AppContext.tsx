import React, { useContext, useState } from "react";
import Toast from "../components/toats";
import { useQuery } from "react-query";
import * as apiClient from "../apis/api-clients";
import { useParams } from "react-router-dom";
interface ToastMessage {
  message: string;
  type: "SUCCESS" | "ERROR";
}
interface AppContext {
  showToast: (toasMessage: ToastMessage) => void;
  isLoggedIn: boolean;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  childern,
}: {
  childern: React.ReactNode;
}) => {
  const [toats, serToast] = useState<ToastMessage | undefined>(undefined);
  const { isError } = useQuery("validteToken", apiClient.valdateToke, {
    retry: 0,
  });
  if (location.origin.includes("edit-hotel")) {
    let params = useParams();
    const { hotelId } = params;
  }
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          serToast(toastMessage);
        },
        isLoggedIn: !isError,
      }}
    >
      {toats && (
        <Toast
          message={toats.message}
          type={toats.type}
          onclose={() => serToast(undefined)}
        />
      )}
      {childern}
    </AppContext.Provider>
  );
};

export const UseAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
