import axios from "axios";
import React, { useState } from "react";
import "./LikeButton.css";

export default function LikeButton(props) {
    const { post } = props;
    const [isLiked, setIsLiked] = useState(false);

    function handleLike(e) {
        e.preventDefault();
        e.stopPropagation();
        axios.put("http://localhost:5000/api/posts/" + post.id, {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1
        }, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(response => {
            console.log(response.config.data);
            setIsLiked(!isLiked);
        })
        .catch(err => {
            console.error("There was an error updating the post likes.", err);
        })
    }

    function alreadyLiked() {
        // TODO Written as a function so it's easier to change if it become more complex. No need to adjust the structure of the element below
        return isLiked;
    }

    // TODO Could create custom styles to change the like button in some way to show whether it's liked or not
    return (
        <button onClick={handleLike} className={ alreadyLiked() ? "btn btn-primary text-light" : "btn btn-outline-primary"}>
            { isLiked ? "Unlike" : "Like"}
        </button>
    );
}