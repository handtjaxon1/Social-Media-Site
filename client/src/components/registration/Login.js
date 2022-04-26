import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default function Login(props) {
    const [formData, setFormData] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // TODO Handle submitting request to the server for login validation
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Log In</h1>
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
            <Button type="submit">Login</Button>
        </Form>
    );
}