# Student Management System

A full-stack web application for managing student records with secure user authentication, student CRUD operations, search functionality, dashboard statistics, and a responsive user interface.

The application is built with **React.js and Vite** on the frontend, **Python Flask** on the backend, and **MongoDB** for data storage. Authentication is implemented using **JWT**, and user passwords are securely hashed using **bcrypt**.

---

## Features

### Authentication

* User registration
* User login
* JWT-based authentication
* JWT expiration after 2 hours
* Automatic logout when an authenticated API request returns `401 Unauthorized`
* Secure password hashing using bcrypt
* Logout functionality
* Protected student API requests
* Duplicate username detection
* Frontend and backend validation
* User-friendly authentication error messages

### Student Management

* Add students
* View all students
* View individual student records
* Edit student information
* Delete students
* Search students by:

  * Name
  * Course
  * Email
* Confirmation before deleting a student
* Form validation
* Authentication-protected student operations

### Dashboard

The dashboard provides:

* Total number of students
* Total number of courses
* Number of students added during the last 7 days
* Student search
* Student table
* Add Student modal
* Edit Student modal
* Edit and Delete actions
* Logged-in username display
* Logout functionality
* Loading states
* Success and error messages
* Responsive layout

---

## Technology Stack

| Layer                     | Technology           |
| ------------------------- | -------------------- |
| Frontend                  | React.js             |
| Frontend Tooling          | Vite                 |
| Frontend Language         | JavaScript           |
| Styling                   | CSS                  |
| Backend                   | Python               |
| API Framework             | Flask                |
| Database                  | MongoDB              |
| Database Driver           | PyMongo              |
| Authentication            | JSON Web Token (JWT) |
| Password Security         | bcrypt               |
| Cross-Origin Requests     | Flask-CORS           |
| Environment Configuration | python-dotenv        |
| Version Control           | Git                  |
| Repository                | GitHub               |

---

## Application Architecture

```text
                         Student Management System
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
             React + Vite                  Flask REST API
              Frontend                       Backend
                    │                           │
                    │       HTTP/JSON           │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                              MongoDB
                               Database
```

### Frontend

The React frontend provides the user interface for:

* Authentication
* Dashboard
* Student management
* Search
* Statistics
* Form handling
* Error and success messages

### Backend

The Flask backend provides REST API endpoints for:

* User registration
* User authentication
* JWT generation
* Student CRUD operations
* Authentication and authorization
* Input validation
* Database operations

### Database

MongoDB stores:

* User accounts
* Hashed passwords
* Student records
* Creation timestamps

---

## Project Structure

```text
student-management/
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── pages/
│   │   │   ├── AddStudent.jsx
│   │   │   ├── EditStudent.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Auth.css
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── models/
│   │   └── user.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   └── students.py
│   │
│   ├── app.py
│   ├── requirements.txt
│   ├── .env
│   └── ...
│
└── README.md
```

---

# Authentication

## Registration Flow

```text
User enters registration details
            │
            ▼
React validates input
            │
            ▼
POST /api/auth/register
            │
            ▼
Flask validates username/password
            │
            ▼
Check existing username
            │
            ▼
bcrypt password hashing
            │
            ▼
Store user in MongoDB
            │
            ▼
Registration successful
            │
            ▼
User returns to Login
```

### Registration validation

The application validates:

* Username is required
* Username must contain at least 3 characters
* Password is required
* Password must contain at least 6 characters
* Password confirmation must match
* Duplicate usernames are rejected

Example:

```text
Username: rajesh
Password: 123456
Confirm Password: 123457
```

Result:

```text
Passwords do not match.
```

---

## Login Flow

```text
User enters username/password
            │
            ▼
POST /api/auth/login
            │
            ▼
Flask searches MongoDB
            │
            ▼
bcrypt verifies password
            │
            ▼
JWT generated
            │
            ▼
JWT returned to React
            │
            ▼
Token stored in localStorage
            │
            ▼
Dashboard displayed
```

