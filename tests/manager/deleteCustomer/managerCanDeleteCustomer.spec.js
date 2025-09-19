import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';


test.beforeEach(async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
  
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postCode = faker.location.zipCode();
  
    await addCustomerPage.open();
    await addCustomerPage.addCustomer(firstName, lastName, postCode);
    
    await page.reload();
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test('Assert manager can delete customer', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();

  const lastRow = page.locator('table tbody tr').last();
  const firstName = await lastRow.locator('td').nth(0).textContent();


  await lastRow.locator('button').click();
  await expect(page.locator(`table tbody tr:has-text("${firstName}")`)).toHaveCount(0);

  await page.reload();
  await customersListPage.open();

  await expect(page.locator(`table tbody tr:has-text("${firstName}")`)).toHaveCount(0);

  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
