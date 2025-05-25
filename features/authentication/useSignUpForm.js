import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignUpForm = () => {
  const { mutate: signUpQueryFn, isPending: isSigningUp } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: (newUser) => signUp(newUser),
    onSuccess: () => {
      toast.success("User created succesfully. Please verify your email");
    },
    onError: () => {
      toast.error("Some problem creating user");
    },
  });

  return { signUpQueryFn, isSigningUp };
};
