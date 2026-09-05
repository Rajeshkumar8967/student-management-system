import { useEffect, useState } from "react";

function EditStudent({ studentId, onUpdated, onCancel }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudent = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/students/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Unable to load student.");
          setSuccess(false);
          return;
        }

        setName(data.student.name);
        setCourse(data.student.course);
        setEmail(data.student.email);
      } catch {
        setMessage("Unable to connect to the server.");
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [studentId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    if (!name.trim() || !course.trim() || !email.trim()) {
      setMessage("All student fields are required.");
      setSuccess(false);
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/students/${studentId}`,
        {
          method: "PUT",
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
        setMessage(data.message || "Unable to update student.");
        setSuccess(false);
        return;
      }

      setMessage(data.message);
      setSuccess(true);

      setTimeout(() => {
        onUpdated();
      }, 500);
    } catch {
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
          <h2>Edit Student</h2>
          <p>Update the student's information.</p>
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

      {loading && !name ? (
        <div className="modal-loading">
          Loading student...
        </div>
      ) : (
        <>
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
                required
              />
            </div>

            <div className="form-group">
              <label>Course</label>

              <input
                type="text"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
                {loading ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </form>
        </>
      )}

    </div>
  );
}

export default EditStudent;