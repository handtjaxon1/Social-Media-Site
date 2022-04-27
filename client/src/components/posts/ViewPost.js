import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Post from "./Post";

export default function ViewPost(props) {
    const { id } = useParams();
    const [post, setPost] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${id}`, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(response => {
            setPost(response.data);
        })
        .catch(err => {
            console.error("There was an error while viewing the post.", err);
        })
    }, []);

    function back(e) {
        e.preventDefault();
        navigate("/posts");
    }

    return (
        <div className="d-flex align-items-center flex-column">
            <Post post={post}/>
            <Button color="primary" size="lg" className="text-light" onClick={back}>Back to Posts</Button>
        </div>
    );
}