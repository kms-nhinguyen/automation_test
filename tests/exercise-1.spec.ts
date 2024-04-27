import { expect, test } from "@playwright/test";

test("Test case - buy iPhone 13 PRO",async ({page}) => {
    var orderID;

    await test.step("Step 1: Go to https://rahulshettyacademy.com/client site", async () => {
        await page.goto("https://rahulshettyacademy.com/client");
      });
    
    await test.step("Step 2: User login", async () => {
        await page.locator("input[id='userEmail']").fill("rahulshetty@gmail.com");
        await page.locator("input[id='userPassword']").fill("Iamking@000");
    });
   
    await test.step("Step 3: Click on Login button", async () => {
        await page.getByRole('button', { name: ("Login") }).click();
    });

    await test.step("Step 4: Verify that user is logged in successfully", async () => {
        await expect(page).toHaveURL( "https://rahulshettyacademy.com/client/dashboard/dash");
    });

    await test.step("Step 5: Click on Add to cart - iphone 13 pro", async () => {
        await page.locator('div.card-body:has(h5:has-text("IPHONE 13 PRO")) button.btn.w-10.rounded:has-text("Add To Cart")').click();
        // await page.getByRole('listitem')
        // .filter({hasText:'IPHONE 13 PRO'})
        // .locator("button:has-text('Add To Cart')").click();
        //.getByRole('button', { name: ('btn.w-10.rounded::has-text("Add To Cart")') }).click();
    });

    await test.step("Step 6: Click on Cart", async () => { 
        await page.locator('button.btn.btn-custom:has-text("Cart")').click();
    });
    
    await test.step("Step 7: Click on Check Out button", async () => { 
        await page.locator("button:has-text('Checkout')").click();
    });

    await test.step("Step 8: Select country", async () => {
        // Fill in the input field with "Vietnam"
        await page.locator('input[placeholder="Select Country"]').type('Vietnam');
        // Click on the suggestion item for "Vietnam"
        page.locator('span.ng-star-inserted:has-text("Vietnam")');
        await page.locator('span.ng-star-inserted:has-text("Vietnam")').click();
    
    });
    
    await test.step("Step 9: Click on Place Order", async () => { 
        //await page.locator("button:has-text('Place Order')").click();
        await page.locator('.btnn.action__submit').click();
            orderID = await page.textContent('label.ng-star-inserted')
        if(orderID != null){
            console.log('ID ODER ' + orderID);
            return ;
        }  else{
            return ;
        }
    });    

    await test.step("Step 10: Verify Order ID", async () => {
        // const orderId = await page.textContent('label.ng-star-inserted');
        await page.locator('button.btn.btn-custom:has-text("ORDERS")').click();
        const orderID_MyOrders = await page.textContent('th[scope="row"]');
        const orderID_fromCheckoutPage = orderID;
        if(orderID_fromCheckoutPage != null && orderID_MyOrders != null){
            console.log(`Order ID On Checkout Page: `,orderID_fromCheckoutPage)
            console.log('Order ID On Order List: ', orderID_MyOrders)
            const isMatchOrderID = orderID_fromCheckoutPage.toString().includes(orderID_MyOrders.toString());
            if(isMatchOrderID){
                console.log('Order ID is matched.');
            } else {
                console.log('Order ID is not matched.');
            }
        } else{
            return;
        }
    }); 
})
