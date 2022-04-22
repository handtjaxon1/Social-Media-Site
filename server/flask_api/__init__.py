from flask import Flask, session
app = Flask(__name__)

# Could add this to environment vars in a .env file after importing the dotenv package?
# need to move to a non-github folder
app.secret_key = "shhhhhh"