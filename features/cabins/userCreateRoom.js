import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

export const useCreateRoom = () => {
    const queryClient = useQueryClient()
  const {
    mutate: createNewRoom,
    error,
    isPending: isCreating,
  } = useMutation({
    mutationFn: (room) => createEditRoom(room),
    onSuccess: () => {
      toast.success("Room successfully created");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => {
      toast.error(error.message);
    },
  });

  return {createNewRoom, isCreating}
};
