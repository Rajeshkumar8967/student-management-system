pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    cd frontend
                    call npm ci
                '''
            }
        }

        stage('Credentials Test') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'student-management-jwt-secret',
                        variable: 'JWT_SECRET'
                    )
                ]) {
                    bat '''
                        if "%JWT_SECRET%"=="" (
                            echo Credential injection FAILED
                            exit /b 1
                        )

                        echo Jenkins credential injection SUCCESS
                    '''
                }
            }
        }

        stage('Lint') {
            steps {
                bat '''
                    cd frontend
                    call npm run lint
                '''
            }
        }

        stage('Test') {
            steps {
                bat '''
                    cd frontend
                    call npm test
                '''
            }
        }

        stage('Build') {
            steps {
                bat '''
                    cd frontend
                    call npm run build
                '''
            }
        }

        stage('Package') {
            steps {
                archiveArtifacts artifacts: 'frontend/dist/**', fingerprint: true
            }
        }

        stage('Docker Build') {
            steps {
                bat '''
                    docker build -t student-management-frontend:%BUILD_NUMBER% ./frontend
                    docker build -t student-management-backend:%BUILD_NUMBER% ./backend
                '''
            }
        }

        stage('Docker Image Validation') {
            steps {
                bat '''
                    docker image inspect student-management-frontend:%BUILD_NUMBER%

                    if %ERRORLEVEL% NEQ 0 (
                        echo Frontend image validation FAILED
                        exit /b %ERRORLEVEL%
                    )

                    docker image inspect student-management-backend:%BUILD_NUMBER%

                    if %ERRORLEVEL% NEQ 0 (
                        echo Backend image validation FAILED
                        exit /b %ERRORLEVEL%
                    )

                    echo Docker image validation PASSED
                '''
            }
        }

        stage('Security Scan - Trivy') {
            steps {
                bat '''
                    echo ========================================
                    echo Trivy Security Scan - Frontend
                    echo ========================================

                    "C:\\Users\\91703\\AppData\\Local\\Microsoft\\WinGet\\Packages\\AquaSecurity.Trivy_Microsoft.Winget.Source_8wekyb3d8bbwe\\trivy.exe" image --severity HIGH,CRITICAL --exit-code 1 student-management-frontend:%BUILD_NUMBER%

                    echo ========================================
                    echo Trivy Security Scan - Backend
                    echo ========================================

                    "C:\\Users\\91703\\AppData\\Local\\Microsoft\\WinGet\\Packages\\AquaSecurity.Trivy_Microsoft.Winget.Source_8wekyb3d8bbwe\\trivy.exe" image --severity HIGH,CRITICAL --exit-code 1 student-management-backend:%BUILD_NUMBER%
                '''
            }
        }
    }
}