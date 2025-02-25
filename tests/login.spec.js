import { expect, test } from '@playwright/test';

test.describe('Login Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3001/login'); // Adjust if your frontend is running on a different port
    });

    test('should render login page correctly', async ({ page }) => {
        // Check if login page title is visible
        await expect(page.locator('h2:has-text("Welcome back!")')).toBeVisible();

        // Check if email input field is visible
        await expect(page.locator('input[placeholder="Enter your email"]')).toBeVisible();

        // Check if password input field is visible
        await expect(page.locator('input[placeholder="Enter your password"]')).toBeVisible();

        // Check if the "Sign In" button is visible
        await expect(page.locator('button:has-text("Sign In")')).toBeVisible();
    });

    test('should successfully log in with valid credentials', async ({ page }) => {
        // Fill in the email and password
        await page.fill('input[placeholder="Enter your email"]', 'sagarkshetri0000@gmail.com');
        await page.fill('input[placeholder="Enter your password"]', 'Sagar@1990');

        // Click the "Sign In" button
        await page.click('button:has-text("Sign In")');

        // Wait for redirection and check if URL is correct
        await expect(page).toHaveURL('http://localhost:3001'); // Adjust URL to home
    });

    test('should show an error message for invalid credentials', async ({ page }) => {
        // Enter incorrect credentials
        await page.fill('input[placeholder="Enter your email"]', 'wrong@example.com');
        await page.fill('input[placeholder="Enter your password"]', 'wrongpassword');

        // Click the "Sign In" button
        await page.click('button:has-text("Sign In")');

        // Expect an error toast message to be visible
        await expect(page.locator('text="Failed To Login"')).toBeVisible();
    });

    test('should toggle password visibility when clicking the eye button', async ({ page }) => {
        // Enter a password
        await page.fill('input[placeholder="Enter your password"]', 'password123');

        // Ensure the password input field is visible
        const passwordField = page.locator('input[placeholder="Enter your password"]');
        await expect(passwordField).toBeVisible();

        // Wait for the eye button to be visible
        const eyeButton = page.locator('button:has-text("eye")'); // Make sure the button has the correct text or aria-label
        await expect(eyeButton).toBeVisible();

        // Click the eye button to reveal the password
        await eyeButton.click();

        // Wait for the UI to update
        await page.waitForTimeout(200);

        // Check if password input type is "text" (visible password)
        const inputType = await passwordField.getAttribute('type');
        expect(inputType).toBe('text');

        // Click the eye button again to hide the password
        await eyeButton.click();

        // Wait for the UI to update again
        await page.waitForTimeout(200);

        // Check if password input type is back to "password" (hidden password)
        const hiddenType = await passwordField.getAttribute('type');
        expect(hiddenType).toBe('password');
    });

    test('should redirect to home if already authenticated', async ({ page }) => {
        await page.evaluate(() => {
            localStorage.setItem('_hw_userDetails', JSON.stringify({ token: 'dummyToken', role: ['user'] }));
            localStorage.setItem('_hw_token', 'dummyToken');
        });
    
        // Wait for page navigation to complete
        await page.goto('http://localhost:3001/login');
        await page.waitForTimeout(1000); // Wait for a second to ensure the redirect completes
    
        // Check the URL
        await expect(page).toHaveURL('http://localhost:3001'); // Make sure the URL matches your home page
    });
});
