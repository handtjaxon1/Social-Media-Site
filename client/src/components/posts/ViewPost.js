import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Post from "./Post";
import jwt_decode from "jwt-decode";

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

    function editPost(e) {
        axios.put(`http://localhost:5000/api/posts/${id}`, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
    }

    function deletePost(e) {
        axios.delete(`http://localhost:5000/api/posts/${id}`, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(response => {
            navigate("/posts");
        })
        .catch(err => {
            console.error("There was an error while trying to delete the post.", err);
        })
    }

    function canWrite() {
        var decoded = jwt_decode(sessionStorage.getItem("token"));
        let test = decoded.sub === post?.user?.id;
        console.log(test);
        return test;
    }

    return (
        <div className="d-flex align-items-center flex-column">
            <Button color="primary" size="lg" className="text-light align-self-start" onClick={back}>Back to Posts</Button>
            <Post post={post}/>
            { canWrite() &&
            <div className="d-flex">
                <Button color="primary" size="lg" className="text-light" onClick={editPost}>Edit</Button>
                <Button color="primary" size="lg" className="text-light" onClick={deletePost}>Delete</Button>
            </div>
            }
        </div>
    );
}