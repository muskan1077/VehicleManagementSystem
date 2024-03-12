pipeline {
    agent none

    options {
        disableConcurrentBuilds(abortPrevious: true)
    }

    stages {
        stage("Building locally"){
            agent {
                label 'local'
            }
            stages{
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
                        sh "podman run -d --name react_cnt react_app_image"
                        sh "podman cp react_cnt:/app/build/ ."
                        sh "scp -i /tmp/first-ec2.pem -r build/ ubuntu@3.26.26.129:/tmp/"
                    }
                }
            }
        }
        stage('Deploy'){
            agent{
                label 'remote'
            }
            steps{
                sh "cp -r /tmp/build ./ReactApp/"
                sh "podman build -t nginx-image -f ReactApp/Nginxfile"
                sh "podman run -it -p 8181:80 --name nginx-server nginx-image:latest"
            }
        }
    }
}
