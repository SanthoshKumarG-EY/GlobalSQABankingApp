import { test, expect } from "../src/fixtures/BaseFixture";
import customerTestData from '../testdata/customerTest.json';

const { customer } = customerTestData;

test.describe('Customer Tests', () => {
    test('Customer Login', async ({ homePage, customerPage }) => { 
        await homePage.navigateTo('/angularJs-protractor/BankingProject/#/login');
        await homePage.clickCustomerLogin();
        await customerPage.login(customer.name);
        await expect(customerPage.accountNumber).toBeVisible();
        await customerPage.selectAccount(customer.accountNumber);
        const accountNumber = await customerPage.getText(customerPage.accountNumber);
        const accountBalance = await customerPage.getText(customerPage.accountBalance);
        const accountCurrency = await customerPage.getText(customerPage.accountCurrency);
        console.log(`Account Number: ${accountNumber}, Balance: ${accountBalance}, Currency: ${accountCurrency}`);  
    });

    test('Deposit Money', async ({ homePage, customerPage }) => {               
        await homePage.navigateTo('/angularJs-protractor/BankingProject/#/login');
        await homePage.clickCustomerLogin();
        await customerPage.login(customer.name);
        await expect(customerPage.accountNumber).toBeVisible();
        await customerPage.selectAccount(customer.accountNumber);
        await customerPage.deposit(customer.amount);
        const depositMessage = await customerPage.getMessage();
        console.log("Deposit Message: " + depositMessage);
        expect(depositMessage).toBe('Deposit Successful');
    });

    test('Withdraw Money', async ({ homePage, customerPage }) => {               
        await homePage.navigateTo('/angularJs-protractor/BankingProject/#/login');
        await homePage.clickCustomerLogin();
        await customerPage.login(customer.name);
        await expect(customerPage.accountNumber).toBeVisible();
        await customerPage.selectAccount(customer.accountNumber);
        await customerPage.withdraw(customer.amount); 
        const withdrawMessage = await customerPage.getMessage();
        console.log("Withdraw Message: " + withdrawMessage);
        expect(withdrawMessage).toBe('Transaction Failed. You can not withdraw amount more than the balance.');
    });

    test('Deposit and Withdraw Money', async ({ homePage, customerPage }) => {
        await homePage.navigateTo('/angularJs-protractor/BankingProject/#/login');
        await homePage.clickCustomerLogin();
        await customerPage.login(customer.name);    
        await expect(customerPage.accountNumber).toBeVisible();
        await customerPage.selectAccount(customer.accountNumber);
        await customerPage.deposit(customer.amount);
        const depositMessage = await customerPage.getMessage();
        console.log("Deposit Message: " + depositMessage);
        expect(depositMessage).toBe('Deposit Successful');
        await customerPage.withdraw(customer.withdrawalAmount); 
        const withdrawMessage = await customerPage.getMessage();
        console.log("Withdraw Message: " + withdrawMessage);
        expect(withdrawMessage).toBe('Transaction successful');
    });
});