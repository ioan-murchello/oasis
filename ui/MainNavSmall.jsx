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
  position: relative;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  padding: 1.2rem;
`;

const StyledLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1rem;

    color: var(--color-grey-600);
    font-size: 1.4rem;
    font-weight: 500;
    padding: 0.7rem;
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
    width: 1.6rem;
    height: 1.6rem;
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

const MainNavSmall = () => {
  return (
    <nav>
      <NavList>
        <li>
          <StyledLink to="/">
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

export default MainNavSmall;
