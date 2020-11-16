const assert = require("assert");
const {describe, it} = require("mocha");
const fn = require("../../src/includes/functions/findPointDistance");


describe("findPointDistance", () => {

    function test (oOptions) {
        const {
            source: oSource,
            target: oTarget,
            expected: iDistanceExpected
        } = oOptions;

        const iDistanceGot = fn(oSource, oTarget);

        assert.equal(iDistanceGot, iDistanceExpected);
    }

    it("should find the distance between vertically placed points (bottom to top)", () => {
        test({
            source: { x: 50, y: 100 },
            target: { x: 50, y: 50 },
            expected: 50
        });
    });

    it("should find the distance between vertically placed points (top to bottom)", () => {
        test({
            source: { x: 50, y: 50 },
            target: { x: 50, y: 100 },
            expected: 50
        });
    });

    it("should find the distance between horizontally placed points (left to right)", () => {
        test({
            source: { x: 50, y: 50 },
            target: { x: 100, y: 50 },
            expected: 50
        });
    });

    it("should find the distance between horizontally placed points (right to left)", () => {
        test({
            source: { x: 100, y: 50 },
            target: { x: 50, y: 50 },
            expected: 50
        });
    });
});
