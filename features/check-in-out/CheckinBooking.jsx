import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { useChecking } from "./useChecking";
import Spinner from "../../ui/Spinner";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isPaidConfirmed, setIsPaidConfirmed] = useState(false);
  const [breakfast, setBreakfast] = useState(false);

  const {
    settings: { breakfastPrice },
  } = useSettings();

  const { booking = {} } = useBooking();

  useEffect(() => {
    setIsPaidConfirmed(booking?.isPaid ?? false);
  }, [booking]);

  const moveBack = useMoveBack();
  const { checkin, isLoading } = useChecking();

  const {
    id: bookingId,
    guests = {},
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};
  if (isLoading || !guests.fullName) return <Spinner />;

  const optionalBreackfast = numGuests * numNights * breakfastPrice;

  const total = breakfast ? totalPrice + optionalBreackfast : totalPrice;

  function handleCheckin() {
    if (!isPaidConfirmed) return;

    if (breakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreackfast,
          totalPrice: totalPrice + optionalBreackfast,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={breakfast}
            onChange={() => {
              setBreakfast((add) => !add);
              setIsPaidConfirmed(false);
            }}
            id="breakfast"
          >
            Want to add breackfast for {numNights} nights, to {numGuests}{" "}
            person? Total: {formatCurrency(optionalBreackfast)}. Breackfast
            price: {formatCurrency(breakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={isPaidConfirmed}
          onChange={() => setIsPaidConfirmed((pev) => !pev)}
          disabled={isPaidConfirmed}
        >
          I Confirm that the guest {} has paid the total amount of{" "}
          {formatCurrency(total)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={!isPaidConfirmed}
          $variation="primary"
          $size="medium"
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" $size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
