import { Page, expect, test } from "@playwright/test";

let page: Page;

const newUsername = 'nhicherry';
const newPassword = 'nhi12345';

test.beforeAll(async () => {
    await test.step("Before all step", async () => {    
    });
  });
  
  test.afterAll(async () => {
    await test.step("After all step", async () => {
    });
  });
  
test.beforeEach(async ({ browser }) => {
    await test.step("Before each group 1: Go to OrangeHRM Login page", async () => {
    page = await browser.newPage();
    await page.goto(
        "https://opensource-demo.orangehrmlive.com/"
    );
    test('Pre-condition: Login to OrangeHRM and create an account on Admin page', async ({ page }) => {
        // Go to OrangeHRM login page
        test.setTimeout(300000);
        await page.goto('https://opensource-demo.orangehrmlive.com/', {waitUntil:'load'});
        await page.locator("input[name='username']").fill('Admin');
        await page.locator("input[name='password']").fill('Admin123');
        await page.locator('button:has-text("Login")').click();

        await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");

        //Click on Admin
        await page.locator("span:has-text('Admin')").click();

        //Click Add button
        await page.locator("button:has-text('Add')").click();

        //Select User role
        await page.locator(".oxd-select-wrapper:has-text('-- Select --')").click();
        await page.locator("//div[@class='oxd-select-text-input':has-text('Admin')]").click();
        
        // Input Emplopyee Name
        await page.getByPlaceholder('Type for hints...').fill('sww test');
        await page.waitForSelector('div[data-v-75e744cd][data-v-390abb6d] :has-text("sww test")', { timeout: 20000 });
        await page.locator('div[data-v-75e744cd][data-v-390abb6d] :has-text("sww test")').click();

        // Select Status
        await page.locator("div[data-v-957b4417] .oxd-select-text").click();
        await page.locator("div[data-v-957b4417] div:has-text('Enabled')").click();


        // Input Username
        await page.locator("input[data-v-1f99f73c]").fill('nhicherry');
        // Input password
        await page.locator("input[type='password']").fill('nhi12345');

        // Input Confirm Password
        await page.locator('input[data-v-1f99f73c]').fill('nhi12345');

        // Click Save button
        await page.locator("button:has-text('Save')").click();
        await page.close();
    });
    });
});
  
test.afterEach(async () => {
    await test.step("After each group 1: Close the page", async () => {
    await page.close();
    });
});


// Test Case 01: Verify that the user can log in successfully when provided the username and password correctly
test('Test case - 01: Verify that the user can log in successfully when provided the username and password correctly', async ({ page }) => {
    // Go to OrangeHRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // Input valid username and password
    await page.fill("input[name='username']", newUsername);
    await page.fill("input[name='password']", newPassword);

    // Click Login button
    await page.click('button:has-text("Login")');

    // Verify Dashboard page is displayed
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/dashboard', { timeout: 5000 });
});

// Verify that the user can not log in successfully when providing username is empty
test('Test case - 02: Verify that the user can not log in successfully when providing username is empty', async ({ page }) => {
    // Navigate to OrangeHRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // Username empty
    await page.fill("input[name='username']", '');

    // Input valid password
    await page.fill("input[name='password']", newPassword);

    // Click Login button
    await page.click('button:has-text("Login")');

    // Verify that "Required" message is displayed below username textbox
    await test.step("Step 4: Verify error message is displayed", async () => {
        await expect(page.locator(":text-is('Required')")).toBeVisible();
    });
});
