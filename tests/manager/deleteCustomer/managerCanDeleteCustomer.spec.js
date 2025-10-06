import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

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
    await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can delete customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();

  await addCustomerPage.clickCustomersButton();
  await customersListPage.waitForLoading();
  await customersListPage.deleteNewCustomer();
  await customersListPage.assertCustomerDataDeleted({ firstName, lastName, postCode });
  await customersListPage.reloadPage();
  await customersListPage.assertCustomerDataDeleted({ firstName, lastName, postCode });

});
