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
  const [destination, setDestination] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
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
