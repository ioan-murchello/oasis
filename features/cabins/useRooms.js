import { useQuery } from "@tanstack/react-query"
import { getRooms } from "../../services/apiRooms"

export const useRooms = () => {
    const {isPending:isLoading, data:rooms} = useQuery({
        queryKey: ['rooms'],
        queryFn: getRooms,
      }) 
      return {isLoading, rooms}
}