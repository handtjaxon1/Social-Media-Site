import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Row } from "reactstrap";

const initialState = { content: "" };

export default function AddPost(props) {
    const { id } = useParams();
    const [formData, setFormData] = useState(initialState);
    const [post, setPost] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/posts", {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(response => {
            setPost(response.data[0]);
            setFormData(response.data[0]);
        })
        .catch(err => {
            console.error("There was an error retrieving data for the edited post.", err);
        })
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        axios.put("http://localhost:5000/api/posts/" + id, {
            ...post,
            content: formData.content
        }, {
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

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState, [name]: value
        }));
        console.log(formData.content);
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
                        rows="15"
                        className="border-primary preserve-whitespace"
                    />
                </FormGroup>
                <Row className="justify-content-around">
                        <Button type="submit" color="primary" className="col-4 text-light">Update</Button>
                        <Button onClick={handleCancel} color="primary" className="col-4 text-light">Cancel</Button>
                </Row>
            </Form>
        </div>
    );
}