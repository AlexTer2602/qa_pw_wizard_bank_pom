import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert manager can add new customer', async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postCode);
  
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.clickCustomersButton();
  await customersListPage.waitForLoading();
  await customersListPage.assertCustomerDataInLastRow({ firstName, lastName, postCode });
  await customersListPage.assertNewCustomerHasNoAccount();

});

