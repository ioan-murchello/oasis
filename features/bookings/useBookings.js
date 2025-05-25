import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export const useBookings = () => {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortedValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortedValue.split("-");

  const toSort = { field, value: direction };

  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");

  const { data = {}, isPending: isBookingsLoads } = useQuery({
    queryKey: ["bookings", filter, toSort, page],
    queryFn: () => getBookings(filter, toSort, page),
  });
  const { bookings = {}, count = 0 } = data;

  // !! prefetch next and previous pages
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, toSort, page + 1],
      queryFn: () => getBookings(filter, toSort, page + 1),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, toSort, page - 1],
      queryFn: () => getBookings(filter, toSort, page - 1),
    });
  }
  return { isBookingsLoads, bookings, count };
};
