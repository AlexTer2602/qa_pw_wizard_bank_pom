import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('input[placeholder="First Name"]');
    this.lastNameInput = page.locator('input[placeholder="Last Name"]');
    this.postCodeInput = page.locator('input[placeholder="Post Code"]');
    this.addCustomerButton = page.locator('button[type="submit"]');
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
    this.addCustomerButton.click()
    const [dialog] = await Promise.all([
    this.page.waitForEvent('dialog'),
  ]);

  expect(dialog.message()).toContain('Customer added successfully');
  await dialog.accept();
  } 
}
