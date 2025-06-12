const { test, expect } = require('@playwright/test');

test.describe('Login Test Scenarios', () => {
  // Test Case 1: Successful login with valid credentials
  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    await page.fill('input[name="user-name"]', 'standard_user');
    await page.fill('input[name="password"]', 'secret_sauce');
    await page.click('input[type="submit"]');
    
    // Verify successful login
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  });
  // Test Case 2: Failed login with invalid username
  test('should show error with invalid username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    await page.fill('input[name="user-name"]', 'secret_sauce');
    await page.fill('input[name="password"]', 'secret_sauce');
    await page.click('input[type="submit"]');
    
    // Verify error message
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
   
});
// Test Case 3: Failed login with invalid password
test('should show error with invalid password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  await page.fill('input[name="user-name"]', 'standard_user');
  await page.fill('input[name="password"]', 'wrongPassword');
  await page.click('input[type="submit"]');
  
  // Verify error message
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    
});

});
// Test Case 4: Empty username field
test('should show error with empty username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  await page.fill('input[name="password"]', 'secret_sauce');
  await page.click('input[type="submit"]');
  
  // Verify validation message
  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();

});
// Test Case 5: Empty password field
test('should show error with empty password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  await page.fill('input[name="user-name"]', 'standard_user');
  await page.click('input[type="submit"]');
  
  // Verify validation message
  await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
  await page.pause();
});
