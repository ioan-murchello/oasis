import styled, { css } from "styled-components";

const Form = styled.form`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem; 
  

  ${(props) =>
    props.$type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.$type === "modal" &&
    css`
      max-width: 80rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2.4rem;

      @media (max-width: 600px) {
        gap: 2.2rem;
        padding: 2.2rem;
        height: 90%;
        overflow-y: auto;
      }
    `}
  ${(props) =>
    props.$type === "loginForm" &&
    css`
      max-width: 27rem;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem;
      margin: 0 auto;

      @media (max-width: 600px) {
        gap: 1rem;
        padding: 1rem; 
        /* overflow-y: auto; */
      }
    `}
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
