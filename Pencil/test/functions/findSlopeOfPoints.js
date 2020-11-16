const assert = require("assert");
const {describe, it} = require("mocha");
const fn = require("../../src/includes/functions/findSlopeOfPoints");


describe("findSlopeOfPoints", () => {

    function test ({ a, b, expected}) {
        const iSlopeGot = fn(a, b);

        assert.equal(iSlopeGot, expected);
    }

    it("should find the slope of two points", () => {
        test({
            a: { x: 2, y: 5 },
            b: { x: 8, y: 3 },
            expected: -1/3
        });
    });

    it("should find the slope of two points placed horizontally", () => {
        test({
            a: { x: -10, y: 0 },
            b: { x: 10, y: 0 },
            expected: 0
        });
    });

    it("should find the slope of two points placed vertically", () => {
        test({
            a: { x: 0, y: -10 },
            b: { x: 0, y: 10 },
            expected: Infinity
        });
    });

});
