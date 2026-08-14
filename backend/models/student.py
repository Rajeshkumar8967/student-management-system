from datetime import datetime
from bson import ObjectId


def create_student(db, name, course, email):
    student = {
        "name": name,
        "course": course,
        "email": email,
        "created_at": datetime.utcnow()
    }

    result = db.students.insert_one(student)

    return str(result.inserted_id)


def get_all_students(db):
    students = list(
        db.students.find().sort("created_at", -1)
    )

    for student in students:
        student["_id"] = str(student["_id"])

    return students


def get_student(db, student_id):
    try:
        student = db.students.find_one({
            "_id": ObjectId(student_id)
        })

        if student:
            student["_id"] = str(student["_id"])

        return student

    except Exception:
        return None


def update_student(db, student_id, name, course, email):
    try:
        result = db.students.update_one(
            {"_id": ObjectId(student_id)},
            {
                "$set": {
                    "name": name,
                    "course": course,
                    "email": email
                }
            }
        )

        return result.modified_count > 0

    except Exception:
        return False


def delete_student(db, student_id):
    try:
        result = db.students.delete_one({
            "_id": ObjectId(student_id)
        })

        return result.deleted_count > 0

    except Exception:
        return False