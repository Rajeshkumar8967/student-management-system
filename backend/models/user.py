from datetime import datetime
import bcrypt


def create_user(db, username, password):
    try:
        existing_user = db.users.find_one({
            "username": username
        })

        if existing_user:
            return None, "Username already exists."

        password_hash = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        )

        user = {
            "username": username,
            "password": password_hash.decode("utf-8"),
            "created_at": datetime.utcnow()
        }

        result = db.users.insert_one(user)

        return str(result.inserted_id), None

    except Exception:
        return None, "Unable to create account. Please try again."

def authenticate_user(db, username, password):
    user = db.users.find_one({"username": username})

    if not user:
        return None

    password_matches = bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    )

    if not password_matches:
        return None

    return user