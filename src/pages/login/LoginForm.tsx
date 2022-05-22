import { FormEvent, useEffect, useState } from "react";

import { Form, Button, Container, Spinner } from "react-bootstrap";

import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { fetchUserById } from "../../features/user/slice";
import { Navigate } from "react-router";

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const { user, isFetching, error } = useAppSelector((state) => state.user);

  const [validated, setValidated] = useState(false);

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

    const userId = await login(username, password);

    dispatch(fetchUserById(userId));
    setValidated(true);
  };

  // attempts login onto server
  // returns userId if successful
  const login = async (username: string, password: string) => {
    const response = await axios.post(SERVER_URL + "login", {
      username,
      password,
    });

    return response.data.userId;
  };

  return (
    <div>
      {error && <p>{error.message}</p>}
      {user && <Navigate to="/home" replace={true} />}
      {isFetching ? (
        <Spinner animation="border" />
      ) : (
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
      )}
    </div>
  );
};

export default LoginForm;
