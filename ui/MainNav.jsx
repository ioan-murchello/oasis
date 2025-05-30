import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { GrHome } from "react-icons/gr";
import { RiHotelBedFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { GiSettingsKnobs } from "react-icons/gi";
import { BsCalendar3 } from "react-icons/bs";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const MainNav = () => {
  return (
    <nav>
      <NavList>
        <li>
          <StyledLink to="/dashboard">
            <GrHome />
            <span>Home</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/bookings">
            <BsCalendar3 />
            <span>Bookings</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/rooms">
            <RiHotelBedFill />
            <span>Rooms</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/users">
            <CgProfile />
            <span>Users</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/settings">
            <GiSettingsKnobs />
            <span>Settings</span>
          </StyledLink>
        </li>
      </NavList>
    </nav>
  );
};

export default MainNav;
