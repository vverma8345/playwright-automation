# Install playwright 
npm init playwright@latest

# Check if intall correctly 
npx playwright --help

# Check test options 
npx playwright test --help


# you can run several commands:

  npx playwright test
    Runs the end-to-end tests. by defualt run headless mode

  npx playwright show-report
    Runs to show test-report.

  npx playwright test --headed
    Runs the end-to-end tests in browser headed mode.
  
  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.



Extensions:
1. DonEnv
2. JavaScript(ES6) code snippets
3. npm intellisense
4. path intellisense
5. Playwright Test for Visual Code
6. Prettier - code formatter
7. vcode-icons

