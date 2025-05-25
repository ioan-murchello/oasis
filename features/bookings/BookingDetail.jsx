import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import { useState } from "react";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const [isDeleted, setDeleted] = useState(false);

  const { deleteSingleBooking } = useDeleteBooking();
  const { checkout } = useCheckout();
  const { booking = {}, isBookingLoading, isError } = useBooking();
  const { id: bookingId, status } = booking || {};
  const navigate = useMoveBack();

  const moveBack = useMoveBack();

  if (isError) {
    return <p>Not found</p>;
  }

  if (isDeleted) return null;
  if (isBookingLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{bookingId}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          {status === "checked-in" && (
            <Button
              $variation="primary"
              $size="medium"
              onClick={() => checkout(bookingId)}
            >
              Check out
            </Button>
          )}
          <Modal.Open opens="delete">
            <Button $variation="danger" $size="medium" onClick={moveBack}>
              Delete Booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={booking.fullName}
              onConfirm={() =>
                deleteSingleBooking(bookingId, {
                  onSuccess: () => { 
                    navigate("/bookings");
                  },
                })
              }
            />
          </Modal.Window>
          <Button $variation="secondary" $size="medium" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
