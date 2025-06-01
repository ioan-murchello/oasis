import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import { HiOutlineEye } from "react-icons/hi";
import { TbEyeClosed } from "react-icons/tb";
import { VscEye } from "react-icons/vsc";
import { useState } from "react";
import styled from "styled-components";
import { sanitizeInput } from "../../utils/helpers";
import { useGetUser } from "./useGetUser";

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.2rem;
  margin: 10px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    justify-content: flex-start;
    flex-wrap: no-wrap;
  }

  #eye,
  #eye2 {
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 3rem;
`;

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    user: { user_metadata },
  } = useGetUser();

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <InputWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            $icon={<HiOutlineEye />}
            autoComplete="current-password"
            disabled={isUpdating || user_metadata?.fullName === "Demo User"}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
              setValueAs: (value) => sanitizeInput(value),
            })}
          />
          <ButtonRow>
            <button
              id="eye"
              type="button"
              onClick={() => setShowPassword((show) => !show)}
            >
              {showPassword ? <VscEye size={22} /> : <TbEyeClosed size={22} />}
            </button>
          </ButtonRow>
        </InputWrapper>
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <InputWrapper>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating || user_metadata?.fullName === "Demo User"}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
              setValueAs: (value) => sanitizeInput(value),
            })}
          />

          <ButtonRow>
            <button
              id="eye2"
              type="button"
              onClick={() => setShowConfirmPassword((show) => !show)}
            >
              {showConfirmPassword ? (
                <VscEye size={22} />
              ) : (
                <TbEyeClosed size={22} />
              )}
            </button>
          </ButtonRow>
        </InputWrapper>
      </FormRow>
      <ButtonRow>
        <Button
          $size="medium"
          $variation="secondary"
          onClick={reset}
          type="reset"
        >
          Cancel
        </Button>
        <Button
          $size="medium"
          $variation="primary"
          disabled={isUpdating || user_metadata?.fullName === "Demo User"}
        >
          Update password
        </Button>
      </ButtonRow>
    </Form>
  );
}

export default UpdatePasswordForm;
