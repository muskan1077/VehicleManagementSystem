pipeline {
    agent {
        label 'local'
    }

    options {
        disableConcurrentBuilds(abortPrevious: true)
    }

    stages {
        stage("Parallel"){
            parallel{
                stage('Hello') {
                    steps {
                        echo 'Hello World'
                    }
                }   
                stage('Cleanup'){
                    steps{
                        sh "docker rm -f react_cnt || true"
                        sh "docker rmi react_app_image || true"
                    }
                }
            }
        }
        stage('Build'){
            steps{
                sh "docker build --ulimit nofile=5000:5000 -t react_app_image ReactApp/"
            }
        }
        stage('Deploy'){
            steps{
                sh "docker run -it -p 8888:3000 --name react_cnt react_app_image"
            }
        }
    }
}
