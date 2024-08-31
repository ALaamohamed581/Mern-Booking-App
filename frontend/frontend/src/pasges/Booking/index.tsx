import { useQuery } from "react-query";
import * as apiCLient from "../../apis/api-clients";
import BookingForm, { BookingFormSkelton } from "../../forms/BookingForm";
import { useParams } from "react-router-dom";
import { useSraechCOntext } from "../../context/searchContext";
import { useEffect, useState } from "react";
import BookingDetailsSummary, {
  BookingDetailsSummarySkekltion,
} from "../../components/BookingDetailsSummary";
import { HotelType, UserType } from "../../../../../backend/types";
import { Elements } from "@stripe/react-stripe-js";
import { UseAppContext } from "../../context/AppContext";
import { PaymentIntentResponse } from "../../../../../backend/src/shared/sharedTypes/paymentResponse";
const Booking = () => {
  const search = useSraechCOntext();
  const { striepPromise } = UseAppContext();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const { hotelId } = useParams();

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.abs(
        (search.checkOut.getTime() - search.checkIn.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiCLient.fetchHotelById(hotelId as string),
    { enabled: !!hotelId }
  );
  const { data: currentUser } = useQuery(
    "fetchCurrentUSer",
    apiCLient.fetchCurrentUser
  );
  const { data: paymentIntent } = useQuery(
    "createPaymentInttnes",
    () =>
      apiCLient.createPaymentInttnes(
        hotel?._id as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );

  return (
    <div className="grid md:grid-cols-[1fr_2fr]  mt-4">
      {!hotel ? (
        <BookingDetailsSummarySkekltion />
      ) : (
        <BookingDetailsSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNight={numberOfNights}
          hotel={hotel as HotelType}
        />
      )}

      {!currentUser && !paymentIntent ? (
        <BookingFormSkelton />
      ) : (
        <Elements
          stripe={striepPromise}
          options={{
            clientSecret: paymentIntent?.paymentIntentId,
          }}
        >
          <BookingForm
            currentUser={currentUser as UserType}
            paymentIntent={paymentIntent as PaymentIntentResponse}
          />{" "}
        </Elements>
      )}
    </div>
  );
};

export default Booking;
