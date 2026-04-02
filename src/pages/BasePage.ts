import { Locator, Page } from "@playwright/test";

export default class BasePage{
    protected page:Page 

    constructor(page:Page){
        this.page=page;
    }   
    async click(locator:Locator){
        await locator.click();
    }       
    async type(locator:Locator,text:string){
        await locator.type(text);
    }
    async getText(locator:Locator){
        return await locator.textContent();
    }
    async isVisible(locator:Locator){
        return await locator.isVisible();
    }
    async navigateTo(url:string){
        await this.page.goto(url);
    }
    async getTitle(){
        return await this.page.title();
    }   
    async getURL(){
        return await this.page.url();
    }
    async waitForSelector(selector:string){
        await this.page.waitForSelector(selector);
    }
    async waitForTimeout(timeout:number){
        await this.page.waitForTimeout(timeout);
    } 
    async selectOption(locator:Locator,value:string){
        await locator.selectOption(value);
    }
    async check(locator:Locator){
        await locator.check();
    }   
    async uncheck(locator:Locator){
        await locator.uncheck();
    }   
    async isChecked(locator:Locator){       
        return await locator.isChecked();
    }   
    async hover(locator:Locator){
        await locator.hover();
    }
    async scrollIntoView(locator:Locator){
        await locator.scrollIntoViewIfNeeded();
    }
    async getAttribute(locator:Locator,attribute:string){
        return await locator.getAttribute(attribute);
    }
    async getValue(locator:Locator){
        return await locator.inputValue();
    }   
    async clear(locator:Locator){
        await locator.fill('');
    }
    async press(locator:Locator,key:string){
        await locator.press(key);
    }
    async getCount(locator:Locator){
        return await locator.count();
    }
    async getInnerText(locator:Locator){
        return await locator.innerText();
    }
    async getInnerHTML(locator:Locator){
        return await locator.innerHTML();
    }
    async getBoundingBox(locator:Locator){
        return await locator.boundingBox();
    }   
    async isDisabled(locator:Locator){
        return await locator.isDisabled();
    }
    async isEditable(locator:Locator){
        return await locator.isEditable();
    }   
    async isHidden(locator:Locator){
        return await locator.isHidden();
    }
    async isEnabled(locator:Locator){
        return await locator.isEnabled();
    }
    async isVisibleWithTimeout(locator:Locator,timeout:number){
        try{
            await locator.waitFor({state:'visible',timeout:timeout});   
            return true;
        }       
        catch{
            return false;
        }   
    }
    async isHiddenWithTimeout(locator:Locator,timeout:number){
        try{
            await locator.waitFor({state:'hidden',timeout:timeout});   
            return true;
        }       
        catch{
            return false;
        }   
    }    
    async getAlertMessage(){
        const alert = await this.page.waitForEvent('dialog');
        const message = alert.message();
        await alert.accept();
        return message;
    }      
}