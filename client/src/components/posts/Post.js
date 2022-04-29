import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import LikeButton from "../likes/LikeButton";

export default function Post(props) {
    const { post } = props;
    const navigate = useNavigate();

    function handleComment(e) {
        // Go to the Add Comment page
        navigate("/posts/comments/add");
    }

    function postClicked(e) {
        e.preventDefault();
        navigate(`/posts/${post.id}/view`);
    }

    return (
        <div className="d-flex border-round border-shadow p-5 my-3 col-12 col-md-10 col-lg-8 cursor-pointer" onClick={postClicked}>
            <img
                src="/imgs/profile-pic.png"
                alt="profile-pic"
                className="img-profile rounded-circle border-shadow-light me-5"
            />
            <div className="d-flex flex-column">                
                <div>
                    <h4>{post?.user?.display_name}</h4>
                    <h5>@{post?.user?.username}</h5>
                </div>
                <div>
                    <p className="preserve-whitespace">
                        {post?.content}
                    </p>
                    <div>
                        <LikeButton post={post}/>
                        <Button
                            onClick={handleComment}
                            color="primary text-light"
                            className="ms-3"
                        >Comment</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}