const Checkout = require('./checkout');

describe('Checkout', () => {
    describe('checkout', () => {
        it('calls all registered callbacks on all scanned objects', () => {
            const spy1 = jest.fn();
            const spy2 = jest.fn();

            const testCheckout = new Checkout([spy1, spy2]);

            testCheckout.scan("atv");
            testCheckout.scan("mbp");

            testCheckout.checkout();

            expect(spy1.mock.calls.length).toEqual(1);
            // First call, first argument (the list of items), check each item was as scanned
            expect(spy1.mock.calls[0][0][0].sku).toEqual("atv");
            expect(spy1.mock.calls[0][0][1].sku).toEqual("mbp");

            expect(spy2.mock.calls.length).toEqual(1);
            expect(spy2.mock.calls[0][0][0].sku).toEqual("atv");
            expect(spy2.mock.calls[0][0][1].sku).toEqual("mbp");
        });

        it('calculates price by summing all items', () => {
            const testCheckout = new Checkout();

            testCheckout.scan("ipd");
            testCheckout.scan("mbp");
            testCheckout.scan("atv");
            testCheckout.scan("vga");

            const {price, items} = testCheckout.checkout();

            expect(items.length).toEqual(4);
            expect(price).toEqual(2089.48);
        });
    })
});