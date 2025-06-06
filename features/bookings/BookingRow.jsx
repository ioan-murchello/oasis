import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiMiniEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Block = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    justify-content: flex-end;
    width: 100%;
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email: email },
    cabins: { name: cabinName },
  } = {},
}) {
  const { checkout } = useCheckout();
  const { deleteSingleBooking } = useDeleteBooking();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus>
          <Block>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button
                icon={<HiMiniEye />}
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                See details
              </Menus.Button>

              {status === "unconfirmed" && (
                <Menus.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={() => navigate(`/check-in/${bookingId}`)}
                >
                  Check in
                </Menus.Button>
              )}
              {status === "checked-in" && (
                <Menus.Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => checkout(bookingId)}
                >
                  Check out
                </Menus.Button>
              )}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={cabinName}
                onConfirm={() =>
                  deleteSingleBooking(bookingId, { onSettled: useMoveBack })
                }
              />
            </Modal.Window>
          </Block>
        </Menus>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
