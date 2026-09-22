# DevSecOps Security Scan Report

## Project
Student Management System

## Scan Tool
Trivy v0.74.0

## Objective
Identify vulnerabilities and security issues in the Docker images used by the Student Management System and evaluate the effect of remediation actions.

---

## 1. Initial Security Scan

### Backend Image

Image:
`student-management-backend:3`

The initial scan identified vulnerabilities in the Debian/Python-based backend image.

Notable findings included:

- CRITICAL vulnerability in `perl-base`
- HIGH vulnerabilities in `systemd`
- HIGH vulnerability in `util-linux`
- MEDIUM vulnerabilities in system packages
- Python/pip dependency vulnerabilities

The initial backend scan contained:

- UNKNOWN: 0
- LOW: 1
- MEDIUM: 5
- HIGH: 0
- CRITICAL: 0

The detailed scan also identified a CRITICAL `perl-base` vulnerability.

### Frontend Image

Image:
`student-management-frontend:3`

Initial scan:

- HIGH: 7
- MEDIUM: 1
- CRITICAL: 0
- Total: 8 vulnerabilities

The findings were primarily associated with packages in the Alpine base image, including `util-linux` and `libuuid`.

---

## 2. Remediation Actions

The following actions were performed:

1. Refreshed the Docker base images:

   - `python:3.12-slim`
   - `nginx:alpine`
   - `node:20-alpine`

2. Rebuilt both Docker images without using the previous build cache.

### Backend

```bash
docker build --no-cache \
  -t student-management-backend:security-fix ./backend