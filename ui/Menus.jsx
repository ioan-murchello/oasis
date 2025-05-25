import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const StyledToggleWrapper = styled.div`
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
  z-index: 999;
  li {
    width: 100%;
  }
`;

const StyledButton = styled.button`
  min-width: 100%;
  height: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  white-space: nowrap;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuConext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);
  return (
    <MenuConext.Provider value={{ openId, close, open }}>
      <StyledMenu>{children}</StyledMenu>
    </MenuConext.Provider>
  );
};

const Toggle = ({ id }) => {
  const { openId, open, close } = useContext(MenuConext);
  const handleOpenList = (e) => {
    e.stopPropagation();
    openId === "" || openId !== id ? open(id) : close();
    if (id === openId) {
      close(); // If the same button is clicked, close the list.
    } else {
      open(id); // If a different button is clicked, open the new one.
    }
  };
  return (
    <StyledToggle onClick={handleOpenList}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};
const List = ({ id, children }) => {
  const { openId, close } = useContext(MenuConext);
  const ref = useOutsideClick(close, false);
  if (openId !== id) return null;
  return (
    <StyledList ref={ref} $position={{ x: -10, y: 40 }}>
      {children}
    </StyledList>
  );
};
const Button = ({ children, icon, onClick }) => {
  const { close } = useContext(MenuConext);
  const clickHandlerBtn = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton onClick={clickHandlerBtn}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
