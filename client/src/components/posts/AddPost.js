import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";

export default function AddPost(props) {
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
        axios.post("http://localhost:5000/api/posts", formData, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then(response => {
                console.log("Created a post");
                navigate("/posts");
            })
            .catch(error => {
                console.error("There was an error creating a post.", error)
            });
    }

    function handleCancel(e) {
        console.log("Cancelled creating a post");
        navigate("/posts");
    }

    return (
        <Row className="justify-content-center">
            <Col className="col-12 col-md-9 col-xl-6">
                <h1>Add post</h1>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="content" className="fs-4">Content</Label>
                        <Input
                            type="textarea"
                            id="content"
                            name="content"
                            value={formData.content}
                            placeholder="What's on your mind..."
                            onChange={handleChange}
                            rows="10"
                            className="border-primary"
                        />
                    </FormGroup>
                    <Row className="justify-content-around">
                        <Button type="submit" color="primary" className="col-4 text-light">Post</Button>
                        <Button onClick={handleCancel} color="primary" className="col-4 text-light">Cancel</Button>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
}