import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { CLIENT_URLS } from "../../constants/clientRoutes";

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
        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        // TODO Add full route here
        fetch("http://localhost:5000/api/users/login", opts)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("There was some sort of error");
                }
            })
            .then(data => {
                // NOTE 'access_token' is retrieved from the var name in users.py
                sessionStorage.setItem("token", data.access_token);
                navigate(CLIENT_URLS.posts);
            })
            .catch(err => {
                console.error("There was an error when logging in. ", err);
            })
    }

    return (
        <div>
            <h1>Log In</h1>
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
                        name="empasswordail"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button type="submit" color="primary" className="text-light">Login</Button>
            </Form>
            }
        </div>
    );
}