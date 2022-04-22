from flask import jsonify, request, redirect
from flask_api.models.user import User
from flask_api import app


# ---------- Database Entry Modifying Routes
@app.route("/api/users", methods=["POST"])
def create_user():
    validation = User.validate( request.json )
    
    if validation[0]:
        data = request.json
        data["profile_img_url"] = None
        User.create( data )
        return validation[1]
    elif not validation[0]:
        return validation[1], 400
@app.route("/api/users/<user_id>", methods=["PUT"])
def update_user( user_id ):
    validation = User.validate( request.json )
    
    if validation[0]:
        data = request.json
        data["id"] = user_id
        User.update( data )
        return validation[1]
    elif not validation[0]:
        return validation[1], 400
@app.route("/api/users/<user_id>", methods=["DELETE"])
def delete_user( user_id ):
    data = { "id": user_id }
    result = User.delete( data )
    return str(result)

# ---------- Get Method Routes
@app.route("/api/users", methods=["GET"])
def get_all_users():
    users = User.get_all(JSON=True)
    return jsonify(users)
@app.route("/api/users/<user_id>", methods=["GET"])
def get_one_user_by_id( user_id ):
    user = User.get_by_id( user_id, JSON=True )
    return user