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