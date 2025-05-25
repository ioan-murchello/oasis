import styled from "styled-components";

const DashboardBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  height: 300px;
  width: 100%;
  gap: 2.4rem;

  @media (max-width: 968px) {
    padding: 2.4rem;
    gap: 2rem;
  }
  @media (max-width: 600px) {
    padding: 1.2rem;
    gap: 1.4rem;
  }
`;

export default DashboardBox;
