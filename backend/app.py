from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

from routes.auth import create_auth_routes
from routes.students import create_student_routes

load_dotenv()

app = Flask(__name__)
CORS(app)

mongo_uri = os.getenv(
    "MONGO_URI",
    "mongodb://localhost:27017/"
)

client = MongoClient(mongo_uri)

db = client["student_management"]

db.users.create_index(
    "username",
    unique=True
)

try:
    client.admin.command("ping")
    print("MongoDB connected successfully!")
except Exception as e:
    print("MongoDB connection failed:", e)


@app.route("/")
def home():
    return {
        "message": "Student Management API is running",
        "database": "MongoDB connected"
    }


app.register_blueprint(
    create_auth_routes(db),
    url_prefix="/api/auth"
)

app.register_blueprint(
    create_student_routes(db),
    url_prefix="/api/students"
)


if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )