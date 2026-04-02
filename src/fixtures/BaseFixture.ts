import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ManagerPage } from '../pages/ManagerPage';
import { CustomerPage } from '../pages/CustomerPage';

type Pages = {
    homePage: HomePage;
    managerPage: ManagerPage;
    customerPage: CustomerPage;
}

export const test = base.extend<Pages>({
    homePage: async({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    managerPage: async({ page }, use) => {
        const managerPage = new ManagerPage(page);
        await use(managerPage);
    },
    customerPage: async({ page }, use) => {
        const customerPage = new CustomerPage(page);
        await use(customerPage);
    },

});

export { expect } from '@playwright/test';