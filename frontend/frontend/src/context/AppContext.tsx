import React, { useContext, useState } from "react";
import Toast from "../components/toats";
import { useQuery } from "react-query";
import * as apiClient from "../apis/api-clients";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STREIP_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

interface ToastMessage {
  message: string;
  type: "SUCCESS" | "ERROR";
}
interface AppContext {
  showToast: (toasMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  striepPromise: Promise<Stripe | null>;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);
const striepPromise = loadStripe(STREIP_PUB_KEY);
export const AppContextProvider = ({
  childern,
}: {
  childern: React.ReactNode;
}) => {
  const [toats, serToast] = useState<ToastMessage | undefined>(undefined);
  const { isError } = useQuery("validteToken", apiClient.valdateToke, {
    retry: 0,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          serToast(toastMessage);
        },
        isLoggedIn: !isError,
        striepPromise,
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
