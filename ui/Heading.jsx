import { css } from "styled-components";
import styled from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `};

  font-weight: 600;
  color: orange;
  text-align: center;

  @media (max-width: 600px) {
    ${(props) =>
      props.as === "h1" &&
      css`
        font-size: 2.1rem;
      `}
    ${(props) =>
      props.as === "h2" &&
      css`
        font-size: 1.7rem;
      `}
    ${(props) =>
      props.as === "h3" &&
      css`
        font-size: 1.4rem;
      `}
  }
`;

export default Heading;
