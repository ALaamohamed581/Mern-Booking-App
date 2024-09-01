import { HotelType } from "../../../../backend/src/shared/sharedTypes/HotelTypes";
import { regsiterFormData, signInData } from "../types";
import { ReposnObg } from "../../../../backend/types/responseObjet.type";
import { UserType } from "../../../../backend/types";
import { PaymentIntentResponse } from "../../../../backend/src/shared/sharedTypes/paymentResponse";
import { BookingFormaData } from "../forms/BookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const register = async (formData: regsiterFormData) => {
  const response = await fetch(`${API_BASE_URL}api/v1/user/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const reposneBody = await response.json();
  if (!response.ok) {
    throw new Error(reposneBody.message);
  }
};

export const SignIn = async (formData: signInData) => {
  console.log(API_BASE_URL);

  const response = await fetch(`${API_BASE_URL}api/v1/user/sign-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const reposneBody = await response.json();

  console.log(reposneBody);
  if (!response.ok) {
    throw new Error(reposneBody.message);
  }

  return reposneBody;
};
export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}api/v1/user/me`, {
    credentials: "include",
  });
  const reposneBody = await response.json();

  console.log(reposneBody);
  if (!response.ok) {
    throw new Error(reposneBody.message);
  }

  return reposneBody;
};

export const valdateToke = async () => {
  let response = await fetch(`${API_BASE_URL}api/v1/user/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("invalid token");
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}api/v1/user/sign-out`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) throw new Error("error during log out");
};

export const addMyHotel = async (HotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}api/v1/my-hotel-routes/create`, {
    method: "POST",
    credentials: "include",
    body: HotelFormData,
  });

  if (!response.ok) {
    throw new Error("Faild to add hotel");
  }
  return response.json();
};

export const fetchMyHotels = async (page: number): Promise<any> => {
  const response = await fetch(
    `${API_BASE_URL}api/v1/my-hotel-routes/list?page=${page}&limit=5`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("error fetching data");
  return response.json();
};
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  let response = await fetch(
    `${API_BASE_URL}api/v1/my-hotel-routes/get/${hotelId}`,
    {
      credentials: "include",
    }
  );
  if (response.url.includes("/edit-hotel")) {
    response = await fetch(`/api/v1/my-hotel-routes/get/${hotelId}`, {
      credentials: "include",
    });
  }
  if (!response.ok) throw new Error("error fetching hotle");
  return response.json();
};
export const updateMyHotelById = async (formDataa: any) => {
  let id = formDataa.get("hotelId");
  formDataa.delete("hotelId");

  let response = await fetch(
    `${API_BASE_URL}api/v1/my-hotel-routes/update/${id}`,
    {
      method: "PUT",
      credentials: "include",
      body: formDataa,
    }
  );
  if (response.url.includes("/edit-hotel")) {
    response = await fetch(`/api/v1/my-hotel-routes/update/${id}`, {
      method: "PUT",
      credentials: "include",
      body: formDataa,
    });
  }
  if (!response.ok) throw new Error("error fetching hotle");
  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  hotelId?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const seachHotels = async (seachparams: any): Promise<ReposnObg> => {
  let quertyparams = constructSeachPraams(seachparams);
  const response = await fetch(
    `${API_BASE_URL}api/v1/my-hotel-routes/search?${quertyparams}`
  );

  if (!response.ok) throw new Error("error fetching hotle");
  return response.json();
};

export const fetchHotels = async () => {
  let response = await fetch(`${API_BASE_URL}api/v1/my-hotel-routes`);

  if (!response.ok) throw new Error("error fetching hotle");
  return response.json();
};
export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  let response = await fetch(
    `${API_BASE_URL}api/v1/my-hotel-routes/get/${hotelId}`
  );
  if (
    response.url.includes("/edit-hotel") ||
    response.url.includes("/detail")
  ) {
    response = await fetch(`/api/v1/my-hotel-routes/get/${hotelId}`, {
      credentials: "include",
    });
  }
  if (!response.ok) throw new Error("error fetching hotle");
  return response.json();
};

export const createPaymentInttnes = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  let response = await fetch(
    `${API_BASE_URL}api/v1/payments/${hotelId}/bookings/paymnetIntent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),

      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.url.includes("/booking")) {
    response = await fetch(
      `api/v1/payments/${hotelId}/bookings/paymnetIntent`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNights }),

        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  if (!response.ok) throw new Error("error fetching hotle");
  return response.json();
};

export const createBooking = async (formData: BookingFormaData) => {
  let Id = formData.hotelId;

  let response = await fetch(`${API_BASE_URL}api/v1/booking/${Id}/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ ...formData }),
  });
  if (response.url.includes("/booking")) {
    response = await fetch(`api/v1/booking/${Id}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...formData }),
    });
  }
  if (!response.ok) throw new Error("error fetching hotle");
  return response.json();
};
export const fetchMyBooking = async (): Promise<any[]> => {
  let response = await fetch(`${API_BASE_URL}api/v1/booking/book`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("error fetching hotle");
  return response.json();
};

export const constructSeachPraams = (seachparams: any) => {
  const quertyparams = new URLSearchParams();
  quertyparams.append("destination", seachparams.destination || "");
  quertyparams.append("checkIn", seachparams.checkIn || "");
  quertyparams.append("checkOut", seachparams.checkOut || "");
  quertyparams.append("adultCount", seachparams.adultCount || "");
  quertyparams.append("childCount", seachparams.childCount || "");
  quertyparams.append("page", seachparams.page || "");

  quertyparams.append("maxPrice", seachparams.maxPrice || "");
  quertyparams.append("sortOption", seachparams.sortOption || "");

  seachparams.facilities?.forEach((facility: string) =>
    quertyparams.append("facilities", facility)
  );
  seachparams.types?.forEach((type: string) =>
    quertyparams.append("types", type)
  );
  seachparams.stars?.forEach((star: string) =>
    quertyparams.append("stars", star)
  );
  return quertyparams;
};
