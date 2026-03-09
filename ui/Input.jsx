import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  border-radius: 6px;
  padding: 1rem;
  font-size: 1.6rem;
  outline: none;
  border: 1px solid gray;
`;

const Input = ({ type, id, disabled, ...props }) => {
  return (
    <StyledInput disabled={disabled} type={type} id={id} name={id} {...props} />
  );
};
export default Input;
