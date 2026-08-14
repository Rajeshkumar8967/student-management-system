import os
import jwt
from functools import wraps
from flask import request, jsonify


def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):

        token = None

        auth_header = request.headers.get("Authorization")

        if auth_header:
            parts = auth_header.split(" ")

            if len(parts) == 2 and parts[0] == "Bearer":
                token = parts[1]

        if not token:
            return jsonify({
                "success": False,
                "message": "Authentication required."
            }), 401

        try:
            payload = jwt.decode(
                token,
                os.getenv("JWT_SECRET"),
                algorithms=["HS256"]
            )

            current_user = payload

        except jwt.ExpiredSignatureError:
            return jsonify({
                "success": False,
                "message": "Your session has expired. Please login again."
            }), 401

        except jwt.InvalidTokenError:
            return jsonify({
                "success": False,
                "message": "Invalid authentication token."
            }), 401

        return function(current_user, *args, **kwargs)

    return decorated