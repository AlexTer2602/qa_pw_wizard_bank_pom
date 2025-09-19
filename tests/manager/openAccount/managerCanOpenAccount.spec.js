import { test, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName, lastName, postCode;


test.beforeEach(async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);
  
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postCode = faker.location.zipCode();
  
    await addCustomerPage.open();
    await addCustomerPage.addCustomer(firstName, lastName, postCode);
    
    await page.reload();

  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
});

test('Assert manager can add new customer', async ({ page }) => {
    

    const openAccountPage = new OpenAccountPage(page);
    const customersListPage = new CustomersListPage(page);

    await openAccountPage.open();

    await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
    await openAccountPage.selectCurrency('Dollar');
    await openAccountPage.clickProcessButton();
    

    await customersListPage.open();
    
    const lastRow = page.locator('table tbody tr').last();
    await expect(lastRow.locator('td').nth(0)).toHaveText(firstName);
    await expect(lastRow.locator('td').nth(1)).toHaveText(lastName);
    await expect(lastRow.locator('td').nth(2)).toHaveText(postCode);
    


  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
});
