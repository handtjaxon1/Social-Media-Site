import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default function AddPost(props) {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const { post_id } = useParams();

    // TODO Get the default value from the backend

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/api/posts/edit/" + post_id, formData, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(response => {
            console.log("Edited a post");
            navigate("/posts");
        })
        .catch(error => {
            console.error("There was an error creating a post.", error)
        });
        navigate("/posts");
    }

    function handleCancel(e) {
        console.log("Cancelled editing a post");
        navigate("/posts");
    }

    return (
        <div>
            <h1>Edit post</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="content">Content</Label>
                    <Input
                        type="textarea"
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button type="submit">Update</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </Form>
        </div>
    );
}