The JWT contains:

* User ID
* Username
* Expiration time

The current token expiration is **2 hours**.

---

## Protected API Requests

Authenticated requests include the JWT in the `Authorization` header:

```text
Authorization: Bearer <JWT_TOKEN>
```

If the backend returns:

```text
401 Unauthorized
```

the frontend clears the stored authentication information and returns the user to the login screen.

This prevents the application from continuing to operate with an expired or invalid session.

---

# Student Management

Authenticated users can manage student records through the dashboard.

## Add Student

The Add Student modal collects:

* Student name
* Course
* Email

The frontend validates the form before sending the request to Flask.

```text
React
  │
  ▼
POST /api/students/
  │
  ▼
Flask
  │
  ▼
MongoDB
  │
  ▼
Student created
```

After successful creation, the dashboard refreshes and the new student appears in the table.

---

## View Students

The dashboard retrieves student records through:

```text
GET /api/students/
```

Students are displayed in a table containing:

* Name
* Course
* Email
* Actions

---

## Edit Student

Clicking **Edit** opens the student information inside a modal.

The existing student information is loaded and can be modified.

```text
GET /api/students/<id>
```

After saving:

```text
PUT /api/students/<id>
```

The dashboard refreshes with the updated information.

---

## Delete Student

Clicking **Delete** first asks the user for confirmation.

After confirmation:

```text
DELETE /api/students/<id>
```

The student is removed from MongoDB and the dashboard is refreshed.

---

## Search

The dashboard provides client-side search functionality.

Users can search by:

```text
Student Name
Course
Email
```

The displayed table updates according to the search query.

---

# Dashboard Statistics

The dashboard calculates three statistics from the student data.

### Total Students

The total number of student records.

```text
students.length
```

### Total Courses

The number of unique courses:

```text
new Set(students.map(student => student.course)).size
```

### Added Last 7 Days

The number of students whose `created_at` timestamp falls within the previous seven days.

These statistics are calculated from the actual student data rather than using static values.

---

# Backend API

The application exposes REST API endpoints through Flask.

## Authentication API

### Register

```http
POST /api/auth/register
```

Request:

```json
{
  "username": "rajesh",
  "password": "123456"
}
```

Successful response:

```json
{
  "success": true,
  "message": "Registration successful.",
  "user_id": "..."
}
```

---

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "username": "rajesh",
  "password": "123456"
}
```

Successful response:

```json
{
  "success": true,
  "message": "Login successful.",
  "token": "...",
  "username": "rajesh"
}
```

---

## Student API

### Get all students

```http
GET /api/students/
```

Requires JWT authentication.

---

### Add student

```http
POST /api/students/
```

Requires JWT authentication.

Example request:

```json
{
  "name": "John Doe",
  "course": "MCA",
  "email": "john@example.com"
}
```

---

### Get individual student

```http
GET /api/students/<id>
```

Requires JWT authentication.

---

### Update student

```http
PUT /api/students/<id>
```

Requires JWT authentication.

Example request:

```json
{
  "name": "John Doe",
  "course": "MCA",
  "email": "john.updated@example.com"
}
```

---

### Delete student

```http
DELETE /api/students/<id>
```

Requires JWT authentication.

---

# Database

The application uses MongoDB with the following database:

```text
student_management
```

## Users

The `users` collection stores user authentication information.

Example document structure:

```json
{
  "_id": "...",
  "username": "rajesh",
  "password": "<bcrypt-hash>",
  "created_at": "..."
}
```

Passwords are **not stored as plain text**. They are hashed using bcrypt before being stored.

---

## Students

The `students` collection stores student information.

The student records contain information such as:

```json
{
  "_id": "...",
  "name": "John Doe",
  "course": "MCA",
  "email": "john@example.com",
  "created_at": "..."
}
```

The `created_at` field is also used by the dashboard to calculate the number of students added during the last seven days.

---

# Environment Configuration

The application uses environment variables rather than hardcoding configuration values.

## Frontend

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://127.0.0.1:5000
```

