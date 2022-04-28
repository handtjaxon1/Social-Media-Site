import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "reactstrap";
import LikeButton from "./likes/LikeButton";

export default function Profile(props) {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/api/users/posts", {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(response => {
            setUser(response.data);
            setLoaded(true);
        })
        .catch(err => {
            console.error("There was an error retrieving the user for this post.", err);
        })
    }, []);

    function handleComment(e) {
        // Go to the Add Comment page
        navigate("/posts/comments/add");
    }

    function postClicked(e) {
        e.preventDefault();
    //     navigate(`/posts/${post.id}/view`);
    }

    return (
        <div>
            <h1>Profile</h1>
            <div className="border-round border-shadow p-5 col-12 col-md-10 col-lg-8 cursor-pointer my-3">
                <div className="row">
                    <img src="/imgs/profile-pic.png" alt="profile-pic" className="rounded-circle border-shadow-light me-5 col-1" style={{ width: "128px", height: "128px"}}/>
                    <div className="d-flex justify-content-between col">
                        <div>
                            <h4>{user?.display_name}</h4>
                            <h5>@{user?.username}</h5>
                        </div>
                        <div className="text-end">
                            <p>Email: {user?.email}</p>
                            <p>Profile Img URL: {user?.profile_img_url}</p>
                            <p>Created: {user?.created_at}</p>
                            <p>Updated: {user?.updated_at}</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                user.posts && loaded?
                user.posts.map( (post, index) => {
                    return (
                    <div
                        key={index}
                        className="border-round border-shadow p-5 col-12 col-md-10 col-lg-8 cursor-pointer my-3"
                        onClick={postClicked}
                        >
                        <p>{post.content}</p>
                        <div className="">
                            {/* TODO May need to change post.likes to post.likes.length if it's treated as an array rather than counter */}
                            <LikeButton
                                likes={post?.likes}>
                            </LikeButton>
                            <Button 
                                onClick={handleComment}
                                color="primary text-light"
                                className="ms-3"
                            >Comment</Button>
                        </div>
                    </div>
                    )
                })
                :null
            }
        </div>
    );
}