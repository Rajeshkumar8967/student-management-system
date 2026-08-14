from flask import Blueprint, request, jsonify

from models.student import (
    create_student,
    get_all_students,
    get_student,
    update_student,
    delete_student
)

from middleware.auth import token_required


def create_student_routes(db):

    student_bp = Blueprint(
        "students",
        __name__
    )

    @student_bp.route("/", methods=["GET"])
    @token_required
    def get_students(current_user):

        students = get_all_students(db)

        return jsonify({
            "success": True,
            "students": students
        }), 200


    @student_bp.route("/", methods=["POST"])
    @token_required
    def add_student(current_user):

        data = request.get_json() or {}

        name = data.get("name", "").strip()
        course = data.get("course", "").strip()
        email = data.get("email", "").strip()

        if not name or not course or not email:
            return jsonify({
                "success": False,
                "message": "All student fields are required."
            }), 400

        try:
            student_id = create_student(
                db,
                name,
                course,
                email
            )

            return jsonify({
                "success": True,
                "message": "Student added successfully.",
                "student_id": student_id
            }), 201

        except Exception:
            return jsonify({
                "success": False,
                "message": "Unable to add student."
            }), 500


    @student_bp.route("/<student_id>", methods=["GET"])
    @token_required
    def get_single_student(current_user, student_id):

        student = get_student(
            db,
            student_id
        )

        if not student:
            return jsonify({
                "success": False,
                "message": "Student not found."
            }), 404

        return jsonify({
            "success": True,
            "student": student
        }), 200


    @student_bp.route("/<student_id>", methods=["PUT"])
    @token_required
    def edit_student(current_user, student_id):

        data = request.get_json() or {}

        name = data.get("name", "").strip()
        course = data.get("course", "").strip()
        email = data.get("email", "").strip()

        if not name or not course or not email:
            return jsonify({
                "success": False,
                "message": "All student fields are required."
            }), 400

        updated = update_student(
            db,
            student_id,
            name,
            course,
            email
        )

        if not updated:
            return jsonify({
                "success": False,
                "message": "Student could not be updated."
            }), 404

        return jsonify({
            "success": True,
            "message": "Student updated successfully."
        }), 200


    @student_bp.route("/<student_id>", methods=["DELETE"])
    @token_required
    def remove_student(current_user, student_id):

        deleted = delete_student(
            db,
            student_id
        )

        if not deleted:
            return jsonify({
                "success": False,
                "message": "Student not found."
            }), 404

        return jsonify({
            "success": True,
            "message": "Student deleted successfully."
        }), 200


    return student_bp