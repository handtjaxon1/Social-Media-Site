import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

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
        axios.post("http://localhost:5000/api/users/register", formData)
        .then(response => {
            console.log("Signed up");
            sessionStorage.setItem("token", response.data.access_token);
            navigate("/profile");
        })
        .catch(err => {
            console.error("There was an error when signing up. ", err);
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1 className="text-center">Sign Up</h1>
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
            <div className="d-flex justify-content-center">
                <Button type="submit" color="primary" className="text-light btn-login w-100">Sign Up</Button>
            </div>
        </Form>
    );
}