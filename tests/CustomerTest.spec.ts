import { test, expect } from "../src/fixtures/BaseFixture";
import { TestDataManager } from "../src/utils/TestManager";
import { DataGenerator } from "../src/utils/DataGenerator";

test.describe('Customer Tests', () => {
    test('Customer Login', async ({ homePage, customerPage }) => {
        const customerData = TestDataManager.readData('customerData');  
        await homePage.navigateTo('/angularJs-protractor/BankingProject/#/login');
        await homePage.clickCustomerLogin();
        await customerPage.login('Harry Potter');
        await expect(customerPage.accountNumber).toBeVisible();
        await customerPage.selectAccount('1004');
        const accountNumber = await customerPage.getText(customerPage.accountNumber);
        const accountBalance = await customerPage.getText(customerPage.accountBalance);
        const accountCurrency = await customerPage.getText(customerPage.accountCurrency);
        console.log(`Account Number: ${accountNumber}, Balance: ${accountBalance}, Currency: ${accountCurrency}`);  
    });

    test('Deposit Money', async ({ homePage, customerPage }) => {               
        const customerData = TestDataManager.readData('customerData');
        const accountData = TestDataManager.readData('accountData');
        await homePage.navigateTo('/angularJs-protractor/BankingProject/#/login');
        await homePage.clickCustomerLogin();
        await customerPage.login('Harry Potter');
        await expect(customerPage.accountNumber).toBeVisible();
        await customerPage.selectAccount('1004');
        await customerPage.deposit('500');
        const depositMessage = await customerPage.getMessage();
        console.log("Deposit Message: " + depositMessage);
        expect(depositMessage).toBe('Deposit Successful');
    });

    test('Withdraw Money', async ({ homePage, customerPage }) => {               
        const customerData = TestDataManager.readData('customerData');
        const accountData = TestDataManager.readData('accountData');
        await homePage.navigateTo('/angularJs-protractor/BankingProject/#/login');
        await homePage.clickCustomerLogin();
        await customerPage.login('Harry Potter');
        await expect(customerPage.accountNumber).toBeVisible();
        await customerPage.selectAccount('1004');
        await customerPage.withdraw('100'); 
        const withdrawMessage = await customerPage.getMessage();
        console.log("Withdraw Message: " + withdrawMessage);
        expect(withdrawMessage).toBe('Transaction Failed. You can not withdraw amount more than the balance.');
    });
});