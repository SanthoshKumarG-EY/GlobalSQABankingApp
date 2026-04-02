import { test, expect } from "../src/fixtures/BaseFixture";
import { DataGenerator } from "../src/utils/DataGenerator";
import { TestDataManager } from "../src/utils/TestManager";

test.describe('Manager Tests', () => {
    test('Add Customer', async ({ homePage, managerPage }) => {
        const customerData = DataGenerator.generateRandomUserData();  
        const saveCustomerData = TestDataManager.saveData(customerData);
        await homePage.navigateTo('/angularJs-protractor/BankingProject/#/login');
        await homePage.clickBankManagerLogin();
        await managerPage.clickAddCustomer();
        await managerPage.addCustomer(customerData);
        const alertMessage = await managerPage.submitCustomer();
        console.log("Alert from test: " + alertMessage);
        const generatedID = await managerPage.generatedID(alertMessage);
        console.log("Generated ID from test: " + generatedID);
        TestDataManager.overWriteData({customerID: generatedID, customerName: `${customerData.firstName} ${customerData.lastName}`});
    });
});
