pipeline {
    agent any

    stages {

      //stage('Login root user') {
      //    steps {
      //        sh 'sudo -i'
      //    }
      //}

      stage('Install Dependencies') {
          steps {
              sh 'npm i'
          }
      }

      //stage('Test') {
      //    steps {
      //        sh 'sudo npm test'
      //    }
      //}

      stage('Build') {
          steps {
              sh 'NODE_ENV=production CONFIG=/home/fms/config-client.json npm run build'
          }
      }

      stage('Deploy') {
          steps {
              sh 'chmod +x script/deploy'
			        sh './script/deploy'
          }
      }
    }
}
