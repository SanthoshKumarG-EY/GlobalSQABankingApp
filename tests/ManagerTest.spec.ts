import { test, expect } from "../src/fixtures/BaseFixture";
import { DataGenerator } from "../src/utils/DataGenerator";
import { TestDataManager } from "../src/utils/TestManager";

test.describe('Manager Tests', () => {
    test('Add Customer', async ({ homePage, managerPage }) => {
        const customerData = DataGenerator.generateRandomUserData();  
        const saveCustomerData = TestDataManager.saveData(customerData, 'addCustomerData');
        await homePage.navigateTo('/angularJs-protractor/BankingProject/#/login');
        await homePage.clickBankManagerLogin();
        await managerPage.clickAddCustomer();
        await managerPage.addCustomer(customerData);
        const alertMessage = await managerPage.submitCustomer();
        console.log("Alert from test: " + alertMessage);
        const generatedID = await managerPage.generatedID(alertMessage);
        console.log("Generated ID from test: " + generatedID);
        TestDataManager.writeData({customerID: generatedID, customerName: `${customerData.firstName} ${customerData.lastName}`}, 'customerData');
    });

    test('Open Account', async ({ homePage, managerPage }) => {
        const accountData = {
            customerName: TestDataManager.readData('customerData').customerName,
            currency: 'Dollar'
        };
        await homePage.navigateTo('/angularJs-protractor/BankingProject/#/login');
        await homePage.clickBankManagerLogin();
        await managerPage.openAccount('Harry Potter', 'Dollar');
        const alertMessage = await managerPage.submitAccount();
        console.log("Alert from test: " + alertMessage);
        const accountNumber = await managerPage.generatedID(alertMessage);
        console.log("Account Number from test: " + accountNumber);
        TestDataManager.writeData1({accountNumber: accountNumber, customerName: accountData.customerName}, 'accountData');
    });
});
