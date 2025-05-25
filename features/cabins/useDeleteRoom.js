import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteRoom } from "../../services/apiRooms";

export const useRemoveRoom = () => {
  const queryClient = useQueryClient();
  const { mutate: removeRoom, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => await deleteRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room sucessfully deleted");
    },
  });

  return { removeRoom, isDeleting };
};
