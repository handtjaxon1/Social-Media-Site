from flask import jsonify, request

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from flask_api.models.comment import Comment
from flask_api import app

"""
    - Get one comment by its id.
    - Get all comments belonging to a post.
"""

"""
    --------------- CRUD Routes
"""
@app.route("/api/comments/<post_id>", methods=["POST"])
@jwt_required()
def create_comment( post_id ):
    user_id = get_jwt_identity()
    
    # ----- Validate the post.
    validation = Comment.validate( request.json )
    if validation[0]:
        # building data to be saved.
        data = {
            "content": request.json.get("content", None),
            "likes": 0,
            "post_id": post_id,
            "user_id": user_id
        }
        comment_id = Comment.create(data)
        
        res = jsonify({"confirmation": "Comment successfully created"})
        res.status_code = 201
        return res
    elif not validation[0]:
        res = jsonify(validation[1])
        res.status_code = 400
        return res
@app.route("/api/comments/<comment_id>", methods=["PUT"])
@jwt_required()
def update_comment( comment_id ):
    user_id = get_jwt_identity()
    
    # ----- Check if User owns Post.
    owner_check = Comment.check_owner( user_id, comment_id )
    if not owner_check:
        res = jsonify({"error": "Logged in user does not have authority to change this comment."})
        res.status_code = 401
        return res
    
    # ----- Validate Post
    validation = Comment.validate( request.json )
    if validation[0]:
        data = request.json
        data["id"] = comment_id
        Comment.update( data )
        res = jsonify({"confirmation": "Comment successfully updated"})
        res.status_code = 202
        return res
    elif not validation[0]:
        res = jsonify(validation[1])
        res.status_code = 400
        return res
@app.route("/api/comments/<comment_id>", methods=["DELETE"])
@jwt_required()
def delete_comment( comment_id ):
    user_id = get_jwt_identity()
    
    # ----- Check if User owns Post.
    owner_check = Comment.check_owner( user_id, comment_id )
    if not owner_check:
        res = jsonify({"error": "Logged in user does not have authority to delete this comment."})
        res.status_code = 401
        return res
    
    Comment.delete({ "id": comment_id })
    
    res = jsonify({"confirmation": "Comment successfully deleted"})
    res.status_code = 202
    return res

"""
    ---------------- GET Routes
"""
@app.route("/api/comments/<comment_id>", methods=["GET"])
@jwt_required()
def get_comment_by_id( comment_id ):
    res = jsonify( Comment.get_by_id({"id": comment_id}))
    res.status_code = 200
    return res
@app.route("/api/comments/post/<post_id>", methods=["GET"])
@jwt_required()
def get_all_post_comments_with_user( post_id ):
    res = jsonify( Comment.get_all_by_post_id_with_user({"post_id": post_id}) )
    res.status_code = 200
    return res