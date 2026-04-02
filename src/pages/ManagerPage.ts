import { Page, Locator } from "playwright";
import BasePage from "./BasePage";
import { AddCustomerData } from "../models/AddCustomerData";
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


    constructor(page:Page){
        super(page);
        this.addCustomerBtn=page.locator('//button[@ng-click="addCust()"]');
        this.openAccountBtn=page.locator('//button[@ng-click="openAccount()"]');
        this.customersBtn=page.locator('//button[@ng-click="showCustomer()"]');
        this.firstNameInput=page.locator('//input[@ng-model="fName"]');
        this.lastNameInput=page.locator('//input[@ng-model="lName"]');
        this.postCodeInput=page.locator('//input[@ng-model="postCd"]');
        this.addCustomerSubmitBtn=page.locator('//button[@type="submit"][text()="Add Customer"]');
        this.customerSelect=page.locator('#userSelect');
        this.currencySelect=page.locator('#currency');
        this.processBtn=page.locator('//button[@type="submit"][text()="Process"]');
        this.customerSearchInput=page.locator('input[ng-model="searchCustomer"]');

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

    async openAccount(accountData: OpenAccountData){
        await this.selectOption(this.customerSelect,accountData.customerName);
        await this.selectOption(this.currencySelect,accountData.currency);
        await this.click(this.processBtn);
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

    async generatedID(message: string){
            const idReg = message.match(/id :\s*(\d+)/);
            const id = idReg ? idReg[1] : 'null';
            console.log("Generated ID:", id);
            console.log("Dialog Message:", message);
            return id;
    }

}