import { Page, Locator } from "playwright";
import BasePage from "./BasePage";
import { AddCustomerData, CustomerDetails } from "../models/AddCustomerData";
import { OpenAccountData } from "../models/OpenAccountData";

export class ManagerPage extends BasePage{
    readonly addCustomerBtn:Locator;
    readonly openAccountBtn:Locator;
    readonly customersBtn:Locator;
    readonly firstNameInput:Locator;
    readonly lastNameInput:Locator;
    readonly postCodeInput:Locator;
    readonly addCustomerSubmitBtn:Locator;
    readonly customerSelect:Locator;
    readonly currencySelect:Locator;
    readonly processBtn:Locator;
    readonly customerSearchInput:Locator;
    readonly customerList:Locator;
    readonly customerFirstName:Locator;
    readonly customerLastName:Locator;
    readonly customerPostCode:Locator;
    readonly customerAccountNumber:Locator;
    readonly customerDetails: Map<number, CustomerDetails> = new Map();
    readonly customerDetailsList: CustomerDetails[] = [];


    constructor(page:Page){
        super(page);
        this.addCustomerBtn=page.locator('//button[@ng-click="addCust()"]');
        this.openAccountBtn=page.locator('//button[@ng-click="openAccount()"]');
        this.customersBtn=page.locator('//button[@ng-click="showCust()"]');
        this.firstNameInput=page.locator('//input[@ng-model="fName"]');
        this.lastNameInput=page.locator('//input[@ng-model="lName"]');
        this.postCodeInput=page.locator('//input[@ng-model="postCd"]');
        this.addCustomerSubmitBtn=page.locator('//button[@type="submit"][text()="Add Customer"]');
        this.customerSelect=page.locator('//select[@id="userSelect"]');
        this.currencySelect=page.locator('//select[@id="currency"]');
        this.processBtn=page.locator('//button[@type="submit"][text()="Process"]');
        this.customerSearchInput=page.locator('input[ng-model="searchCustomer"]');
        this.customerList=page.locator('//div[@class="marTop ng-scope"]//table//tbody//tr');
        this.customerFirstName=page.locator('//div[@class="marTop ng-scope"]//table//tbody//tr//td[1]');
        this.customerLastName=page.locator('//div[@class="marTop ng-scope"]//table//tbody//tr//td[2]');
        this.customerPostCode=page.locator('//div[@class="marTop ng-scope"]//table//tbody//tr//td[3]');
        this.customerAccountNumber=page.locator('//div[@class="marTop ng-scope"]//table//tbody//tr//td[4]');

    }

    async clickAddCustomer(){
        await this.click(this.addCustomerBtn);
    }

    async clickOpenAccount(){
        await this.click(this.openAccountBtn);
    }

    async clickCustomers(){
        await this.click(this.customersBtn);
    }

    async addCustomer(customerData: AddCustomerData){
        await this.type(this.firstNameInput,customerData.firstName);
        await this.type(this.lastNameInput,customerData.lastName);
        await this.type(this.postCodeInput,customerData.postCode);
    }

    async openAccount(customerName: string, currency: string){
        await this.click(this.openAccountBtn);
        await this.selectOption(this.customerSelect,customerName);
        await this.selectOption(this.currencySelect,currency);
    }   

    async searchCustomer(name:string){
        await this.type(this.customerSearchInput,name);
    }

    async getCustomerSearchResult(){
        return await this.getText(this.customerSearchInput.locator('..').locator('..').locator('tr').locator('td').nth(0));
    }

    async getCustomerCurrency(){
        return await this.getText(this.customerSearchInput.locator('..').locator('..').locator('tr').locator('td').nth(3));
    }   

    async getCustomerAccountNumber(){
        return await this.getText(this.customerSearchInput.locator('..').locator('..').locator('tr').locator('td').nth(2));
    }   

    async deleteCustomer(){
        await this.click(this.customerSearchInput.locator('..').locator('..').locator('tr').locator('td').nth(4).locator('button'));
    }   

    async submitCustomer(){
        let message = '';
        this.page.on('dialog', async dialog => {
            message += dialog.message();
            console.log("Dialog Message:", message);
            await dialog.accept();
        });
        await this.click(this.addCustomerSubmitBtn);
        return message;
    }

    async submitAccount(){
        let message = '';
        this.page.on('dialog', async dialog => {
            message += dialog.message();
            console.log("Dialog Message:", message);
            await dialog.accept();
        });
        await this.click(this.processBtn);
        return message;
    }

    async generatedID(message: string){
            const idReg = message.match(/ :\s*(\d+)/);
            const id = idReg ? idReg[1] : 'null';
            console.log("Generated ID:", id);
            console.log("Dialog Message:", message);
            return id;
    }

    async getCustomerDetails(count: number){
        for(let i=0; i<count; i++){
            const firstName = await this.customerFirstName.nth(i).innerText();
            const lastName = await this.customerLastName.nth(i).innerText();
            const postCode = await this.customerPostCode.nth(i).innerText();
            const accountNumber = await this.customerAccountNumber.nth(i).innerText();  
            console.log(`Customer ${i+1}: ${firstName} ${lastName}, Post Code: ${postCode}, Account Number: ${accountNumber}`);
            this.customerDetails.set(i+1, {firstName, lastName, postCode, accountNumber});
            this.customerDetailsList.push({firstName, lastName, postCode, accountNumber});
            //return {firstName, lastName, postCode, accountNumber};
        }
        //return this.customerDetails;
        return this.customerDetailsList;
    }

}