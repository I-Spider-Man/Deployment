pipeline {
    agent any
    stages {
        stage('checkout') {
            steps {
                script {
                    checkout scmGit(branches: [[name: '*/admin']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/I-Spider-Man/Deployment-Front-End-Admin.git']])
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'docker build -t admin .'
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
