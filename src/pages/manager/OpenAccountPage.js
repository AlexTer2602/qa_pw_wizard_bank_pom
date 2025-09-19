import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.locator('#userSelect'); 
    this.currencyDropDown = page.locator('#currency');   
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
  
  async selectCustomer(customerName) {
    await this.page.waitForSelector('#userSelect'); // чекати сам селект
  await this.page.waitForFunction(
    (name) => {
      const select = document.querySelector('#userSelect');
      return Array.from(select.options).some(option => option.text === name);
    },
    customerName
  );
  await this.customerDropDown.selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
  await this.page.waitForSelector('#currency');
  await this.page.waitForFunction(
    (currency) => {
      const select = document.querySelector('#currency');
      return Array.from(select.options).some(option => option.text === currency);
    },
    currency
  );
  await this.currencyDropDown.selectOption({ label: currency });

}

    /*  this.processButton.click()
  const [dialog] = await Promise.all([
    this.page.waitForEvent('dialog'),
  ]);

  expect(dialog.message()).toContain('Account created successfully');
  await dialog.accept();
  }*/

  async clickProcessButton() {
    this.processButton.click()
  const [dialog] = await Promise.all([
    this.page.waitForEvent('dialog'),
  ]);

  expect(dialog.message()).toContain('Account created successfully');
  await dialog.accept();
}
  
}
