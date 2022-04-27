import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

export default function Posts(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/posts")
            .then(response => {
                // Expects an array of objects back
                setPosts(response.data);
            })
            .catch(error => {
                console.error("Error retrieving all posts from the server.", error);
            })
    }, []);

    return (
        <div>
            <h1>Posts Page</h1>
            {/* TODO Add option to filter by keywords from the posts maybe? */}
            { posts && posts.map((post) => <Post post={post}/>) }
        </div>
    );
}