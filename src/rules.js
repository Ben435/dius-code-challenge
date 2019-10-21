const {precondition} = require("./utils");

const ruleBuyXForPriceOfYAmount = (productCode, quantityPurchased, amountPricedFor) => {
    precondition(productCode, "Product code must be present");
    precondition(quantityPurchased >= amountPricedFor, "Amount purchased must be greater than amount priced for. Eg: 'Buy 3 products for the price of 2'");

    return items => {
        const itemsOfInterest = items.filter(item => item.sku === productCode);
        const numberOfTimesQualified = Math.floor(itemsOfInterest.length / quantityPurchased);
        const numberOfItemsReducedToZeroPrice = (quantityPurchased - amountPricedFor) * numberOfTimesQualified;

        for (let i=0; i<numberOfItemsReducedToZeroPrice; i++) {
            itemsOfInterest[i].price = 0;
        }
    }
};

const ruleBulkDiscount = (productCode, minimumQuantity, newPrice) => {
    precondition(productCode, "Product code must be present");
    precondition(minimumQuantity > 0, "Minimum quantity must be > 0");

    return items => {
        const itemsOfInterest = items.filter(item => item.sku === productCode);

        if (itemsOfInterest.length >= minimumQuantity) {
            for (let i=0; i<itemsOfInterest.length; i++) {
                itemsOfInterest[i].price = newPrice;
            }
        }
    }
};

const ruleBundleFreeXWithY = (baseProductCode, bundledProductCode) => {
    precondition(baseProductCode, "Base product code must be present");
    precondition(bundledProductCode, "Bundled product code must be present");

    return items => {
        const baseItems = items.filter(item => item.sku === baseProductCode);
        const bundledItems = items.filter(item => item.sku === bundledProductCode);

        // If more base than bundled, or more bundled than base, should cope.
        for (let i=0; i<Math.min(baseItems.length, bundledItems.length); i++) {
            bundledItems[i].price = 0;
        }
    }
};

module.exports = {
    ruleBuyXForPriceOfYAmount,
    ruleBulkDiscount,
    ruleBundleFreeXWithY
};
