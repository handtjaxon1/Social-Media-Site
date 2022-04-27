import React, { useState } from "react";
import "./LikeButton.css";

export default function LikeButton(props) {
    // const { likes, isLiked, setIsLiked } = props;
    // TODO Could likely get these variables all from props passed down from the parent post/comment
    // const { likes } = props;
    let likes = 0;
    const [isLiked, setIsLiked] = useState(false);

    function handleLike(e) {
        e.preventDefault();
        // TODO Submit put request to api to like the corresponding post or comment that this like is placed on
        likes = likes + (isLiked ? 5 : -1);
        console.log(likes);
        setIsLiked(!isLiked);
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