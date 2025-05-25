import SortedBy from "../../ui/SortedBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { field: "all", label: "All" },
          { field: "checked-out", label: "Checked out" },
          { field: "checked-in", label: "Checked in" },
          { field: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortedBy
        options={[
          { field: "startDate-desc", label: "Sort by date (recent first)" },
          { field: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            field: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { field: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
