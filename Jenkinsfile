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
                        sh "podman rm -f react_cnt || true"
                        sh "podman rmi react_app_image || true"
                    }
                }
            }
        }
        stage('Build'){
            steps{
                sh "podman build --ulimit nofile=5000:5000 -t react_app_image ReactApp/"
            }
        }
        stage('Deploy'){
            steps{
                sh "podman run -it -p 8888:3000 --name react_cnt react_app_image"
            }
        }
    }
}
