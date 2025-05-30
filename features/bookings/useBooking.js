import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

const useBooking = () => {
  const { id } = useParams();
  const {
    data: booking = {},
    isPending: isBookingLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
    enabled: !!id,
  });

  if (error) {
    console.error(error);
  }
  return { booking, isBookingLoading, error, isError };
};

export default useBooking;
