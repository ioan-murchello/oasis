import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortedBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSorting = searchParams.get("sortBy") || "";

  const handleSorting = (e) => {
    if (!e.target.value) return;
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select options={options} onChange={handleSorting} value={initialSorting} />
  );
};

export default SortedBy;
