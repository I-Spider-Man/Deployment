pipeline {
    agent any
    stages {
        stage('checkout') {
            steps {
                script {
                    checkout scmGit(branches: [[name: '*/Deployment-Backend']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/I-Spider-Man/Deployment.git']])
                }
            }
        }
        stage('Deploye') {
            steps {
                script {
                    sh 'docker-compose up'
                }
            }
        }
    }
}
