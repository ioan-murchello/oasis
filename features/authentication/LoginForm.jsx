import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";
import { sanitizeInput } from "../../utils/helpers";

const FullWidthCenter = styled.div`
  grid-column: 1 / -1;
  justify-self: center;
`;
 
function LoginForm() {
  const { loginFromQuery, isLogging } = useLogin();
  const [email, setEmail] = useState("demouser@gmail.com");
  const [password, setPassword] = useState("11111111");
 

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    const safeEmail = sanitizeInput(email);
    const safePassword = sanitizeInput(password);

    loginFromQuery({ email: safeEmail, password: safePassword });
  }

  return (
    <Form $type="loginForm" onSubmit={handleSubmit}>
      <label htmlFor="email">Email address</label>
      <Input
        type="email"
        id="email"
        // This makes this form better for password managers
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLogging}
      />

      <label htmlFor="password">Password</label>
      <Input
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLogging}
      />
      <FullWidthCenter>
        <Button
          $variation="primary"
          $size="medium"
          disabled={isLogging}
        >
          {isLogging ? <SpinnerMini /> : "Log in"}
        </Button>
      </FullWidthCenter>
    </Form>
  );
}

export default LoginForm;
