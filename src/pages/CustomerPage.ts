import { Locator, Page } from "@playwright/test";
import BasePage from './BasePage';

export class CustomerPage extends BasePage{

    readonly yourNameSelect:Locator;
    readonly loginBtn:Locator;
    readonly accountNumberSelect:Locator;
    readonly accountNumber:Locator;
    readonly accountBalance:Locator;
    readonly accountCurrency:Locator;
    readonly transactionsBtn:Locator;
    readonly startDateInput:Locator;
    readonly endDateInput:Locator;
    readonly backBtn:Locator;
    readonly resetBtn:Locator;
    readonly dateSortBtn:Locator;
    readonly depositTab:Locator;
    readonly withdrawlTab:Locator;
    readonly amountInput:Locator;
    readonly depositBtn:Locator;
    readonly withdrawBtn:Locator;
    readonly transactionMsg:Locator;
    readonly logoutBtn:Locator;

    constructor(page:Page){
        super(page);
        this.yourNameSelect=page.locator('//select[@id="userSelect"]');
        this.loginBtn=page.locator('//button[@type="submit"][text()="Login"]');
        this.accountNumberSelect=page.locator('//select[@id="accountSelect"]');
        this.accountNumber=page.locator('//div[@ng-hide="noAccount"]/strong[1]');
        this.accountBalance=page.locator('//div[@ng-hide="noAccount"]/strong[2]');
        this.accountCurrency=page.locator('//div[@ng-hide="noAccount"]/strong[3]');
        this.transactionsBtn=page.locator('//div[@ng-hide="noAccount"]/button[1]');
        this.backBtn=page.locator('//button[@ng-click="back()"][text()="Back"]');
        this.startDateInput=page.locator('//input[@id="start"]');  
        this.endDateInput=page.locator('//input[@id="end"]');  
        this.resetBtn=page.locator('//button[@ng-click="reset()"][text()="Reset"]');
        this.dateSortBtn=page.locator('(//table[@class="table table-bordered table-striped"]//tr//a)[1]');
        this.depositTab=page.locator('//div[@ng-hide="noAccount"]/button[2]');
        this.withdrawlTab=page.locator('//div[@ng-hide="noAccount"]/button[3]');
        this.amountInput=page.locator('//input[@ng-model="amount"]');
        this.depositBtn=page.locator('//button[@type="submit"][text()="Deposit"]');
        this.withdrawBtn=page.locator('//button[@type="submit"][text()="Withdraw"]');
        this.transactionMsg=page.locator('//span[@ng-show="message"]');
        this.transactionsBtn=page.locator('//a[@href="#/customer/transactions"]');
        this.logoutBtn=page.locator('//button[@ng-show="logout"]');
    }

    async login(customerName:string){
        await this.click(this.yourNameSelect);
        await this.selectOptionByText(this.yourNameSelect,customerName);
        await this.click(this.loginBtn);
    }   
    async selectAccount(accountNumber:string){
        await this.click(this.accountNumberSelect);
        await this.selectOptionByLabel(this.accountNumberSelect,accountNumber);
    }
    async deposit(amount:string){
        await this.click(this.depositTab);
        await this.type(this.amountInput,amount);
        await this.click(this.depositBtn);
    }
    async withdraw(amount:string){
        await this.click(this.withdrawlTab);
        await this.type(this.amountInput,amount);
        await this.click(this.withdrawBtn);
    }
    async clickTransactions(){
        await this.click(this.transactionsBtn);
    }
    async clickLogout(){
        await this.click(this.logoutBtn);
    }
    async getMessage(){
        return await this.getText(this.transactionMsg);
    }
}