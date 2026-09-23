# DevSecOps Security Scan Report

## Project

Student Management System

## Scan Tool

Trivy v0.74.0

## Objective

The objective of this security assessment was to identify vulnerabilities in the
Docker images used by the Student Management System and integrate security
scanning into the CI/CD pipeline.

---

# 1. Initial Security Assessment

## Backend Docker Image

The initial backend image used a Debian/Python-based image.

The initial assessment identified vulnerabilities in operating-system packages
and Python-related components.

The initial backend scan included:

- LOW: 1
- MEDIUM: 5
- HIGH: 0
- CRITICAL: 0
- UNKNOWN: 0

The detailed assessment also identified a CRITICAL vulnerability in the
`perl-base` package.

Additional findings were associated with packages such as:

- systemd
- util-linux
- ncurses
- zlib
- perl
- Python/pip components

## Frontend Docker Image

The initial frontend image used an Alpine-based image.

Initial Trivy result:

- HIGH: 7
- MEDIUM: 1
- CRITICAL: 0
- UNKNOWN: 0
- Total: 8 vulnerabilities

---

# 2. CI/CD Security Integration

Trivy was integrated into the Jenkins pipeline after the Docker image build
and image validation stages.

The security stage scans both application images:

- Frontend Docker image
- Backend Docker image

The pipeline uses HIGH and CRITICAL severity levels as the security gate.

If a HIGH or CRITICAL vulnerability is detected, Trivy returns a non-zero
exit code and the Jenkins pipeline fails.

This prevents an image with unacceptable vulnerability findings from
automatically progressing through the pipeline.

---

# 3. Initial Jenkins Security-Gate Result

During the first Jenkins security scan, the pipeline correctly detected
vulnerabilities in the backend Docker image.

Backend result:

- HIGH: 44
- CRITICAL: 0
- Total: 44 HIGH vulnerabilities

The Jenkins pipeline therefore failed at the Trivy security stage.

This confirmed that the security gate was functioning correctly.

The frontend image at the same stage reported no vulnerabilities.

---

# 4. Remediation Actions

The following improvements were implemented:

### 4.1 Docker Base Image Refresh

Docker base images were refreshed to obtain newer package versions.

Images refreshed included:

- `python:3.12-slim`
- `python:3.12-alpine`
- `node:20-alpine`
- `nginx:alpine`

### 4.2 No-Cache Image Rebuild

Images were rebuilt using Docker's `--no-cache` option to ensure that
previous image layers were not reused during remediation testing.

Example:

```bash
docker build --no-cache \
  -t student-management-backend:alpine-test ./backend