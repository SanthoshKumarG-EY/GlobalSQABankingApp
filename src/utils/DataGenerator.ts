import { AddCustomerData } from "../models/AddCustomerData";
import { OpenAccountData } from "../models/OpenAccountData";
export class DataGenerator {
  static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  static generateRandomNumericString(length: number): string {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }   
    return result;
  }

  static generateRandomUserData(): AddCustomerData {
    return {
      firstName: `User_${this.generateRandomNumericString(5)}`,
      lastName: `${this.generateRandomString(6)}`,
      postCode: `${this.generateRandomNumericString(5)}`,
    };
  }
  
  static generateRandomAccountData(): OpenAccountData {
    const currencies = ['Dollar', 'Pound', 'Rupee'];
    return {
      customerName: `Customer_${this.generateRandomNumericString(5)}`,
      currency: currencies[Math.floor(Math.random() * currencies.length)],
    };
  }

} 