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

        stage('Lint') {
            steps {
                bat '''
                    cd frontend
                    call npm run lint
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
    }
}