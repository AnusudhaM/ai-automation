const fs = require('fs');
const path = require('path');

class TestReporter {
    constructor() {
        this.totalTests = 0;
        this.passedTests = 0;
        this.failedTests = 0;
        this.startTime = null;
        this.endTime = null;
        this.testResults = [];
    }

    startTestExecution() {
        this.startTime = new Date();
        console.log(`\n=== Test Execution Started at: ${this.startTime.toLocaleString()} ===\n`);
    }

    endTestExecution() {
        this.endTime = new Date();
        this.generateConsoleReport();
        this.generateHTMLReport();
    }

    recordTestResult(testCase) {
        this.totalTests++;
        this.testResults.push(testCase);
        
        if (testCase.status === 'PASS') {
            this.passedTests++;
        } else if (testCase.status === 'FAIL') {
            this.failedTests++;
        }
    }

    generateConsoleReport() {
        const executionTime = (this.endTime - this.startTime) / 1000;
        const passRate = (this.passedTests / this.totalTests) * 100;
        const failRate = (this.failedTests / this.totalTests) * 100;

        console.log('\n=== Test Execution Report ===');
        console.log(`Execution Date: ${this.startTime.toLocaleDateString()}`);
        console.log(`Total Test Cases: ${this.totalTests}`);
        console.log(`Passed: ${this.passedTests}`);
        console.log(`Failed: ${this.failedTests}`);
        console.log(`Pass Rate: ${passRate.toFixed(2)}%`);
        console.log(`Fail Rate: ${failRate.toFixed(2)}%`);
        console.log(`Execution Time: ${executionTime.toFixed(2)} seconds`);

        console.log('\n=== Detailed Results ===');
        this.testResults.forEach(test => {
            console.log(`\nTest Case: ${test.id}`);
            console.log(`Title: ${test.title}`);
            console.log(`Status: ${test.status}`);
            console.log(`Execution Time: ${test.executionTime}ms`);
            if (test.error) {
                console.log(`Error: ${test.error}`);
            }
        });
    }

    generateHTMLReport() {
        const executionTime = (this.endTime - this.startTime) / 1000;
        const passRate = (this.passedTests / this.totalTests) * 100;
        const failRate = (this.failedTests / this.totalTests) * 100;

        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test Execution Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { background-color: #f5f5f5; padding: 20px; border-radius: 5px; }
                .summary { margin: 20px 0; }
                .test-case { margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
                .pass { background-color: #e8f5e9; }
                .fail { background-color: #ffebee; }
                .metrics { display: flex; gap: 20px; }
                .metric { flex: 1; padding: 10px; background-color: #f5f5f5; border-radius: 5px; }
                .error { color: #d32f2f; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Test Execution Report</h1>
                <p>Execution Date: ${this.startTime.toLocaleString()}</p>
            </div>

            <div class="summary">
                <h2>Summary</h2>
                <div class="metrics">
                    <div class="metric">
                        <h3>Total Tests</h3>
                        <p>${this.totalTests}</p>
                    </div>
                    <div class="metric">
                        <h3>Passed</h3>
                        <p>${this.passedTests}</p>
                    </div>
                    <div class="metric">
                        <h3>Failed</h3>
                        <p>${this.failedTests}</p>
                    </div>
                    <div class="metric">
                        <h3>Pass Rate</h3>
                        <p>${passRate.toFixed(2)}%</p>
                    </div>
                    <div class="metric">
                        <h3>Execution Time</h3>
                        <p>${executionTime.toFixed(2)}s</p>
                    </div>
                </div>
            </div>

            <div class="details">
                <h2>Detailed Results</h2>
                ${this.testResults.map(test => `
                    <div class="test-case ${test.status.toLowerCase()}">
                        <h3>Test Case: ${test.id}</h3>
                        <p><strong>Title:</strong> ${test.title}</p>
                        <p><strong>Status:</strong> ${test.status}</p>
                        <p><strong>Execution Time:</strong> ${test.executionTime}ms</p>
                        ${test.error ? `<p class="error"><strong>Error:</strong> ${test.error}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </body>
        </html>
        `;

        // Create reports directory if it doesn't exist
        const reportsDir = path.join(__dirname, '../../test-results');
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }

        // Generate unique filename based on timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const reportPath = path.join(reportsDir, `test-report-${timestamp}.html`);

        // Write HTML report to file
        fs.writeFileSync(reportPath, html);
        console.log(`\nHTML report generated: ${reportPath}`);
    }
}

module.exports = TestReporter; 