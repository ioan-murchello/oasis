import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  @media (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const ExtraRow = styled.div`
  grid-column: 2 / span 2;
  width: 100%;

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
    flex-wrap: wrap;

    @media (max-width: 600px) {
      justify-content: flex-start;
    }
  }
`;

const FormRow = ({ label, error, children }) => {
  const firstChild = Array.isArray(children) ? children[0] : children;
  return (
    <StyledFormRow>
      {label && <Label htmlFor={firstChild.id}>{label}</Label>}
      <ExtraRow>{children}</ExtraRow>
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};
export default FormRow;
