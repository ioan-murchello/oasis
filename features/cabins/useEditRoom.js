import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

export const useEditRoom = () => {
  const queryClient = useQueryClient();

  const {
    mutate: editRoom,
    isPending: isEditing,
    error,
  } = useMutation({
    mutationFn: ({ newRoomData, id }) => createEditRoom(newRoomData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => {
      toast.error(error.message);
    },
  });

  return { editRoom, isEditing };
};
