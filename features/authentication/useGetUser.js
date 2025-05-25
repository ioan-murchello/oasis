import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export const useGetUser = () => {
  const {
    data: user,
    isPending: isGettingUser,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: true,
    enabled: true,
  });
  return {
    user,
    isGettingUser,
    error,
    isAuthenticated: !!user,
  };
};
