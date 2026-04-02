import { AddCustomerData, genCustomerData } from '../models/AddCustomerData';
import { OpenAccountData } from '../models/OpenAccountData';
import fs from 'fs';
import path from 'path';
import { DataGenerator } from './DataGenerator';
import  addCustomerData  from '../../testdata/addCustomerData.json';
import customerData from '../../testdata/customerData.json';

export class TestDataManager {
  static filePath1 = path.join(__dirname, '../../testdata/addCustomerData.json');
  static filePath2 = path.join(__dirname, '../../testdata/customerData.json');
  static readData() {
    const data = fs.readFileSync(this.filePath1, 'utf-8');
    return JSON.parse(data);
  }
  
  static saveData(data: AddCustomerData) {
    const existingData = this.readData();
    existingData.data.push(data);
    fs.writeFileSync(this.filePath1, JSON.stringify(existingData, null, 2), 'utf-8');
  }

  static overWriteData(data: genCustomerData) {
    fs.writeFileSync(this.filePath2, JSON.stringify(data, null, 2), 'utf-8');
  }

  static retrieveOverWrittenData() {
    const data = fs.readFileSync(this.filePath2, 'utf-8');
    return JSON.parse(data);
  }
}