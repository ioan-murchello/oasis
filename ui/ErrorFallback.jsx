import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import GlobalStyles from "../styles/GlobalStyles";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Heading as={"h1"}>Something went wrong</Heading>
          <p>{error.message}</p>
          <Button
            onClick={resetErrorBoundary}
            $variation="secondary"
            $size="medium"
          >
            Please try again later.
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}
export default ErrorBoundaryFallback;
