import React from "react";
import LikeButton from "../likes/LikeButton";

export default function Comment(props) {
    return (
        <div>
            <div>
                <div>
                    <img src="..." alt="profile-pic" />
                    <div>
                        <h1>Display Name</h1>
                        <h2>Username</h2>
                    </div>
                </div>
                <div>
                    <LikeButton></LikeButton>
                </div>
            </div>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit neque necessitatibus amet fugiat quo velit repellendus soluta tenetur aliquid minus ea, reprehenderit, architecto quis ipsum deserunt tempora natus accusamus unde?
            </p>
        </div>
    );
}