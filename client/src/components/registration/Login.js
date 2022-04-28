import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default function Login(props) {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    function isTokenValid() {
        return token && token !== "" && token !== undefined;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios.post("http://localhost:5000/api/users/login", formData)
            .then(response => {
                console.log("Logged in");
                console.log(response);
                sessionStorage.setItem("token", response.data.access_token);
                navigate("/profile");
            })
            .catch(err => {
                console.error("There was an error when logging in. ", err);
            });
    }

    return (
        <div>
            <h1 className="text-center">Log In</h1>
            { !isTokenValid() &&
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </FormGroup>
                <div className="d-flex justify-content-center">
                    <Button type="submit" color="primary" className="text-light btn-login w-100">Login</Button>
                </div>
            </Form>
            }
        </div>
    );
}