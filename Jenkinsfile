pipeline {
    agent any

    stages {

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

        stage('Docker Check') {
            steps {
                bat '''
                    "C:\\Users\\91703\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" --version
                    "C:\\Users\\91703\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" compose version
                '''
            }
        }
    }
}