import { useState } from "react";

function AddStudent({ onStudentAdded, onCancel }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login again.");
      setSuccess(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/students/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            course,
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to add student.");
        setSuccess(false);
        return;
      }

      setMessage(data.message);
      setSuccess(true);

      setName("");
      setCourse("");
      setEmail("");

      if (onStudentAdded) {
        onStudentAdded();
      }
    } catch (error) {
      setMessage("Unable to connect to the server.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-form">

      <div className="modal-header">
        <div>
          <h2>Add Student</h2>
          <p>Enter the student's information below.</p>
        </div>

        <button
          type="button"
          className="modal-close"
          onClick={onCancel}
          disabled={loading}
        >
          ×
        </button>
      </div>

      {message && (
        <div
          className={`form-message ${
            success ? "form-success" : "form-error"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Student Name</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter student name"
            required
          />
        </div>

        <div className="form-group">
          <label>Course</label>

          <input
            type="text"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            placeholder="Enter course"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-button"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Student"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default AddStudent;