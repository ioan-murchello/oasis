import styled from "styled-components";
import { createContext, useContext, useState, useEffect } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Uploader from "../data/Uploader";
import { useMediaQuery } from "../hooks/useMatchMediaQuery";

import { LINKS } from "../utils/constants";

const SmallSidebarContext = createContext();

const StyledSmallSidebar = styled.aside`
  width: 100%;
  min-width: 260px;
  position: absolute;
  top: 40px;
  left: 25px;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;

  &.active {
    opacity: 1;
    pointer-events: auto;
  }

  @media (min-width: 968px) {
    display: none;
  }
`;

const MenuBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;
  &:hover {
    background-color: var(--color-grey-100);
  }
  &:active {
    background-color: var(--color-grey-200);
  }

  @media (min-width: 968px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
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

const SmallSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onResize = useMediaQuery("(min-width: 968px)");

  useEffect(() => {
    if (isOpen) {
      document.querySelector("main").style.overflow = "hidden";
    } else {
      document.querySelector("main").style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    if (onResize) {
      setIsOpen(false);
    }
  }, [onResize]);

  const value = { isOpen, setIsOpen };

  return (
    <SmallSidebarContext.Provider value={value}>
      {children}
      {isOpen && (
        <StyledSmallSidebar className={isOpen ? "active" : ""}>
          <MainNavSmall />
          <Uploader />
        </StyledSmallSidebar>
      )}
    </SmallSidebarContext.Provider>
  );
};

const Toggle = () => {
  const { setIsOpen } = useContext(SmallSidebarContext);
  return (
    <MenuBtn onClick={() => setIsOpen((prev) => !prev)}>
      <BiMenuAltLeft size={32} color="var(--color-grey-700)" />
    </MenuBtn>
  );
};

const MainNavSmall = () => {
  const { setIsOpen } = useContext(SmallSidebarContext);
  return (
    <nav>
      <NavList>
        {LINKS.map((link) => {
          return (
            <li key={link.id}>
              <StyledLink
                to={link.path}
                onClick={() => setIsOpen(false)}
                end={link.path === "/"}
              >
                {<link.icon />}
                <span>{link.text}</span>
              </StyledLink>
            </li>
          );
        })}
      </NavList>
    </nav>
  );
};

SmallSidebar.Toggle = Toggle;
SmallSidebar.MainNavSmall = MainNavSmall;

export default SmallSidebar;
