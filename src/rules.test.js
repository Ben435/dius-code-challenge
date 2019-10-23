const {buyXForPriceOfYAmount, bulkDiscount, bundleFreeXWithY} = require("./rules");
const Checkout = require('./checkout');

describe("X for Y deal", () => {
    let checkout;

    beforeEach(() => {
        checkout = new Checkout([buyXForPriceOfYAmount("atv", 3, 2)]);
    });

    it('when does not qualify for deal then does not adjust price', () => {
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("vga");
        checkout.scan("vga");

        let {price} = checkout.checkout();

        expect(price).toEqual(279);
    });

    it('when does qualify for deal then adjusts price', () => {
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("vga");

        let {price} = checkout.checkout();

        expect(price).toEqual(249.0);
    });

    it('when qualifies for deal twice then adjusts price for twice the items', () => {
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("vga");
        checkout.scan("vga");
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("vga");

        let {price} = checkout.checkout();

        expect(price).toEqual(528);
    });

    it('when qualifies for deal and a bit then adjusts price only for items within deal', () => {
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("vga");
        checkout.scan("vga");
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("vga");
        checkout.scan("atv");

        let {price} = checkout.checkout();

        expect(price).toEqual(637.5);
    });
});

describe('bulk discount', () => {
    let checkout;

    beforeEach(() => {
        checkout = new Checkout([bulkDiscount("ipd", 4, 499.99)]);
    });

    it('when does not qualify for deal then does not adjust price', () => {
        checkout.scan("atv");
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("ipd");

        let {price} = checkout.checkout();

        expect(price).toEqual(1759.47);
    });

    it('when qualifies for deal then adjusts price', () => {
        checkout.scan("atv");
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("atv");
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("ipd");

        let {price} = checkout.checkout();

        expect(price).toEqual(2718.95);
    });
});

describe('bundle deal', () => {
    let checkout;
    beforeEach(() => {
        checkout = new Checkout([bundleFreeXWithY("mbp", "vga")]);
    });

    it('when does not qualify for deal then does not adjust price', () => {
        checkout.scan("mbp");
        checkout.scan("ipd");

        let {price} = checkout.checkout();

        expect(price).toEqual(1949.98);
    });

    it('when qualifies for deal then adjusts price', () => {
        checkout.scan("mbp");
        checkout.scan("vga");
        checkout.scan("ipd");

        let {price} = checkout.checkout();

        expect(price).toEqual(1949.98);
    });

    it('when qualifies for deal multiple times then adjusts price', () => {
        checkout.scan("mbp");
        checkout.scan("vga");
        checkout.scan("mbp");
        checkout.scan("vga");
        checkout.scan("mbp");
        checkout.scan("vga");
        checkout.scan("ipd");

        let {price} = checkout.checkout();

        expect(price).toEqual(4749.96);
    });

    it('when base product outnumbers bundled product then adjusts price accordingly', () => {
        checkout.scan("mbp");
        checkout.scan("vga");
        checkout.scan("mbp");
        checkout.scan("mbp");
        checkout.scan("ipd");

        let {price} = checkout.checkout();

        expect(price).toEqual(4749.96);
    });

    it('when bundled product outnumbers base product then adjusts price accordingly', () => {
        checkout.scan("mbp");
        checkout.scan("vga");
        checkout.scan("vga");
        checkout.scan("vga");
        checkout.scan("ipd");

        let {price} = checkout.checkout();

        expect(price).toEqual(2009.98);
    });
});
