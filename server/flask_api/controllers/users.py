from flask import jsonify, request
from flask_bcrypt import Bcrypt

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from flask_api.models.user import User
from flask_api import app

bcrypt = Bcrypt(app)

"""
    - GET user with posts.
"""

"""
    --------------- Login/Registration Routes
    Thanks to these sources for aid.
    https://www.youtube.com/watch?v=8-W2O_R95Pk
    https://flask-jwt-extended.readthedocs.io/en/stable/basic_usage/
"""
@app.route("/api/users/register", methods=["POST"])
def register_user():
    # ----- Check if user already exists.
    data = { "email": request.json["email"] }
    user_in_db = User.get_by_email( data )
    
    if user_in_db:
        res = jsonify({ "email": "User with specified email already exists." })
        res.status_code = 409
        return res
    
    # ----- If user does not exist, validate the form then save if correct.
    validation = User.validate( request.json, REGISTER=True )
    if validation[0]:
        # hashing password
        password_hash = bcrypt.generate_password_hash(request.json['password'])
        
        # building data to be saved, including hashed password.
        data = {
            "email": request.json["email"],
            "username": request.json["username"],
            "password": password_hash,
            "display_name": request.json["display_name"],
            "profile_img_url": None
        }
        user_id = User.create(data)
        
        # adding user to session and returning access token to client.
        access_token = create_access_token( identity=user_id )
        return jsonify( access_token=access_token )
    elif not validation[0]:
        res = jsonify(validation[1])
        res.status_code = 400
        return res
@app.route("/api/users/login", methods=["POST"])
def login_user():
    data = { "email": request.json.get("email", None) }
    user_in_db = User.get_by_email( data )
    
    # ----- Validate the form then check login criteria if correct.
    validation = User.validate( request.json )
    if not validation[0]:
        res = jsonify(validation[1])
        res.status_code = 400
        return res
    
    # ----- Check Credenitals
    if not user_in_db:
        res = jsonify({ "email": "User with specified email does not exist." })
        res.status_code = 400
        return res
    if not bcrypt.check_password_hash(user_in_db.password, request.json.get("password", None)):
        res = jsonify({ "password": "Password entered is incorrect." })
        res.status_code = 400
        return res
    
    access_token = create_access_token( identity=user_in_db.id )
    return jsonify( access_token=access_token )

"""
    --------------- Other CRUD Routes
"""
@app.route("/api/users", methods=["PUT"])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()
    validation = User.validate( request.json )
    
    if validation[0]:
        data = request.json
        data["id"] = user_id
        User.update( data )
        res = jsonify( validation[1] )
        return res
    elif not validation[0]:
        res = jsonify(validation[1])
        res.status_code = 400
        return res
@app.route("/api/users", methods=["DELETE"])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    confirm = User.delete({ "id": user_id })
    res = jsonify( confirm )
    return res

"""
    --------------- Get Method Routes
"""
@app.route("/api/users", methods=["GET"])
@jwt_required()
def get_logged_in_user():
    user_id = get_jwt_identity()
    data = { "id": user_id }
    res = jsonify(User.get_by_id( data, JSON=True ))
    res.status_code = 200
    return res
@app.route("/api/users/posts", methods=["GET"])
@jwt_required()
def get_logged_in_user_with_posts():
    user_id = get_jwt_identity()
    res = jsonify(User.get_user_by_id_with_posts({"id": user_id}))
    res.status_code = 200
    return res
