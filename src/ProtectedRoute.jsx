import { useNavigate } from "react-router-dom";
import { useGetUser } from "../features/authentication/useGetUser";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isGettingUser, isAuthenticated } = useGetUser();

   
  if (isGettingUser) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
 
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return children;
};
 
export default ProtectedRoute;
