const Checkout = require('./checkout');
const {ruleBuyXForPriceOfYAmount, ruleBulkDiscount, ruleBundleFreeXWithY} = require("./rules");

if (require.main === module) {
    const checkout = new Checkout([
        ruleBuyXForPriceOfYAmount("atv", 3, 2),
        ruleBulkDiscount("ipd", 4, 499.99),
        ruleBundleFreeXWithY("mbp", "vga")
    ]);

    checkout.scan("ipd");
    checkout.scan("mbp");
    checkout.scan("atv");
    checkout.scan("vga");

    const {price, items} = checkout.checkout();

    console.log(`Got [${items.map(item => item.name).join(", ")}] for price $${price}`)
}