The React application reads the API URL using:

```javascript
import.meta.env.VITE_API_URL
```

---

## Backend

Create:

```text
backend/.env
```

Configure:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

The backend loads these values using `python-dotenv`.

### Security

Real `.env` files should not be committed to GitHub.

The repository ignores environment files through `.gitignore`.

Use `.env.example` files if environment-variable documentation needs to be included in the repository.

---

# Installation

## Prerequisites

Install:

* Python 3.x
* Node.js and npm
* MongoDB
* Git

---

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the environment on Windows:

```bash
venv\Scripts\activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Configure:

```text
backend/.env
```

with your MongoDB connection string and JWT secret.

Start Flask:

```bash
python app.py
```

The API runs on:

```text
http://127.0.0.1:5000
```

---

## Frontend Setup

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Configure:

```text
frontend/.env
```

with:

```env
VITE_API_URL=http://127.0.0.1:5000
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite, normally:

```text
http://localhost:5173
```

---

# Error Handling

The application uses user-friendly error messages rather than exposing internal backend exceptions.

Examples include:

```text
Invalid username or password.
```

```text
Username already exists.
```

```text
Username and password are required.
```

```text
Password must be at least 6 characters.
```

```text
Passwords do not match.
```

```text
Unable to connect to the server.
```

Authentication and database errors are handled at the appropriate application layers.

---

# Security Implementation

The current application includes the following security measures:

* bcrypt password hashing
* JWT authentication
* JWT expiration
* Protected student API endpoints
* Backend input validation
* Frontend input validation
* Generic invalid-login response
* Duplicate username detection
* Environment-based configuration
* Secrets excluded from Git
* Authentication state cleared on logout
* Expired/invalid JWT handling

The application does **not** store user passwords in plain text.

---

# User Interface

The application contains three primary user experiences:

### Login

```text
Student Management
Welcome Back

Username
[________________]

Password
[________________]

[       Login       ]

Don't have an account?
Create an account
```

### Registration

```text
Student Management
Create Account

Username
[________________]

Password
[________________]

Confirm Password
[________________]

[      Register     ]
```

### Dashboard

```text
Student Management                    Welcome, username
---------------------------------------------------------

Total Students     Total Courses     Added Last 7 Days
      10                 4                    2

Students                              + Add Student

[ Search by name, course or email... ]

---------------------------------------------------------
Name             Course       Email          Actions
---------------------------------------------------------
John Doe         MCA          john@...       Edit Delete
Jane Doe         BCA          jane@...       Edit Delete
---------------------------------------------------------
```

---

# Project Workflow

The complete application workflow is:

```text
                    User
                     │
                     ▼
              React Frontend
                     │
          ┌──────────┴──────────┐
          │                     │
       Register                Login
          │                     │
          └──────────┬──────────┘
                     ▼
                Flask API
                     │
                     ▼
                  MongoDB
                     │
                     ▼
              Authentication
                     │
                     ▼
                  JWT Token
                     │
                     ▼
                Dashboard
                     │
       ┌─────────────┼─────────────┐
       │             │             │
       ▼             ▼             ▼
      Add           Edit         Delete
       │             │             │
       └─────────────┼─────────────┘
                     ▼
                  MongoDB
                     │
                     ▼
              Updated Dashboard
```

---

# Development Highlights

This project demonstrates practical implementation of:

* Full-stack web application development
* REST API development
* React component-based architecture
* Flask API development
* MongoDB database integration
* JWT authentication
* Password hashing
* CRUD operations
* Client-side search
* Form validation
* Error handling
* Environment configuration
* Git/GitHub version control
* Frontend/backend separation

---

## Author

**Rajesh Kumar**

MCA | Aspiring DevOps & Cloud Engineer

GitHub: **Rajeshkumar8967**
