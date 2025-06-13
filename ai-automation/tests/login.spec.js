const { test, expect } = require('@playwright/test');
const TestReporter = require('./utils/test-reporter');

const reporter = new TestReporter();

test.describe('Login Test Scenarios', () => {
  test.beforeAll(() => {
    reporter.startTestExecution();
  });

  // Test Case 1: Successful login with valid credentials
  test('should login successfully with valid credentials', async ({ page }) => {
    const startTime = Date.now();
    let status = 'PASS';
    let error = null;

    try {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('input[name="user-name"]', 'standard_user');
      await page.fill('input[name="password"]', 'secret_sauce');
      await page.click('input[type="submit"]');
      
      // Verify successful login
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    } catch (e) {
      status = 'FAIL';
      error = e.message;
    }

    const executionTime = Date.now() - startTime;
    reporter.recordTestResult({
      id: 'TC_001',
      title: 'Successful login with valid credentials',
      status: status,
      executionTime: executionTime,
      error: error
    });
  });

  // Test Case 2: Failed login with invalid username
  test('should show error with invalid username', async ({ page }) => {
    const startTime = Date.now();
    let status = 'PASS';
    let error = null;

    try {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('input[name="user-name"]', 'secret_sauce');
      await page.fill('input[name="password"]', 'secret_sauce');
      await page.click('input[type="submit"]');
      
      // Verify error message
      await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    } catch (e) {
      status = 'FAIL';
      error = e.message;
    }

    const executionTime = Date.now() - startTime;
    reporter.recordTestResult({
      id: 'TC_002',
      title: 'Failed login with invalid username',
      status: status,
      executionTime: executionTime,
      error: error
    });
  });

  // Test Case 3: Failed login with invalid password
  test('should show error with invalid password', async ({ page }) => {
    const startTime = Date.now();
    let status = 'PASS';
    let error = null;

    try {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('input[name="user-name"]', 'standard_user');
      await page.fill('input[name="password"]', 'wrongPassword');
      await page.click('input[type="submit"]');
      
      // Verify error message
      await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    } catch (e) {
      status = 'FAIL';
      error = e.message;
    }

    const executionTime = Date.now() - startTime;
    reporter.recordTestResult({
      id: 'TC_003',
      title: 'Failed login with invalid password',
      status: status,
      executionTime: executionTime,
      error: error
    });
  });

  // Test Case 4: Empty username field
  test('should show error with empty username', async ({ page }) => {
    const startTime = Date.now();
    let status = 'PASS';
    let error = null;

    try {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('input[name="password"]', 'secret_sauce');
      await page.click('input[type="submit"]');
      
      // Verify validation message
      await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    } catch (e) {
      status = 'FAIL';
      error = e.message;
    }

    const executionTime = Date.now() - startTime;
    reporter.recordTestResult({
      id: 'TC_004',
      title: 'Empty username field',
      status: status,
      executionTime: executionTime,
      error: error
    });
  });

  // Test Case 5: Empty password field
  test('should show error with empty password', async ({ page }) => {
    const startTime = Date.now();
    let status = 'PASS';
    let error = null;

    try {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('input[name="user-name"]', 'standard_user');
      await page.click('input[type="submit"]');
      
      // Verify validation message
      await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
    } catch (e) {
      status = 'FAIL';
      error = e.message;
    }

    const executionTime = Date.now() - startTime;
    reporter.recordTestResult({
      id: 'TC_005',
      title: 'Empty password field',
      status: status,
      executionTime: executionTime,
      error: error
    });
  });

  // Test Case 6: Successful logout
  test('should logout successfully', async ({ page }) => {
    const startTime = Date.now();
    let status = 'PASS';
    let error = null;

    try {
      // First login
      await page.goto('https://www.saucedemo.com/');
      await page.fill('input[name="user-name"]', 'standard_user');
      await page.fill('input[name="password"]', 'secret_sauce');
      await page.click('input[type="submit"]');
      
      // Verify we're on the inventory page
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      
      // Click the burger menu
      await page.click('#react-burger-menu-btn');
      
      // Click logout link
      await page.click('#logout_sidebar_link');
      
      // Verify we're redirected back to login page
      await expect(page).toHaveURL('https://www.saucedemo.com/');
      
      // Verify login form is visible
      await expect(page.locator('input[name="user-name"]')).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
    } catch (e) {
      status = 'FAIL';
      error = e.message;
    }

    const executionTime = Date.now() - startTime;
    reporter.recordTestResult({
      id: 'TC_006',
      title: 'Successful logout',
      status: status,
      executionTime: executionTime,
      error: error
    });
  });

  test.afterAll(() => {
    reporter.endTestExecution();
  });
});
