import { SortedBy } from "../../ui/SortedBy";

const BookingOperations = () => {
  return (
    <>
      <SortedBy
          options={[
            { field: "name-asc", label: "Sort by name (A-Z)" },
            { field: "name-desc", label: "Sort by name (Z-A)" },
            { field: "regularPrice-desc", label: "Sort by price (hight first)" },
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
    </>
  );
};
export default BookingOperations;
