import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import SmallSidebar from "./SmallSidebar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem, 2.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  padding: 3rem;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 968px) {
    padding: 8px;
  }
`;

const SmallMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  @media (max-width: 968px) {
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <SmallMenuWrapper>
        <SmallSidebar>
          <SmallSidebar.Toggle />
        </SmallSidebar>
      </SmallMenuWrapper>
      <UserWrapper>
        <UserAvatar />
        <HeaderMenu />
      </UserWrapper>
    </StyledHeader>
  );
};
export default Header;
