import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: loginFromQuery, isPending: isLogging } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      toast.success(
        user.user.user_metadata?.fullName
          ? `Welcome back ${user.user.user_metadata?.fullName}!`
          : "Welcome back!"
      );
      navigate("/dashboard", { replace: true });
    },

    onError: (error) => {
      console.log("error", error);
      toast.error(
        "Login failed. Email or Password are incorrect",
        error.message
      );
    },
  });
  return { loginFromQuery, isLogging };
};
