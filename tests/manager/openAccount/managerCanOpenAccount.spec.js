import { test, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

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

test('Assert manager can open account', async ({ page }) => {
    

    const addCustomerPage = new AddCustomerPage(page);
    const customersListPage = new CustomersListPage(page);

    const newCustomerFullName = `${firstName} ${lastName}`;

    await addCustomerPage.clickOpenAccountButton();
    await addCustomerPage.selectCustomer(newCustomerFullName);
    await addCustomerPage.selectCurrency('Pound');
    await addCustomerPage.clickProcessButton();
    await addCustomerPage.clickCustomersButton();
    await customersListPage.waitForLoading();
    await customersListPage.assertNewCustomerHasAccount();

});
