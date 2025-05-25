import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export const useTodayActivity = () => {
  const { data: todayActivity, isPending: isLoading } = useQuery({
    queryKey: ["todayActivity"],
    queryFn: () => getStaysTodayActivity(),
  });

  return {
    todayActivity,
    isLoading,
  };
};
