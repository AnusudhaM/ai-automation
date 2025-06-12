class DashboardPage {
    constructor(page) {
        this.page = page;
        this.inventoryContainer = '.inventory_container';
        this.productItems = '.inventory_item';
        this.cartButton = '.shopping_cart_link';
        this.menuButton = '#react-burger-menu-btn';
        this.logoutButton = '#logout_sidebar_link';
    }

    async isInventoryVisible() {
        return await this.page.isVisible(this.inventoryContainer);
    }

    async getProductCount() {
        return await this.page.locator(this.productItems).count();
    }

    async openCart() {
        await this.page.click(this.cartButton);
    }

    async logout() {
        await this.page.click(this.menuButton);
        await this.page.click(this.logoutButton);
    }
}

module.exports = DashboardPage; 