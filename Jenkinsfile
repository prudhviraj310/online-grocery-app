pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKER_IMAGE_BACKEND = "prudhviraj/grocery-backend"
        DOCKER_IMAGE_FRONTEND = "prudhviraj/grocery-frontend"
    }

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/YOUR_GITHUB_REPO.git'
            }
        }

        stage('SonarQube Scan') {
            steps {
                sh 'sonar-scanner'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                sh 'bash security/trivy-scan.sh'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE_BACKEND ./backend'
                sh 'docker build -t $DOCKER_IMAGE_FRONTEND ./frontend'
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withDockerRegistry([ credentialsId: 'dockerhub', url: '' ]) {
                    sh 'docker push $DOCKER_IMAGE_BACKEND'
                    sh 'docker push $DOCKER_IMAGE_FRONTEND'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}