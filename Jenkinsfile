pipeline {
    agent any

    environment {
        IMAGE_NAME = "divyakeerthana76-cse/ship-it"
        PORT = "3004"
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    docker rm -f ship-it 2>/dev/null || true
                    docker run -d --name ship-it -p ${PORT}:3000 -e SHIP_TOKEN=\${SHIP_TOKEN} ${IMAGE_NAME}:${BUILD_NUMBER}
                """
            }
        }
    }
}
