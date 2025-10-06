import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.selectCurrencyDropdown = page.locator('#currency');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
  
 async selectCurrency(currency) {
    await this.selectCurrencyDropdown.selectOption(currency);
  }

  async assertCurrencyDropDownContainsCorrectValue(currency) {
    await expect(this.selectCurrencyDropdown).toHaveValue(currency);

} 
  
}
