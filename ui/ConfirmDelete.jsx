import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, closeModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this{" "}
        <span style={{ fontWeight: "600" }}>{resourceName}</span> permanently?
        This action cannot be undone.
      </p>

      <div>
        <Button
          $size="medium"
          $variation="primary"
          disabled={disabled}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          $variation="danger"
          $size="medium"
          disabled={disabled}
          onClick={onConfirm}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
