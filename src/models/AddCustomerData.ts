export interface AddCustomerData {
    firstName: string;
    lastName: string;
    postCode: string;
}

export interface genCustomerData {
    customerID: string;
    customerName: string;
}

export interface genAccountData {
    customerName: string;
    accountNumber: string;
}

export interface CustomerDetails {
    firstName: string;
    lastName: string;
    postCode: string;
    accountNumber: string;
}