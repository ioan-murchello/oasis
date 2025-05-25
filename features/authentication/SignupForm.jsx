import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUpForm } from "./useSignUpForm";
import { sanitizeInput } from "../../utils/helpers";
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUpQueryFn } = useSignUpForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const onSubmitHandler = ({ email, password, fullName }) => {
    signUpQueryFn({ email, password, fullName }, { onSettled: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          {...register("fullName", {
            required: "This field is required",
            setValueAs: (value) => sanitizeInput(value),
          })}
          type="text"
          id="fullName"
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
            setValueAs: (value) => sanitizeInput(value),
          })}
          type="email"
          id="email"
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            setValueAs: (value) => sanitizeInput(value),
          })}
          type="password"
          id="password"
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
            setValueAs: (value) => sanitizeInput(value),
          })}
          type="password"
          id="passwordConfirm"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          $size="medium"
          type="reset"
          onClick={reset}
        >
          Cancel
        </Button>
        <Button $variation="primary" $size="medium">
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
