import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default function Signup(props) {
    const [formData, setFormData] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        // TODO Submit request to the server to signup and create a user
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Sign Up!</h1>
            <FormGroup>
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                    type="text"
                    id="display_name"
                    name="display_name"
                    value={formData.display_name}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </FormGroup>
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
            <FormGroup>
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                    type="password"
                    id="confirm"
                    name="confirm"
                    value={formData.confirm}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="profile_img_url">Profile Image</Label>
                <Input
                    type="url"
                    id="profile_img_url"
                    name="profile_img_url"
                    value={formData.profile_img_url}
                    onChange={handleChange}
                />
            </FormGroup>
            <Button type="submit">Sign Up</Button>
        </Form>
    );
}