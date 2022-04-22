from flask import Flask, session
app = Flask(__name__)
# need to move to a non-github folder
app.secret_key = "shhhhhh"