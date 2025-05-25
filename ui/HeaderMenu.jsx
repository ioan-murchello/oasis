import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMene = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <StyledHeaderMene>
      <li>
        <ButtonIcon
          onClick={() => {
            navigate("/account");
          }}
        >
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMene>
  );
};
export default HeaderMenu;
