import { css } from "styled-components";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

 ${(props) =>
    props.place === "center" &&
    css`
      justify-content: center;
      align-items: center;
    `}

    @media (max-width: 768px) {
    ${(props) =>
      props.type === "horizontal" &&
      css`
        flex-direction: column;
        gap: 1.2rem;
      `}
  }
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
