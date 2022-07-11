pipeline {
  agent any
  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-mgpearce')
  }
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t mgpearce/dp-alpine:latest .'
      }
    }
    stage('Run') {
      steps {
        sh 'docker run -d --rm --name dockerhub-example -p 3000:3000 mgpearce/dp-alpine:latest'
        input message: 'Finished checking the web site? (Click "Proceed" to continue)'
      }
    }
    stage('Login') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
    stage('Push') {
      steps {
        sh 'docker push mgpearce/dp-alpine:latest'
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}