import { FormEvent, useEffect, useState } from "react";

import { Form, Button, Container, Spinner } from "react-bootstrap";

import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { getUserById } from "../../features/user/slice";
import { Navigate } from "react-router";
import { loadTokenFromStorage, login } from "../../features/auth/slice";

import "./Login.scss";

const Login = () => {
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

  if (isFetching) return <Spinner animation="border" />;

  return (
    <div className="form_container">
      {error && <p>{error.message}</p>}
      {auth.error && <p>{auth.error.message}</p>}
      {user && <Navigate to="/home" replace={true} />}
      <h1 className="form_heading">KITE</h1>
      <Form
        className="form"
        validated={validated}
        onSubmit={handleSubmit}
        style={{ width: "24rem" }}
      >
        <Form.Group className="group">
          <Form.Label className="label">Username</Form.Label>
          <Form.Control
            className="control"
            required
            type="text"
            name="username"
            placeholder="username"
          />
          <Form.Control.Feedback type="invalid">
            please add your username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="group">
          <Form.Label className="label">Password</Form.Label>
          <Form.Control
            className="control"
            required
            type="password"
            name="password"
            placeholder="password"
          />
          <Form.Control.Feedback type="invalid">
            please add your password.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="button_container">
          <Button className="button_login" type="submit">
            Login
          </Button>
          <Button className="button_register">Register</Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
