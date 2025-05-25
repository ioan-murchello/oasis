import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteSingleBooking, isLoading } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries("bookings");
      toast.success("Booking deleted successfully");
    },
  });
  return { deleteSingleBooking, isLoading };
};
export default useDeleteBooking;
