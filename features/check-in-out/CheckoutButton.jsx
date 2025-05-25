import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isLoading } = useCheckout();
  return (
    <Button
      disabled={isLoading}
      onClick={() => checkout(bookingId)}
      $variation="secondary"
      $size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
