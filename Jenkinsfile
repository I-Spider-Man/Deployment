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
        stage('Install Docker') {
            steps {
                script {
                    // Install Docker
                    sh 'sudo apt-get update && sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common'
                    sh 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -'
                    sh 'sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"'
                    sh 'sudo apt-get update && sudo apt-get install -y docker-ce docker-ce-cli containerd.io'

                    // Add Jenkins user to Docker group (optional, for running Docker commands without sudo)
                    sh 'sudo usermod -aG docker $USER'
                }
            }
        }
        
        stage('Install Docker Compose') {
            steps {
                script {
                    // Install Docker Compose
                    sh 'sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                    sh 'sudo chmod +x /usr/local/bin/docker-compose'
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
