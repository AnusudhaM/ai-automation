const { test, expect } = require('@playwright/test');
const testData = require('./test-credentials.json');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

test.describe('Login Credentials Test Suite', () => {
    let loginPage;
    let dashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
    });

    // Test valid credentials
    test('should login successfully with valid credentials', async ({ page }) => {
        await loginPage.navigate();
        await loginPage.login(
            testData.validCredentials.username,
            testData.validCredentials.password
        );
        
        // Verify successful login
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(dashboardPage.isInventoryVisible()).toBeTruthy();
    });

    // Test all invalid credential scenarios
    testData.invalidCredentials.forEach(credential => {
        test(`should show error for ${credential.scenario}`, async ({ page }) => {
            await loginPage.navigate();
            await loginPage.login(credential.username, credential.password);
            
            // Verify error message
            await expect(loginPage.isErrorMessageVisible()).toBeTruthy();
            const errorText = await loginPage.getErrorMessage();
            expect(errorText).toBe(credential.expectedError);
        });
    });
}); 