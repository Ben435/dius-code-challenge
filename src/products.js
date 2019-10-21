
const products = [
    {
        sku: "ipd",
        name: "Super iPad",
        price: 549.99
    },
    {
        sku: "mbp",
        name: "MacBook Pro",
        price: 1399.99
    },
    {
        sku: "atv",
        name: "Apple TV",
        price: 109.50
    },
    {
        sku: "vga",
        name: "VGA Adapter",
        price: 30.00
    }
];

const getProductBySku = sku => {
    const possibleProducts = products.filter(item => item.sku === sku);
    if (possibleProducts.length === 0) {
        throw new Error("Product not found: " + sku);
    } else if (possibleProducts.length > 1) {
        throw new Error("Multiple products with same SKU: " + possibleProducts);
    } else {
        return {...possibleProducts[0]};
    }
};

module.exports = {
    getProductBySku
};
