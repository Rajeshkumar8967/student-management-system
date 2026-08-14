# Student Management System

A full-stack Student Management System built with **React, Flask, MongoDB, and JWT authentication**. The application provides user authentication and a dashboard for managing student records through a clean and responsive web interface.

## Features

### Authentication

* User registration
* User login
* JWT-based authentication
* Password hashing using bcrypt
* JWT expiration
* Logout functionality
* Protected student API requests
* User-friendly authentication error messages

### Student Management

* Add new students
* View student records
* Edit student information
* Delete students
* Search students by name, course, or email
* Duplicate username handling
* Form validation

### Dashboard

* Total Students statistic
* Total Courses statistic
* Students added in the last 7 days
* Responsive dashboard
* Add Student modal
* Edit Student modal
* Friendly success and error messages

## Technology Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Python
* Flask
* Flask-CORS
* PyJWT
* bcrypt
* python-dotenv

### Database

* MongoDB
* PyMongo

### Development Tools

* Git
* GitHub
* VS Code
* npm
* Python virtual environment

## Project Architecture

```text
student-management/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AddStudent.jsx
│   │   │   ├── EditStudent.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Auth.css
│   │   ├── App.jsx
│   │   └── ...
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── models/
│   │   └── user.py
│   ├── routes/
│   │   ├── auth.py
│   │   └── students.py
│   ├── app.py
│   ├── requirements.txt
│   ├── .env
│   └── ...
│
└── README.md
```

## Application Flow

```text
User
 │
 ▼
React Frontend
 │
 ├── Login/Register
 │
 └── Dashboard
       │
       ├── Add Student
       ├── Edit Student
       ├── Delete Student
       └── Search
             │
             ▼
        Flask REST API
             │
             ├── JWT Authentication
             ├── Input Validation
             └── Business Logic
                    │
                    ▼
                 MongoDB
```

## Authentication Flow

```text
User enters credentials
        │
        ▼
React sends request
        │
        ▼
Flask authentication API
        │
        ▼
MongoDB user lookup
        │
        ▼
bcrypt password verification
        │
        ▼
JWT generated
        │
        ▼
Token stored by frontend
        │
        ▼
Protected API requests
```

## Environment Variables

### Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:5000
```

### Backend

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Do not commit real `.env` files or secrets to GitHub.**

Use `.env.example` files when sharing the required environment-variable structure.

## Installation and Setup

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd student-management
```

### 2. Backend setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the Flask server:

```bash
python app.py
```

The backend runs on:

```text
http://127.0.0.1:5000
```

### 3. Frontend setup

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
VITE_API_URL=http://127.0.0.1:5000
```

Start the React development server:

```bash
npm run dev
```

Open the URL displayed by Vite, normally:

```text
http://localhost:5173
```

## API Overview

### Authentication

| Method | Endpoint             | Purpose             |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a user     |
| POST   | `/api/auth/login`    | Authenticate a user |

### Students

| Method | Endpoint             | Purpose            |
| ------ | -------------------- | ------------------ |
| GET    | `/api/students/`     | Retrieve students  |
| POST   | `/api/students/`     | Add a student      |
| GET    | `/api/students/<id>` | Retrieve a student |
| PUT    | `/api/students/<id>` | Update a student   |
| DELETE | `/api/students/<id>` | Delete a student   |

Student API endpoints require JWT authentication.

## Security

The application currently implements:

* bcrypt password hashing
* JWT authentication
* JWT expiration
* Protected API requests
* Backend input validation
* Frontend input validation
* Duplicate username detection
* Environment variables for configuration
* `.gitignore` protection for environment files

## Current Project Status

### Completed

* [x] React frontend
* [x] Flask backend
* [x] MongoDB integration
* [x] User registration
* [x] User login
* [x] JWT authentication
* [x] Password hashing
* [x] Student CRUD
* [x] Student search
* [x] Dashboard statistics
* [x] Add Student modal
* [x] Edit Student modal
* [x] Form validation
* [x] Environment-based API configuration
* [x] Responsive UI

### Planned DevOps Improvements

* [ ] Dockerfile for frontend
* [ ] Dockerfile for backend
* [ ] Docker Compose
* [ ] MongoDB container
* [ ] Nginx reverse proxy
* [ ] CI/CD pipeline
* [ ] Cloud deployment
* [ ] Monitoring and logging

## Future Architecture

The next stage is to containerize the application using Docker:

```text
                    Docker Compose
                         │
             ┌───────────┼───────────┐
             │           │           │
             ▼           ▼           ▼
          Frontend     Flask      MongoDB
           React       API        Database
             │           │           │
             └───────────┴───────────┘
                   Docker Network
```

The project will then be extended with CI/CD and cloud deployment as part of the DevOps implementation.

## Author

**Rajesh Kumar**

MCA | Aspiring DevOps & Cloud Engineer

GitHub: `https://github.com/Rajeshkumar8967`

## License

This project is intended for educational and portfolio purposes.
