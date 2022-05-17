import { FormEvent, useEffect, useState } from 'react'

import { Form, Button, Container } from 'react-bootstrap'

import axios from 'axios'
import { SERVER_URL } from '../../utils/constants';

const LoginForm = () => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: FormEvent) => {

        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            event.stopPropagation();

            return;
        }

        const username = (form.elements.namedItem("username") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        login(username, password);
        setValidated(true);

    };


    const login = async (username: string, password: string) => {
        const response = await axios.post(SERVER_URL + "login", { username, password });

        console.log(response.data);
        
        const user = await axios.get(SERVER_URL + "user/" + response.data.userId);

        console.log(user.data);
        
    }

    return (
        <div >
            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{width:"24rem"}} >
                <Form.Group>
                    <Form.Label >username</Form.Label>
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
                    <Button type="submit" >Login</Button>
                    <Button>Register</Button>
                </div>
            </Form>
        </div>
    )
}

export default LoginForm