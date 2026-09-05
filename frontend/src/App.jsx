import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import "./pages/Auth.css";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const [mode, setMode] = useState("login");

  const [formUsername, setFormUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");

    if (token && savedUsername) {
      setUsername(savedUsername);
      setLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (event) => {
  event.preventDefault();

  setMessage("");
  setSuccess(false);

  // Basic validation
  if (!formUsername.trim()) {
    setMessage("Username is required.");
    return;
  }

  if (password.length < 6) {
    setMessage("Password must be at least 6 characters.");
    return;
  }

  if (mode === "register" && password !== confirmPassword) {
    setMessage("Passwords do not match.");
    return;
  }

  setLoading(true);

  const endpoint =
  mode === "login"
    ? `${API_URL}/api/auth/login`
    : `${API_URL}/api/auth/register`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formUsername.trim(),
        password,
      }),
    });

    const data = await response.json();

    setMessage(data.message);
    setSuccess(data.success);

    if (data.success && mode === "login") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      setUsername(data.username);
      setLoggedIn(true);
    }

    if (data.success && mode === "register") {
      setFormUsername("");
      setPassword("");
      setConfirmPassword("");

      setMode("login");
      setMessage("Registration successful. Please login.");
      setSuccess(true);
    }
  } catch {
    setMessage("Unable to connect to the server.");
    setSuccess(false);
  } finally {
    setLoading(false);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setLoggedIn(false);
    setUsername("");
    setFormUsername("");
    setPassword("");
    setConfirmPassword("");
    setMessage("");
  };

  if (loggedIn) {
    return (
      <Dashboard
        username={username}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Student Management</h1>

        <h2>
          {mode === "login"
            ? "Welcome Back"
            : "Create Account"}
        </h2>

        {message && (
          <div
            className={`auth-message ${
              success
                ? "auth-success"
                : "auth-error"
            }`}
          >
            {message}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <label>Username</label>

          <input
            className="auth-input"
            type="text"
            value={formUsername}
            onChange={(event) =>
              setFormUsername(event.target.value)
            }
            placeholder="Enter your username"
            required
          />

          <label>Password</label>

          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            required
          />

          {mode === "register" && (
  <>
    <label>Confirm Password</label>

    <input
      className="auth-input"
      type="password"
      value={confirmPassword}
      onChange={(event) =>
        setConfirmPassword(event.target.value)
      }
      placeholder="Confirm your password"
      required
    />
  </>
)}

          <button
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        <div className="auth-switch">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <br />

          <button
            type="button"
            onClick={() => {
              setMode(
                mode === "login"
                  ? "register"
                  : "login"
              );

              setFormUsername("");
              setPassword("");
              setConfirmPassword("");
              setMessage("");
            }}
          >
            {mode === "login"
              ? "Create an account"
              : "Login here"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;