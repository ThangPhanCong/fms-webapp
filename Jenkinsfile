pipeline {
    agent {
        label 'master-client'
    }

    stages {

      stage('Login root user') {
          steps {
              sh 'sudo -i'
          }
      }

      stage('Install Dependencies') {
          steps {
              sh 'sudo npm i'
          }
      }

      //stage('Test') {
      //    steps {
      //        sh 'sudo npm test'
      //    }
      //}

      stage('Build') {
          steps {
              sh 'sudo NODE_ENV=production CONFIG=/home/jenkins/env/config-client.json webpack'
          }
      }
    }
}
