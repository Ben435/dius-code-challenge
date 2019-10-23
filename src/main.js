const Checkout = require('./checkout');
const {buyXForPriceOfYAmount, bulkDiscount, bundleFreeXWithY} = require("./rules");

if (require.main === module) {
    const checkout = new Checkout([
        buyXForPriceOfYAmount("atv", 3, 2),
        bulkDiscount("ipd", 4, 499.99),
        bundleFreeXWithY("mbp", "vga")
    ]);

    checkout.scan("ipd");
    checkout.scan("mbp");
    checkout.scan("atv");
    checkout.scan("vga");

    const {price, items} = checkout.checkout();

    console.log(`Got [${items.map(item => item.name).join(", ")}] for price $${price}`)
}
