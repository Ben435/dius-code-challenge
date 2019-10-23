const {getProductBySku} = require("./products");

describe('getProductBySku', () => {
    it('when called with non-existent sku, should throw exception', () => {
        try {
            getProductBySku('non-existent-sku');
            fail();
        } catch(e) {}
    });

    it('when called with correct sku, returns copy of product', () => {
        const testSku = 'vga';
        const call1Result = getProductBySku(testSku);

        expect(call1Result.sku).toEqual(testSku);
        call1Result.sku = 'not-the-original-sku-' + testSku;

        const call2Result = getProductBySku(testSku);
        expect(call2Result.sku).toEqual(testSku);
    });
});