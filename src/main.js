const Checkout = require('./checkout');
const {buyXForPriceOfYAmount, bulkDiscount, bundleFreeXWithY} = require("./rules");

if (require.main === module) {
    const createCheckout = () => new Checkout([
            buyXForPriceOfYAmount("atv", 3, 2),
            bulkDiscount("ipd", 4, 499.99),
            bundleFreeXWithY("mbp", "vga")
        ]);

    // Scenario 1
    // SKUs Scanned: atv, atv, atv, vga Total expected: $249.00
    const checkout1 = createCheckout();

    checkout1.scan("atv");
    checkout1.scan("atv");
    checkout1.scan("atv");
    checkout1.scan("vga");

    const {price: price1, items: items1} = checkout1.checkout();

    console.log(`Scenario 1: Purchased [${items1.map(item => item.name).join(", ")}] for price $${price1}`);



    // Scenario 2
    // SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95
    const checkout2 = createCheckout();

    checkout2.scan("atv");
    checkout2.scan("ipd");
    checkout2.scan("ipd");
    checkout2.scan("atv");
    checkout2.scan("ipd");
    checkout2.scan("ipd");
    checkout2.scan("ipd");

    const {price: price2, items: items2} = checkout2.checkout();

    console.log(`Scenario 2: Purchased [${items2.map(item => item.name).join(", ")}] for price $${price2}`);



    // Scenario 3
    // SKUs Scanned: mbp, vga, ipd Total expected: $1949.98
    const checkout3 = createCheckout();

    checkout3.scan("mbp");
    checkout3.scan("vga");
    checkout3.scan("ipd");

    const {price: price3, items: items3} = checkout3.checkout();

    console.log(`Scenario 3: Purchased [${items3.map(item => item.name).join(", ")}] for price $${price3}`);
}
