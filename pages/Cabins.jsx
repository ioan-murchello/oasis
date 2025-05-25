import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddRoom from "../features/cabins/addRoom";
import CreateTableOperations from "../features/cabins/CreateTableOperations";
import SortedBy from "../ui/SortedBy";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CreateTableOperations />
        <SortedBy
          options={[
            { field: "name-asc", label: "Sort by name (A-Z)" },
            { field: "name-desc", label: "Sort by name (Z-A)" },
            {
              field: "regularPrice-desc",
              label: "Sort by price (hight first)",
            },
            { field: "regularPrice-asc", label: "Sort by price (low first)" },
            {
              field: "maxCapacity-desc",
              label: "Sort by maxCapacity (hight first)",
            },
            {
              field: "maxCapacity-asc",
              label: "Sort by maxCapacity (low first)",
            },
          ]}
        />
      </Row>
      <Row type="vertical">
        <CabinTable />
        <AddRoom />
      </Row>
    </>
  );
}

export default Cabins;
