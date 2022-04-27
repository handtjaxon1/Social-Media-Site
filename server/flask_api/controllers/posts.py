from flask import jsonify, request

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from flask_api.models.post import Post
from flask_api import app

"""
    - POST new post
    - PUT update post by id. (only owner can update)
    - DELETE post by id. (only owner can delete)

    - GET all posts with their owner and likes.
    - GET one post by its id with its owner its comments and their owners.
"""

"""
    --------------- CRUD Routes
"""
@app.route("/api/posts", methods=["POST"])
@jwt_required()
def create_post():
    user_id = get_jwt_identity()
    
    # ----- Validate the post.
    validation = Post.validate( request.json )
    if validation[0]:
        # building data to be saved.
        data = {
            "content": request.json.get("content", None),
            "likes": 0,
            "user_id": user_id
        }
        post_id = Post.create(data)
        
        res = jsonify({"confirmation": "Post successfully created"})
        res.status_code = 201
        return res
    elif not validation[0]:
        res = jsonify(validation[1])
        res.status_code = 400
        return res
@app.route("/api/posts/<post_id>", methods=["PUT"])
@jwt_required()
def update_post( post_id ):
    user_id = get_jwt_identity()
    
    # ----- Check if User owns Post.
    owner_check = Post.check_owner( user_id, post_id )
    if not owner_check:
        res = jsonify({"error": "Logged in user does not have authority to change this post."})
        res.status_code = 401
        return res
    
    # ----- Validate Post
    validation = Post.validate( request.json )
    if validation[0]:
        data = request.json
        data["id"] = post_id
        Post.update( data )
        res = jsonify({"confirmation": "Post successfully updated"})
        res.status_code = 202
        return res
    elif not validation[0]:
        res = jsonify(validation[1])
        res.status_code = 400
        return res
@app.route("/api/posts/<post_id>", methods=["DELETE"])
@jwt_required()
def delete_post( post_id ):
    user_id = get_jwt_identity()
    
    # ----- Check if User owns Post.
    owner_check = Post.check_owner( user_id, post_id )
    if not owner_check:
        res = jsonify({"error": "Logged in user does not have authority to delete this post."})
        res.status_code = 401
        return res
    
    Post.delete({ "id": post_id })
    
    res = jsonify({"confirmation": "Post successfully deleted"})
    res.status_code = 202
    return res

"""
    ---------------- GET Routes
"""
@app.route("/api/posts", methods=["GET"])
@jwt_required()
def get_all_posts_with_users():
    res = jsonify( Post.get_all_with_user(JSON=True) )
    res.status_code = 200
    return res
@app.route("/api/posts/<post_id>", methods=["GET"])
@jwt_required()
def get_post_with_user_comments_and_comments_users( post_id ):
    res = jsonify( Post.get_by_id_with_comments({"post_id": post_id}))
    res.status_code = 200
    return res
@app.route("/api/posts/all", methods=["GET"])
@jwt_required()
def get_all_posts():
    res = jsonify( Post.get_all(JSON=True) )
    res.status_code = 200
    return res