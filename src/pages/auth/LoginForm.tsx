import { FormEvent, useEffect, useState } from "react";

import { Form, Button, Container, Spinner } from "react-bootstrap";

import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { getUserById } from "../../features/user/slice";
import { Navigate } from "react-router";
import { loadTokenFromStorage, login } from "../../features/auth/slice";

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const { user, isFetching, error } = useAppSelector((state) => state.user);
  const auth = useAppSelector((state) => state.auth);

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!auth.token) dispatch(loadTokenFromStorage());
  }, [auth.token]);

  useEffect(() => {
    if (auth.token) dispatch(getUserById(auth.token.token));
  }, [auth.token]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.stopPropagation();

      return;
    }

    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    dispatch(login(username, password));

    setValidated(true);
  };

  // takes userId from localStorage and refetches User Data
  // const refreshLogin = async () => {
  //   if (userId) {
  //     dispatch(getUserById(parseInt(userId)));
  //     localStorage.removeItem("userId");
  //   }
  // };

  if (isFetching) return <Spinner animation="border" />;

  return (
    <div>
      {error && <p>{error.message}</p>}
      {auth.error && <p>{auth.error.message}</p>}
      {user && <Navigate to="/home" replace={true} />}
      <Form
        validated={validated}
        onSubmit={handleSubmit}
        style={{ width: "24rem" }}
      >
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            required
            type="text"
            name="username"
            placeholder="username"
          />
          <Form.Control.Feedback type="invalid">
            please add your username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            placeholder="password"
          />
          <Form.Control.Feedback type="invalid">
            please add your password.
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <div>
          <Button type="submit">Login</Button>
          <Button>Register</Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
