pipeline {
    agent any

    tools {
        nodejs 'node26'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        TEST_CREDS = credentials('e2e-test-user')
    }

    stages {
        stage('Build') {
            steps {
                sh '''
                set -eu
                npm ci
                npx playwright install --with-deps
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                export TEST_USER_NAME=${TEST_CREDS_USR}
                export TEST_PASSWORD=${TEST_CREDS_PSW}

                npx playwright test --grep "smoke" --reporter=line
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }

        success {
            echo 'Playwright test suite completed successfully.'
        }

        failure {
            echo 'Playwright test suite failed.'
        }
    }
}
