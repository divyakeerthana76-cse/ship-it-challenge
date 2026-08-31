pipeline {
    agent any

    environment {
        IMAGE_NAME = "divyakeerthana76-cse/ship-it"
        PORT = "3004"
    }

    stages {
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Image') {
            steps {
                bat "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Deploy') {
            steps {
                bat "docker rm -f ship-it || exit /b 0"
                bat "docker run -d --name ship-it -p ${PORT}:3000 -e SHIP_TOKEN=%SHIP_TOKEN% ${IMAGE_NAME}:${BUILD_NUMBER}"
            }
        }
    }
}