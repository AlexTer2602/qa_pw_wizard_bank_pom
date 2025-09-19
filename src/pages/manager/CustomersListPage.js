import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input[placeholder="Search Customer"]');
    this.customersRows = page.locator('table tbody tr');
    this.deleteButtons = page.locator('button[ng-click="deleteCust(cust)"]');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async searchCustomer(firstname) {
    await this.searchInput.fill(firstname);
  }

  async searchCustomer(lastname) {
    await this.searchInput.fill(lastname);
  }

   async searchPostCode(postcd) {
    await this.searchInput.fill(postcd);
  }

  async deleteCustomerByIndex(index) {
    await this.deleteButtons.nth(index).click();
  }


  
}
