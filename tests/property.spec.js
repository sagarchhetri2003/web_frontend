// import { expect, test } from '@playwright/test';

// test.describe('All Properties Page Tests', () => {
//     test.beforeEach(async ({ page }) => {
//         await page.goto('http://localhost:3001/property'); // Adjust URL if necessary
//     });

//     test('should render properties correctly', async ({ page }) => {
//         // Check if the title is visible
//         await expect(page.locator('h1:has-text("Properties")')).toBeVisible();

//         // Check if the properties list container is visible
//         await expect(page.locator('div.my-8')).toBeVisible();

//         // Check if the filter button is visible
//         await expect(page.locator('button:has-text("Filter")')).toBeVisible();
//     });

//     test('should show filter modal when filter button is clicked', async ({ page }) => {
//         // Click the filter button to open the filter modal
//         await page.click('button:has-text("Filter")');

//         // Check if the filter modal is visible
//         await expect(page.locator('div[role="dialog"]')).toBeVisible();

//         // Check if filter options are visible in the modal
//         await expect(page.locator('li:has-text("Oldest")')).toBeVisible();
//         await expect(page.locator('li:has-text("Newest")')).toBeVisible();
//         await expect(page.locator('li:has-text("Price: Low to High")')).toBeVisible();
//         await expect(page.locator('li:has-text("Price: High to Low")')).toBeVisible();
//     });

//     test('should filter properties by date (Oldest)', async ({ page }) => {
//         // Open the filter modal
//         await page.click('button:has-text("Filter")');
//         await page.click('li:has-text("Oldest")');

//         // Wait for the properties to reload based on filter
//         await page.waitForTimeout(1000);

//         // Ensure that the properties list gets updated (this can be specific to your app)
//         const properties = await page.locator('div.my-8 > div').count();
//         expect(properties).toBeGreaterThan(0); // Verify that properties are displayed
//     });

//     test('should filter properties by price (Low to High)', async ({ page }) => {
//         // Open the filter modal
//         await page.click('button:has-text("Filter")');
//         await page.click('li:has-text("Price: Low to High")');

//         // Wait for the properties to reload based on filter
//         await page.waitForTimeout(1000);

//         // Ensure that the properties list gets updated
//         const properties = await page.locator('div.my-8 > div').count();
//         expect(properties).toBeGreaterThan(0); // Verify that properties are displayed
//     });

//     test('should navigate to the property page when a property is clicked', async ({ page }) => {
//         // Ensure that the properties are listed
//         const firstProperty = page.locator('div.my-8 > div').first();
        
//         // Click on the first property
//         await firstProperty.click();

//         // Ensure we are redirected to the correct property page
//         await expect(page).toHaveURL(/property/); // Adjust based on your URL pattern
//     });

//     test('should display search results and clear search filter', async ({ page }) => {
//         // Set the search term in the URL or state (simulate search)
//         await page.goto('http://localhost:3001/property', {
//             state: { search: 'Apartment' } // Simulating search query (if your app supports this)
//         });

//         // Check if the search result message is displayed
//         await expect(page.locator('div.flex > label')).toHaveText('Showing search results for : "Apartment"');

//         // Click the "Clear" button to reset the filters
//         await page.click('button:has-text("Clear")');

//         // Check that the search result message is cleared
//         await expect(page.locator('div.flex > label')).toBeHidden();
//     });

//     test('should handle empty property list', async ({ page }) => {
//         // Simulate an empty result by setting search to a non-existing term
//         await page.goto('http://localhost:3001/property', {
//             state: { search: 'NonExistingProperty' }
//         });

//         // Ensure that no properties are displayed
//         const properties = await page.locator('div.my-8 > div').count();
//         expect(properties).toBe(0); // Verify that no properties are displayed
//     });
// });
