pipeline {
    agent any
    stages {
        stage('checkout') {
            steps {
                script {
                    checkout scmGit(branches: [[name: '*/Deployment-frontend-admin']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/I-Spider-Man/Deployment.git']])
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'docker build -t frontend .'
                }
            }
        }
 
        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
