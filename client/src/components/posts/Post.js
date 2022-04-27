import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import LikeButton from "../likes/LikeButton";

export default function Post(props) {
    const { post } = props;
    const [user, setUser] = useState();
    const navigate = useNavigate();

    function handleComment(e) {
        // Go to the Add Comment page
        navigate("/posts/comments/add");
    }

    useEffect(() => {
        axios.get("http://localhost:5000/api/users", {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(err => {
            console.error("There was an error retrieving the user for this post.", err);
        })
    }, []);

    function postClicked(e) {
        e.preventDefault();
        navigate(`/posts/${post.id}/view`);
    }

    return (
        <div className="border-round border-shadow p-5 col-12 col-md-10 col-lg-8 cursor-pointer d-flex my-3" onClick={postClicked}>
            <img src="/imgs/profile-pic.png" alt="profile-pic" className="rounded-circle border-shadow-light me-5" style={{ width: "128px", height: "128px"}}/>
            <div className="d-flex flex-column">                
                <div>
                    <h3>{user?.display_name}</h3>
                    <h4>@{user?.username}</h4>
                </div>
                <div>
                    <p className="fs-5">
                        {post?.content}
                    </p>
                    <div>
                        {/* TODO May need to change post.likes to post.likes.length if it's treated as an array rather than counter */}
                        <LikeButton likes={post?.likes}></LikeButton>
                        <Button onClick={handleComment} color="primary text-light" className="ms-3"> Comment</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}