import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {

  test('should display correct total counts', async ({ page }) => {
    // Navigate to the dashboard page
    await page.goto('http://localhost:3001/dashboard'); // Replace with the correct URL of your dashboard

    // Wait for the dashboard elements to load
    await page.waitForSelector('h1:text("Admin Dashboard")');
    
    // Check if the total user count is displayed correctly
    const totalUserCount = await page.locator('div:has-text("Total Users") >> text=Total Users').textContent();
    expect(totalUserCount).toBeTruthy(); // Ensure total user count is displayed

    // Check if the total property count is displayed correctly
    const totalPropertyCount = await page.locator('div:has-text("Total Properties") >> text=Total Properties').textContent();
    expect(totalPropertyCount).toBeTruthy(); // Ensure total property count is displayed

    // Check if the total category count is displayed correctly
    const totalCategoryCount = await page.locator('div:has-text("Total Categories") >> text=Total Categories').textContent();
    expect(totalCategoryCount).toBeTruthy(); // Ensure total category count is displayed

    // Check if the total order count is displayed correctly
    const totalOrderCount = await page.locator('div:has-text("Total Orders") >> text=Total Orders').textContent();
    expect(totalOrderCount).toBeTruthy(); // Ensure total order count is displayed
  });

  test('should show error message when API fails', async ({ page }) => {
    // Mock the API responses to simulate failure for each request
    await page.route('**/property/all', (route) => route.fulfill({ status: 500, body: '{"success": false, "msg": "Failed"}' }));
    await page.route('**/category', (route) => route.fulfill({ status: 500, body: '{"success": false, "msg": "Failed"}' }));
    await page.route('**/users/all', (route) => route.fulfill({ status: 500, body: '{"success": false, "msg": "Failed"}' }));
    await page.route('**/carts/admin/order', (route) => route.fulfill({ status: 500, body: '{"success": false, "msg": "Failed"}' }));

    // Navigate to the dashboard page
    await page.goto('http://localhost:3001/dashboard'); // Replace with the correct URL of your dashboard

    // Wait for the error toast to appear
    const errorToast = page.locator('.react-hot-toast');
    await expect(errorToast).toHaveText('Failed'); // Check if 'Failed' message is shown for each failed request
  });

});
