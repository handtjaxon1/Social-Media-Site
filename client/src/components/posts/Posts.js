import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Posts(props) {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/posts/all", {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then(response => {
                // Expects an array of objects back
                setPosts(response.data);
            })
            .catch(error => {
                console.error("Error retrieving all posts from the server.", error);
            })
    }, []);

    function toCreatePost(e) {
        e.preventDefault();
        navigate("/posts/add");
    }

    return (
        <div>
            <div className="text-center">
                <h1>Posts Page</h1>
                <Button color="primary" className="text-light my-3" onClick={toCreatePost}>Create Post</Button>
            </div>
            <div  className="d-flex align-items-center flex-column">
                {/* TODO Add option to filter by keywords from the posts maybe? */}
                { posts && posts.map((post) => <Post post={post}/>) }
            </div>
        </div>
    );
}