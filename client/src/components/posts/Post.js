import React from "react";
import { useNavigate } from "react-router-dom";
import { CLIENT_URLS } from "../../constants/clientRoutes";
import LikeButton from "../likes/LikeButton";

export default function Post(props) {
    const { post } = props;
    const navigate = useNavigate();

    function handleComment(e) {
        // Go to the Add Comment page
        navigate(CLIENT_URLS.add_comment);
    }

    return (
        <div>
            <div>
                {/* TODO Need to add the profile pic of the user who made the post. A default pic will do for now. */}
                {/* Should style this with a rounded border that is outline-primary or outline-secondary */}
                <img src="/imgs/profile-pic.png" alt="profile-pic" />
                <div>
                    <h1>Display Name</h1>
                    <h2>@username</h2>
                </div>
            </div>
            <p>
                {/* TODO Replace the lorem ipsm with this snipped */}
                {post?.content}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit neque necessitatibus amet fugiat quo velit repellendus soluta tenetur aliquid minus ea, reprehenderit, architecto quis ipsum deserunt tempora natus accusamus unde?
            </p>
            <div>
                {/* TODO May need to change post.likes to post.likes.length if it's treated as an array rather than counter */}
                <LikeButton likes={post?.likes}></LikeButton>
                <button onClick={handleComment}>{post?.comments?.length} Comment</button>
            </div>
        </div>
    );
}