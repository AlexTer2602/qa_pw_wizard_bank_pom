import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {

  const openAccountPage = new OpenAccountPage(page);
  
  await openAccountPage.open();

  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.assertCurrencyDropDownContainsCorrectValue('Dollar');
  await openAccountPage.selectCurrency('Pound');
  await openAccountPage.assertCurrencyDropDownContainsCorrectValue('Pound');
  await openAccountPage.selectCurrency('Rupee');
  await openAccountPage.assertCurrencyDropDownContainsCorrectValue('Rupee');

});
