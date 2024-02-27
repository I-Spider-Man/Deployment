pipeline {
    agent any
    stages {
        stage('checkout') {
            steps {
                script {
                    checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/I-Spider-Man/Deployment-Backend.git']])
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'docker build -t backend .'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose up'
                }
            }
        }
    }
}
