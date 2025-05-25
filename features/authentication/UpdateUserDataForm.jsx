import { useState } from "react";
import defaultAvatar from "../../data/img/default-user.jpg";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useGetUser } from "./useGetUser";
import { useUpdateUser } from "./useUpdateUser";
import styled from "styled-components";

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.2rem;

  @media (max-width: 600px) {
    justify-content: flex-start;
  }
`;

function UpdateUserDataForm() {
  const {
    user: { user_metadata },
  } = useGetUser();

  const { updateUser, isUpdating } = useUpdateUser();
  const currentFullName = user_metadata?.fullName || "";
  const [fullName, setFullName] = useState(user_metadata?.fullName || "");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user_metadata?.avatar || defaultAvatar
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar("");
        },
      }
    );
  }

  function handleCancel() {
    setAvatar("");
    setFullName(currentFullName);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user_metadata.email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          disabled={isUpdating}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setAvatar(file);
            if (file) {
              setAvatarPreview(URL.createObjectURL(file));
            }
          }}
        />
      </FormRow>
      <FormRow label="Avatar preview">
        <img
          id="avatar-preview"
          src={avatarPreview || defaultAvatar}
          alt="Avatar preview"
          style={{
            width: "10rem",
            height: "10rem",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </FormRow>
      <ButtonRow>
        <Button
          $size="medium"
          type="reset"
          $variation="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button $size="medium" $variation="primary">
          Update account
        </Button>
      </ButtonRow>
    </Form>
  );
}

export default UpdateUserDataForm;
