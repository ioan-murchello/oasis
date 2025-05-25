import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import { useRooms } from "./useRooms";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const { isLoading, rooms = [] } = useRooms();
  const [searchParams] = useSearchParams();
  const filtered = searchParams.get("discount") || "all";

  //** Filtering */
  let filteredRooms = [];

  if (filtered === "all") filteredRooms = [...rooms];
  if (filtered === "no-discount") {
    filteredRooms = rooms?.filter((room) => room.discount === 0);
  }
  if (filtered === "with-discount") {
    filteredRooms = rooms?.filter((room) => room.discount > 0);
  }

  //** Sorting */
  const initialSorting = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = initialSorting.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedRooms = filteredRooms?.sort((a, b) => {
    if (typeof a[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return modifier * (a[field] - b[field]);
  });

  if (!sortedRooms) return <Empty resource="rooms" />;

  if (isLoading) return <Spinner />;

  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.Header role="row">
        <div>Room foto</div>
        <div>Room</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Description</div>
      </Table.Header>
      <Table.Body
        data={sortedRooms}
        render={(room) => <CabinRow room={room} key={room.id} />}
      />
    </Table>
  );
};

export default CabinTable;
