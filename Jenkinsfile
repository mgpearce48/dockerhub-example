pipeline {
  agent any
//   agent { label 'linux' }
//   options {
//     buildDiscarder(logRotator(numToKeepStr: '5'))
//   }
  environment {
    DOCKERHUB_CREDENTIALS = credentials('mgpearce-dockerhub')
  }
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t mgpearce/dp-alpine:latest .'
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