import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddRoom = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="room-form">
          <Button $variation="primary" $size="medium">
            Add room
          </Button>
        </Modal.Open>
        <Modal.Window name="room-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};
export default AddRoom;
