import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useChecking = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isPending: isLoading } = useMutation({
    mutationFn: async ({ bookingId, breakfast }) => {
      const data = await updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
      return data;
    },

    onSuccess: (data) => { 
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} has been checked in`);
      navigate("/bookings");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong");
    },
  });

  return { isLoading, checkin };
};
