import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, Col, Row } from "reactstrap";
import ProfilePost from "./ProfilePost";

export default function Profile(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/api/users/posts", {
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

    function validPosts() {
        return user && user?.posts && user?.posts[0]?.id !== null;
    }

    function toCreatePost(e) {
        e.preventDefault();
        navigate("/posts/add");
    }

    return (
        <div className="text-center">
            <h1 className="display-3 mb-5">Profile</h1>
            <div className="border-round border-shadow p-5 m-auto col-12 col-md-10 col-lg-8">
                <Row>
                    <Col className="col-4 col-md-3 col-lg-2 me-3">
                        <img
                            src="/imgs/profile-pic.png"
                            alt="profile-pic"
                            className="rounded-circle border-shadow-light"
                            style={{ maxWidth: "128px", maxHeight: "128px"}}
                        />
                    </Col>
                    <Col className="d-flex justify-content-between">
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
                    </Col>
                </Row>
            </div>
            <div className="d-flex flex-column align-items-center">
                <h2 className="display-5 my-3">Your Posts</h2>
                <Button color="primary" className="text-light my-3" onClick={toCreatePost}>Create Post</Button>
                { validPosts() ?
                    user.posts.map((post, index) => {
                        return (
                            <ProfilePost post={post} user={user} key={index}/>
                        )
                    })
                    :
                    <div className="border-round border-shadow col-12 col-md-10 col-lg-8 p-5 my-3">
                        <p className="mb-3">You don't have any posts yet!</p>
                        <Button
                            color="primary"
                            className="text-light"
                            onClick={toCreatePost}
                        >Get Started</Button>
                    </div>
                }
            </div>
        </div>
    );
}