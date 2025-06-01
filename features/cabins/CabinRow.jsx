import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useRemoveRoom } from "./useDeleteRoom";
import { HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { BiEdit } from "react-icons/bi";

import { useCreateRoom } from "./userCreateRoom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto auto; /* optional */
    gap: 1.2rem;
    padding: 1.4rem 1.6rem;

    .menu-cell {
      grid-column: 2 / 3; /* Move it to the right column */
      justify-self: end; /* Align content inside to the right */
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    .menu-cell {
      grid-column: 1 / -1;
      justify-self: end;
    }
  }
`;

const MenusWrapper = styled.div`
  position: relative;
  display: flex;

  align-items: center;

  @media (max-width: 768px) {
    justify-content: flex-end;
    width: 100%;
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center; 
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ room }) => {
  const [show, setShow] = useState(false);
  const { isDeleting, removeRoom } = useRemoveRoom();
  const { createNewRoom } = useCreateRoom(); 
  const { image, name, maxCapacity, regularPrice, discount, description, id } =
    room;

  const handleDuplicate = () => {
    createNewRoom({
      name: `Copy ${room.name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  };

  return (
    <>
      <TableRow>
        <Img src={image} />
        <div>{name}</div>
        <Cabin>{maxCapacity}</Cabin>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount > 0 ? formatCurrency(discount) : "-"}</Discount>
        <span>{description.slice(0, 32)}...</span>
        <div className="menu-cell">
          <Modal>
            <Menus>
              <MenusWrapper>
                <Menus.Toggle id={id} />
                <Menus.List id={id}>
                  <Menus.Button
                    icon={<HiSquare2Stack />}
                    onClick={handleDuplicate}
                  >
                    Duplicate
                  </Menus.Button>

                  <Modal.Open opens="edit">
                    <Menus.Button
                      icon={<BiEdit />}
                      onClick={() => setShow((prev) => !prev)}
                    >
                      Edit
                    </Menus.Button>
                  </Modal.Open>
                  <Modal.Open opens="remove">
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                  </Modal.Open>
                </Menus.List>
              </MenusWrapper>

              <Modal.Window name="edit">
                <CreateCabinForm roomToEdit={room} />
              </Modal.Window>

              <Modal.Window name="remove">
                <ConfirmDelete
                  resourceName={name}
                  onConfirm={() => removeRoom(id)}
                  disabled={isDeleting}
                />
              </Modal.Window>
            </Menus>
          </Modal>
        </div>
      </TableRow>
      {show && <CreateCabinForm roomToEdit={room} />}
    </>
  );
};

export default CabinRow;
