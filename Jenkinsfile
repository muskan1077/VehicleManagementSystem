pipeline {
    agent none

    options {
        disableConcurrentBuilds(abortPrevious: true)
    }

    stages {
        stage("Parallel"){
            agent {
                label 'local'
            }
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
            agent {
                label 'local'
            }
            steps{
                sh "podman build --ulimit nofile=5000:5000 -t react_app_image ReactApp/"
                sh "podman run --name react_cnt react_app_image"
                sh "podman cp react_cnt:/app/build/ ."
                sh "scp -i /tmp/first-ec2.pem -r build/ ubuntu@3.26.26.129:/tmp/"
            }
        }
        stage('Deploy'){
            agent{
                label 'remote'
            }
            steps{
                sh "podman build -t nginx-image -f ReactApp/Nginxfile"
                sh "podman run -d -p 8181:80 --name nginx-server nginx-image:latest"
            }
        }
    }
}
