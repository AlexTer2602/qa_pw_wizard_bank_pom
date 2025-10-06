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
    await addCustomerPage.clickAddCustomerButton();

});

test('Assert manager can search customer by First Name', async ({ page }) => {

const customersListPage = new CustomersListPage(page);
const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.clickCustomersButton();
  await customersListPage.waitForLoading();
  await customersListPage.fillSearchFieldFirstName(firstName);
  await customersListPage.assertCustomerDataInFirstRow({ firstName, lastName, postCode });
  await customersListPage.assertOneRowPresent();

});
