import React, { useContext, useState } from "react";

export interface SerachContect {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId?: string;
  saveSearchValue: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId: string
  ) => void;
}
type searchContextProps = {
  Children: React.ReactNode;
};
const searchContext = React.createContext<SerachContect | undefined>(undefined);

export const SearchContextProvider = ({ Children }: searchContextProps) => {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem("destination") || ""
  );
  const [checkIn, setCheckIn] = useState<Date>(
    new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState<Date>(
    new Date(
      new Date(sessionStorage.getItem("checkOut") || new Date().toISOString())
    )
  );
  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1")
  );
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("childCount") || "0")
  );
  const [hotelId, setHotelId] = useState<string>("");

  const saveSearchValue = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId: string = ""
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }
    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    if (hotelId) {
      sessionStorage.setItem("hotelId", hotelId);
    }
  };

  return (
    <>
      <searchContext.Provider
        value={{
          hotelId,
          destination,
          checkIn,
          checkOut,
          adultCount,
          childCount,
          saveSearchValue,
        }}
      >
        {Children}
      </searchContext.Provider>
    </>
  );
};

export const useSraechCOntext = () => {
  const context = useContext(searchContext);
  return context as SerachContect;
};
