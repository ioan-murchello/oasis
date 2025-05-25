import Filter from "../../ui/Filter";

const CreateTableOperations = () => {
  return (
    <Filter
      filterField="discount"
      options={[
        { field: "all", label: "All" },
        { field: "no-discount", label: "No-discount" },
        { field: "with-discount", label: "Discount" },
      ]}
    />
  );
};
export default CreateTableOperations;
