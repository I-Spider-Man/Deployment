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
        stage('Install Docker'){
            steps {
                script {
                    sh 'sudo apt-get update'
                    sh 'sudo apt-get install ca-certificates curl'
                    sh 'sudo install -m 0755 -d /etc/apt/keyrings'
                    sh 'sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc'
                    sh 'sudo chmod a+r /etc/apt/keyrings/docker.asc'
                    sh 'echo \
                        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
                        $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
                        sudo tee /etc/apt/sources.list.d/docker.list > /dev/null'
                    sh 'sudo apt-get update'
                    sh 'sudo apt-get install docker-ce docker-ce-cli containerd.io'
                }
            }
        }
        stage('Install Docker compose'){
            steps {
                script {
                    sh 'apt install docker-compose'
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
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
