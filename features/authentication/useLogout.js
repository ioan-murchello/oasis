import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logoutFromQuery, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // queryClient.setQueriesData(["user"], null);
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("Logout successful");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Logout failed", error.message);
    },
  });
  return { logoutFromQuery, isLoggingOut };
};
