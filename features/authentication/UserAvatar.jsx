import styled from "styled-components";
import { useGetUser } from "./useGetUser";
import defaultAvatar from "../../data/img/default-user.jpg";
import { useMatch } from "react-router-dom";
import { useMediaQuery } from "../../hooks/useMatchMediaQuery";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserAvatar = () => {
  const matchMedia = useMediaQuery("(max-width: 600px)");
  const {
    user: { user_metadata },
  } = useGetUser();
  return (
    <StyledUserAvatar>
      <p>
        {user_metadata?.fullName
          ? user_metadata.fullName.length > 15 && matchMedia
            ? `${user_metadata.fullName.slice(0, 15)}...`
            : user_metadata.fullName
          : "Guest"}
      </p>
      <Avatar src={user_metadata?.avatar || defaultAvatar} alt="Avatar" />
    </StyledUserAvatar>
  );
};

export default UserAvatar;
