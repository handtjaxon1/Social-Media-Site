import React, { useState } from "react";

export default function Post(props) {
    const [post, setPost] = useState({});

    function handleLike(e) {
        
    }

    function handleComment(e) {

    }

    return (
        <div>
            <div>
                <img src="..." alt="profile-pic" />
                <div>
                    <h1>Display Name</h1>
                    <h2>Username</h2>
                </div>
            </div>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit neque necessitatibus amet fugiat quo velit repellendus soluta tenetur aliquid minus ea, reprehenderit, architecto quis ipsum deserunt tempora natus accusamus unde?
            </p>
            <div>
                <button onClick={handleLike}>{post.likes.length} Like</button>
                <button onClick={handleComment}>{post?.comments?.length} Comment</button>
            </div>
        </div>
    );
}