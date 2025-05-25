import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;
  @media (max-width: 1286px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
  }
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
import styled from "styled-components";

const Stats = ({ bookings, confirmedStays, numDays, cabinsCount }) => {
  const totalBookings = bookings?.length || 0;
  const checkins = confirmedStays?.length || 0;

  const totalSales =
    bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0) || 0;

  const totalNights = confirmedStays?.reduce((acc, cur) => {
    const nights = Number(cur.numNights);
    return acc + (isNaN(nights) ? 0 : nights);
  }, 0);

  const denominator = numDays * cabinsCount;
  const totalOccupancyRate = denominator ? totalNights / denominator : 0;

  return (
    <StatsContainer>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={totalBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check ins"
        color="indigoblue"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(totalOccupancyRate * 100) + "%"}
      />
    </StatsContainer>
  );
};
export default Stats;
