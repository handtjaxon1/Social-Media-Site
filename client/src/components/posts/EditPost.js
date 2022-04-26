import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { CLIENT_URLS } from "../../constants/clientRoutes";

export default function AddPost(props) {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    // TODO Get the default value from the backend

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate(CLIENT_URLS.posts);
    }

    function handleCancel(e) {
        navigate(CLIENT_URLS.posts);
    }

    return (
        <div>
            <h1>Add post</h1>
            <Form onSubmit={handleSubmit}>
                {/* TODO Need to update this hidden input to have the display name or username/id of the person who created the post */}
                {/* <Input text="text" id={user} hidden /> */}
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