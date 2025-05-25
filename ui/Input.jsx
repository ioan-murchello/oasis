import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
`;

const Input = ({ type, id, disabled, ...props }) => {
  return (
    <StyledInput disabled={disabled} type={type} id={id} name={id} {...props} />
  );
};
export default Input;
