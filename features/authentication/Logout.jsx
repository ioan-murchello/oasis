import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";

const Logout = () => {
  const { logoutFromQuery } = useLogout();
  return (
    <ButtonIcon onClick={logoutFromQuery}>
      <HiArrowLeftOnRectangle />
    </ButtonIcon>
  );
};
export default Logout;
