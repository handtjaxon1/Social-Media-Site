from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

load_dotenv()
import os

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

app.secret_key = os.getenv("SECRET_KEY")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")