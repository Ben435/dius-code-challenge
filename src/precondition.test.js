const {precondition} = require("./utils");

describe('precondition', () => {
    it('given failing check, throws error with expected message', () => {
        const msg = "test-message";
        try {
            precondition(false, msg);
        } catch(e) {
            expect(e.message).toEqual(msg);
        }
    });

    it('given passing check, should return', () => {
        precondition(true, '');
    })
});