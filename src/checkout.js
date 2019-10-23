const {getProductBySku} = require("./products");

class Checkout {
    constructor(rules = []) {
        this.scannedItems = [];
        this.rules = rules;
    }

    scan(itemCode) {
        this.scannedItems.push(getProductBySku(itemCode));
    }

    checkout() {
        // Apply rules, then run sum prices of all items.
        this.rules.forEach(rule => rule(this.scannedItems));
        return {
            price: this.scannedItems.map(item => item.price).reduce((a, b) => a + b, 0),
            items: this.scannedItems
        };
    }
}

module.exports = Checkout;
