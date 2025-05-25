import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import { useRooms } from "../cabins/useRooms";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2.4rem;
`;
const StyledInfoBox = styled.div`
  display: flex;
  width: 100%;
  gap: 1.4rem;
  flex-wrap: wrap;
`;

function DashboardLayout() {
  const { bookings, isLoading, numDays } = useRecentBookings();
  const { confirmedStays, isLoadingStays } = useRecentStays();
  const { rooms, isLoading: isLoadingRooms } = useRooms();

  if (isLoading || isLoadingStays || isLoadingRooms) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        ƒ
        cabinsCount={rooms?.length}
      />
      <SalesChart bookings={bookings} numDays={numDays} />
      <StyledInfoBox>
        <Today />
        <DurationChart stays={confirmedStays} />
      </StyledInfoBox>
    </StyledDashboardLayout>
  );
}
export default DashboardLayout;
