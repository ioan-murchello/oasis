import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  max-width: 768px;
  width: 100%;

  @media (max-width: 600px) {
    padding: 2.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    overflow-y: auto;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: var(--color-grey-500);
    stroke: var(--color-grey-500);
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ open, openName, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: openModalWindow }) => {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(openModalWindow) });
};

const Window = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <>{cloneElement(children, { closeModal: close })}</>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

export default Modal;

Modal.Open = Open;
Modal.Window = Window;
