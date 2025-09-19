import { test, expect } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { faker } from '@faker-js/faker';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {

    const addCustomerPage = new AddCustomerPage(page);
  
     firstName = faker.person.firstName();
     lastName = faker.person.lastName();
     postCode = faker.location.zipCode();
  
    await addCustomerPage.open();
    await addCustomerPage.addCustomer(firstName, lastName, postCode);
    

  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

});

test('Assert manager can search customer by First Name', async ({ page }) => {

const customersListPage = new CustomersListPage(page);

    await customersListPage.open();

    await customersListPage.searchInput.fill(firstName);

    const customerRow = page.locator('table tbody tr').first();

    await expect(customerRow.locator('td').nth(0)).toHaveText(firstName);
    await expect(customerRow.locator('td').nth(1)).toHaveText(lastName);
    await expect(customerRow.locator('td').nth(2)).toHaveText(postCode);

    await expect(page.locator('table tbody tr')).toHaveCount(1);
  /* 
  Test:
  1. Open Customers page.
  2. Fill the firstName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
});
