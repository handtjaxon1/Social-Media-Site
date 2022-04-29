from datetime import timedelta
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask

load_dotenv()
import os

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})
jwt = JWTManager(app)

app.secret_key = os.getenv("SECRET_KEY")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
# TODO Can add this to the .env file, but for not this changes the default token expiration from 15 mins to 1 hour
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)