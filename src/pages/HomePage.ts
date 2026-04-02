import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

export class HomePage extends BasePage{

    readonly customerLoginBtn: Locator;
    readonly bankManagerLoginBtn: Locator;
    readonly homeBtn: Locator;
    readonly title: Locator;
    constructor(page:Page){
        super(page);
        this.customerLoginBtn=page.getByRole('button', { name: /Customer Login/i });
        this.bankManagerLoginBtn=page.getByRole('button', { name: /Bank Manager Login/i });
        this.homeBtn=page.getByRole('button', { name: /Home/i });
        this.title=page.locator('//strong[@class="mainHeading"]');
    }

    async clickCustomerLogin(){
        await this.click(this.customerLoginBtn);
    }

    async clickBankManagerLogin(){
        await this.click(this.bankManagerLoginBtn);
    }

    async clickHome(){
        await this.click(this.homeBtn);
    }

    async getTitleText(){
        return await this.getText(this.title);
    }
}
