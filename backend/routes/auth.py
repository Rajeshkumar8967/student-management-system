import os
import jwt
from datetime import datetime, timedelta, timezone

from flask import Blueprint, request, jsonify

from models.user import create_user, authenticate_user


def create_auth_routes(db):

    auth_bp = Blueprint("auth", __name__)

    @auth_bp.route("/register", methods=["POST"])
    def register():
        data = request.get_json() or {}

        username = data.get("username", "").strip()
        password = data.get("password", "")

        if not username or not password:
            return jsonify({
                "success": False,
                "message": "Username and password are required."
            }), 400

        if len(username) < 3:
            return jsonify({
                "success": False,
                "message": "Username must be at least 3 characters."
            }), 400

        if len(password) < 6:
            return jsonify({
                "success": False,
                "message": "Password must be at least 6 characters."
            }), 400

        user_id, error = create_user(
            db,
            username,
            password
        )

        if error:
            return jsonify({
                "success": False,
                "message": error
            }), 409

        return jsonify({
            "success": True,
            "message": "Registration successful.",
            "user_id": user_id
        }), 201

    @auth_bp.route("/login", methods=["POST"])
    def login():
        data = request.get_json() or {}

        username = data.get("username", "").strip()
        password = data.get("password", "")

        if not username or not password:
            return jsonify({
                "success": False,
                "message": "Please enter username and password."
            }), 400

        user = authenticate_user(
            db,
            username,
            password
        )

        if not user:
            return jsonify({
                "success": False,
                "message": "Invalid username or password."
            }), 401

        token = jwt.encode(
            {
                "user_id": str(user["_id"]),
                "username": user["username"],
                "exp": datetime.now(timezone.utc) + timedelta(hours=2)
            },
            os.getenv("JWT_SECRET"),
            algorithm="HS256"
        )

        return jsonify({
            "success": True,
            "message": "Login successful.",
            "token": token,
            "username": user["username"]
        }), 200

    return auth_bp