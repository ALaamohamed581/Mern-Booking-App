import { useForm } from "react-hook-form";
import { UserType } from "../../../../../backend/types";
import { PaymentIntentResponse } from "../../../../../backend/src/shared/sharedTypes/paymentResponse";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSraechCOntext } from "../../context/searchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../apis/api-clients";
import { UseAppContext } from "../../context/AppContext";
type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormaData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  hotelId: string;
  paymentIntentId: string;
  checkIn: string;
  checkOut: string;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSraechCOntext();
  const { hotelId } = useParams();
  const { showToast } = UseAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(apiClient.createBooking, {
    onSuccess: () => {
      alert("asdas");
      showToast({ message: "booking saved", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving book ", type: "ERROR" });
    },
  });

  const { register, handleSubmit } = useForm<BookingFormaData>({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      paymentIntentId: paymentIntent?.paymentIntentId,
    },
  });
  const onSubmit = async (formData: BookingFormaData) => {
    if (!stripe || !elements) {
      return;
    }
    const resalut = await stripe?.confirmCardPayment(
      paymentIntent.clientSecret as string,
      {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
        },
      }
    );
    if (resalut.paymentIntent?.status === "succeeded") {
      bookRoom({
        ...formData,
        paymentIntentId: resalut.paymentIntent.id,
      });
    }
  };
  return (
    <form
      className="grid grid-cols-1 gap-5 rounded-lg border border-s-teal-300 pt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="text-3xl font-bold p-2">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6 p-2">
        <label className="text-gray-700 text-sm font-bold  flex-col flex flex-1">
          First Name
          <input
            type="text"
            className="mt-1 rounded w-ful py-2 px-3 text-gray-700 bg-gray-400"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label
          htmlFor=""
          className="text-gray-700 text-sm font-bold flex-1 flex-col flex "
        >
          Last Name
          <input
            type="text"
            className="mt-1 rounded w-ful py-2 px-3 text-gray-700 bg-gray-400"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
      </div>
      <label
        htmlFor=""
        className="text-gray-700 text-sm font-bold flex-col flex  p-2 "
      >
        Email
        <input
          type="text"
          className="mt-1 rounded w-ful py-2 px-3 text-gray-700 bg-gray-400"
          readOnly
          disabled
          {...register("email")}
        />
      </label>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 p-4 rounded-md ">
          <div className="font-semibold text-lg ">
            TotalCost :${paymentIntent?.totalconst?.toFixed(2)}
          </div>
          <div className="text-sx">Includes tasex and charges</div>
          <h3 className="text-xl font-semibold">Payemtn Details</h3>
          <CardElement
            id="payemnt-element"
            className="border rounded-md p-2 text-sm"
          />
        </div>
      </div>
      <button
        disabled={isLoading}
        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
        type="submit"
      >
        {isLoading ? "saving" : "Confrim Booking"}
      </button>
    </form>
  );
};

export default BookingForm;

export const BookingFormSkelton = () => {
  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-s-teal-300 pt-4">
      <span className="text-3xl font-bold animate-pulse"></span>
      <div className="grid grid-cols-2 gap-6 p-2">
        <label className="text-gray-700 text-sm font-bold  flex-col flex flex-1">
          <input
            type="text"
            className="mt-1 rounded w-ful py-2 px-3 animate-pulse text-gray-700 bg-gray-400"
            readOnly
            disabled
          />
        </label>
        <label
          htmlFor=""
          className="text-gray-700 text-sm font-bold flex-1 flex-col flex "
        >
          <input
            type="text"
            className="mt-1 rounded w-ful py-2 px-3 animate-pulse text-gray-700 bg-gray-400"
            readOnly
            disabled
          />
        </label>
      </div>
      <label
        htmlFor=""
        className="text-gray-700 text-sm font-bold flex-col flex  p-2 "
      >
        <input
          type="text"
          className="mt-1 rounded w-ful py-2 px-3 animate-pulse text-gray-700 bg-gray-400"
          readOnly
          disabled
        />
      </label>
      <div className="flex justify-end "></div>
    </form>
  );
};
