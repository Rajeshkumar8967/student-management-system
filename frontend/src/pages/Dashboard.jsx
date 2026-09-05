import { useCallback, useEffect, useState } from "react";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import "./Dashboard.css";

function Dashboard({ username, onLogout }) {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const loadStudents = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      onLogout();
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/students/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        onLogout();
        return;
      }

      if (!response.ok) {
        setMessage(data.message || "Unable to load students.");

        if (response.status === 401) {
          onLogout();
        }

        return;
      }

      setStudents(data.students);
      setMessage("");
    } catch {
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }, [API_URL, onLogout]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleDelete = async (studentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_URL}/api/students/${studentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        onLogout();
        return;
      }

      if (!response.ok) {
        setMessage(data.message || "Unable to delete student.");
        return;
      }

      setMessage(data.message);

      await loadStudents();
    } catch {
      setMessage("Unable to connect to the server.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(searchText) ||
      student.course.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText)
    );
  });

  const totalStudents = students.length;

  const totalCourses = new Set(
    students.map((student) => student.course)
  ).size;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentStudents = students.filter((student) => {
    if (!student.created_at) {
      return false;
    }

    return new Date(student.created_at) >= sevenDaysAgo;
  }).length;

  return (
    <div className="dashboard">

      <nav className="navbar">
        <h1>Student Management</h1>

        <div className="user-area">
          <span>Welcome, {username}</span>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-content">

        {/* Statistics */}
        <div className="stats-grid">

          <div className="stat-card">
            <p>Total Students</p>
            <h3>{totalStudents}</h3>
          </div>

          <div className="stat-card">
            <p>Total Courses</p>
            <h3>{totalCourses}</h3>
          </div>

          <div className="stat-card">
            <p>Added Last 7 Days</p>
            <h3>{recentStudents}</h3>
          </div>

        </div>

        <div className="dashboard-header">
          <h2>Students</h2>

          <button
            className="add-button"
            onClick={() => {
              setMessage("");
              setShowAddStudent(true);
            }}
          >
            + Add Student
          </button>
        </div>

        <input
          className="search-box"
          type="text"
          placeholder="Search by name, course or email..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        {loading ? (
          <div className="empty-message">
            Loading students...
          </div>
        ) : students.length === 0 ? (
          <div className="empty-message">
            No students found.
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-message">
            No students match your search.
          </div>
        ) : (
          <div className="table-container">

            <table className="student-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id}>

                    <td>{student.name}</td>

                    <td>{student.course}</td>

                    <td>{student.email}</td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() => {
                          setMessage("");
                          setEditingStudentId(student._id);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(student._id)
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </main>

      {/* Add Student Modal */}
      {showAddStudent && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAddStudent(false);
            }
          }}
        >
          <div className="modal-card">
            <AddStudent
              onStudentAdded={() => {
                setShowAddStudent(false);
                loadStudents();
              }}
              onCancel={() => setShowAddStudent(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudentId && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setEditingStudentId(null);
            }
          }}
        >
          <div className="modal-card">
            <EditStudent
              studentId={editingStudentId}
              onUpdated={() => {
                setEditingStudentId(null);
                loadStudents();
              }}
              onCancel={() => setEditingStudentId(null)}
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;