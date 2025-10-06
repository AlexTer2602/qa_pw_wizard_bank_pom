import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput =  page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });

    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.selectCustomerDropdown = page.locator('#userSelect');
    this.selectCurrencyDropdown = page.locator('#currency');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

   async addCustomer(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
   }
    
    async clickAddCustomerButton() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await this.addCustomerButton.click();
  }

    async clickCustomersButton() {
    await this.customersButton.click();
  }

    async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

    async selectCustomer(fullName) {
    await this.selectCustomerDropdown.selectOption(fullName);
  }

    async selectCurrency(currency) {
    await this.selectCurrencyDropdown.selectOption(currency);
  }

    async clickProcessButton() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await this.processButton.click();
  

  } 
}
