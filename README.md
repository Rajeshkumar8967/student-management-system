# Student Management System

A full-stack student management application built with **React, Flask, and MongoDB**. The application provides authenticated user access, student CRUD operations, search, dashboard statistics, input validation, and a responsive frontend.

## Overview

The project demonstrates full-stack application development with a clear separation between frontend, backend API, and database layers.

### Architecture

```text
                    Student Management System
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
              React + Vite         Flask REST API
               Frontend                Backend
                    │                   │
                    └────── HTTP ──────┘
                            │
                            ▼
                         MongoDB
```

## Features

### Authentication

* User registration and login
* JWT-based authentication
* Password hashing with bcrypt
* Protected student API endpoints
* JWT expiration handling
* Automatic logout for unauthorized API responses
* Duplicate username detection
* Frontend and backend validation

### Student Management

* Create student records
* View student records
* View individual students
* Update student information
* Delete students
* Search by name, course, or email
* Delete confirmation
* Form validation

### Dashboard

* Total student count
* Total course count
* Students added during the last 7 days
* Student search
* Responsive student table
* Add and edit student interfaces
* Loading, success, and error states
* Logged-in username display

## Technology Stack

| Layer            | Technology    |
| ---------------- | ------------- |
| Frontend         | React.js      |
| Frontend Tooling | Vite          |
| Language         | JavaScript    |
| Styling          | CSS           |
| Backend          | Python        |
| API Framework    | Flask         |
| Database         | MongoDB       |
| Database Driver  | PyMongo       |
| Authentication   | JWT           |
| Password Hashing | bcrypt        |
| CORS             | Flask-CORS    |
| Configuration    | python-dotenv |
| Version Control  | Git & GitHub  |

## Project Structure

```text
student-management-system/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── .gitignore
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── eslint.config.js
│
└── README.md
```

## Application Workflow

```text
User
 │
 ├── Register
 │      │
 │      ▼
 │   Flask API
 │      │
 │      ▼
 │   MongoDB
 │
 └── Login
        │
        ▼
   JWT Authentication
        │
        ▼
     Dashboard
        │
        ├── Add Student
        ├── View Students
        ├── Edit Student
        ├── Delete Student
        └── Search Students
               │
               ▼
            MongoDB
```

## Authentication

Authentication is implemented using JWT.

### Registration

```text
React Frontend
      │
      ▼
POST /api/auth/register
      │
      ▼
Flask validation
      │
      ▼
bcrypt password hashing
      │
      ▼
MongoDB
```

### Login

```text
React Frontend
      │
      ▼
POST /api/auth/login
      │
      ▼
Flask
      │
      ▼
MongoDB
      │
      ▼
bcrypt verification
      │
      ▼
JWT generated
      │
      ▼
React application
```

Authenticated API requests use:

```text
Authorization: Bearer <JWT_TOKEN>
```

## REST API

### Authentication

| Method | Endpoint             | Purpose           | Authentication |
| ------ | -------------------- | ----------------- | -------------- |
| POST   | `/api/auth/register` | Register user     | No             |
| POST   | `/api/auth/login`    | Authenticate user | No             |

### Students

| Method | Endpoint             | Purpose          | Authentication |
| ------ | -------------------- | ---------------- | -------------- |
| GET    | `/api/students/`     | Get all students | JWT            |
| POST   | `/api/students/`     | Create student   | JWT            |
| GET    | `/api/students/<id>` | Get student      | JWT            |
| PUT    | `/api/students/<id>` | Update student   | JWT            |
| DELETE | `/api/students/<id>` | Delete student   | JWT            |

## Database

MongoDB is used as the application's persistent data store.

### Users

The users collection contains authentication information such as:

```json
{
  "username": "example",
  "password": "<bcrypt-hash>",
  "created_at": "<timestamp>"
}
```

Passwords are hashed before being stored.

### Students

Student records contain information such as:

```json
{
  "name": "John Doe",
  "course": "MCA",
  "email": "john@example.com",
  "created_at": "<timestamp>"
}
```

## Configuration

The application uses environment variables for configuration.

### Backend

Create:

```text
backend/.env
```

Use:

```env
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=replace-with-a-long-random-secret
```

A safe template is provided in:

```text
backend/.env.example
```

**Do not commit `.env` files or real secrets to GitHub.**

### Frontend

Create:

```text
frontend/.env
```

Configure the backend API URL:

```env
VITE_API_URL=http://127.0.0.1:5000
```

## Prerequisites

Install the following:

* Python 3.x
* Node.js and npm
* MongoDB
* Git

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Rajeshkumar8967/student-management-system.git
cd student-management-system
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `backend/.env` and configure the MongoDB URI and JWT secret.

Start the backend:

```bash
python app.py
```

The API runs on:

```text
http://127.0.0.1:5000
```

### 3. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:5000
```

Start the development server:

```bash
npm run dev
```

Open the URL provided by Vite, normally:

```text
http://localhost:5173
```

## Security

The application currently implements:

* bcrypt password hashing
* JWT authentication
* JWT expiration
* Protected student endpoints
* Backend input validation
* Frontend input validation
* Environment-based configuration
* Secret exclusion through `.gitignore`
* Unauthorized-session handling

### Security consideration

The current frontend authentication flow stores the JWT in browser `localStorage`. This is acceptable for a learning project, but a production application should consider a more robust token-storage strategy, such as secure, appropriately configured HTTP-only cookies.

## Error Handling

The application handles common authentication and API errors, including:

* Invalid credentials
* Duplicate usernames
* Missing required fields
* Invalid student data
* Unauthorized API requests
* Database/API connection failures

## Development Highlights

This project demonstrates practical experience with:

* React component-based development
* REST API development
* Flask backend development
* MongoDB integration
* JWT authentication
* Password hashing
* CRUD operations
* API authentication
* Form validation
* Error handling
* Environment configuration
* Git and GitHub

## Future Improvements

Planned improvements include:

* Docker containerization
* Docker Compose deployment
* Automated CI/CD with GitHub Actions
* AWS deployment
* Infrastructure provisioning with Terraform
* Application monitoring with Prometheus and Grafana
* Automated testing
* Production-oriented deployment configuration

## Author

**Rajesh Kumar**

Aspiring DevOps & Cloud Engineer

GitHub: https://github.com/Rajeshkumar8967
