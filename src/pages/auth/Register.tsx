import { FormEvent, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { loadTokenFromStorage } from "../../features/auth/slice";
import { addUser, getUserById } from "../../features/user/slice";

import { Form, Col, Row, Button, Image } from "react-bootstrap";
import { faker } from "@faker-js/faker";

import "./Register.scss";

const randomImage = faker.image.avatar();

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.token) dispatch(loadTokenFromStorage());
    else dispatch(getUserById(auth.token.token));
  }, [auth.token]);

  if (user) return <Navigate to="/home" />;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    dispatch(
      addUser({
        id: -1,
        name,
        createdAt: new Date(),
        email,
        avatar: randomImage,
      })
    );
  };

  return (
    <Form className="register_form" onSubmit={handleSubmit}>
      <h1 className="heading">Register to Kite Surf</h1>
      <Row>
        <Col lg={5}>
          <Image className="image" src={randomImage}></Image>
        </Col>
        <Col lg={7}>
          <Form.Group className="group" onSubmit={handleSubmit}>
            <Form.Label className="label">Name</Form.Label>
            <Form.Control
              required
              name="name"
              className="control"
              type="text"
            />
          </Form.Group>

          <Form.Group className="group">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              required
              name="email"
              className="control"
              type="email"
            />
          </Form.Group>

          <Form.Group className="group">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              required
              name="password"
              className="control"
              type="password"
            />
          </Form.Group>
        </Col>
      </Row>
      <Button className="register_button" type="submit">
        Register
      </Button>
      <Button className="login_button" onClick={() => navigate("/login")}>
        Already have an account
      </Button>
    </Form>
  );
};

export default Register;
