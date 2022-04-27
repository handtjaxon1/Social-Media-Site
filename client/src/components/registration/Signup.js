import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { CLIENT_URLS } from "../../constants/clientRoutes";

export default function Signup(props) {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

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
        fetch("http://localhost:5000/api/users/register", opts)
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
                    name="confirm_password"
                    value={formData.confirm_password}
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
            <Button type="submit" color="primary" className="text-light">Sign Up</Button>
        </Form>
    );
}