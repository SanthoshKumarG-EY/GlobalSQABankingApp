import { AddCustomerData, genAccountData, genCustomerData } from '../models/AddCustomerData';
import { OpenAccountData } from '../models/OpenAccountData';
import fs from 'fs';
import path from 'path';
import { DataGenerator } from './DataGenerator';
import  addCustomerData  from '../../testdata/addCustomerData.json';
import customerData from '../../testdata/customerData.json';

export class TestDataManager {
  static filePath1 = path.join(__dirname, '../../testdata/addCustomerData.json');
  static filePath2 = path.join(__dirname, '../../testdata/customerData.json');
  static filePath3 = path.join(__dirname, '../../testdata/accountData.json');

  static filePathMap = new Map<string, string>([
    ['addCustomerData', this.filePath1],
    ['customerData', this.filePath2],
    ['accountData', this.filePath3]
  ]);
  static readData(filePath: string) {
    const data = fs.readFileSync(this.filePathMap.get(filePath)!, 'utf-8');
    return JSON.parse(data);
  }
  
  static saveData(data: AddCustomerData, filePath: string) {
    const existingData = this.readData(filePath);
    existingData.data.push(data);
    fs.writeFileSync(this.filePathMap.get(filePath)!, JSON.stringify(existingData, null, 2), 'utf-8');
  }

  static writeData(data: genCustomerData, filePath: string) {
    fs.writeFileSync(this.filePathMap.get(filePath)!, JSON.stringify(data, null, 2), 'utf-8');
  }

  static writeData1(data: genAccountData, filePath: string) {
    fs.writeFileSync(this.filePathMap.get(filePath)!, JSON.stringify(data, null, 2), 'utf-8');
  }

}