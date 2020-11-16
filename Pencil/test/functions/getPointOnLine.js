const assert = require("assert");
const {describe, it} = require("mocha");
const fn = require("../../src/includes/functions/getPointOnLine");


describe("getPointOnLine", () => {

    function test (oOptions) {
        const {
            source: oSource,
            target: oTarget,
            offset: iOffset,
            fromTargetPoint: bFromTargetPoint,
            expected: oPointExpected
        } = oOptions;

        const oPointGot = fn(oSource, oTarget, iOffset, bFromTargetPoint);

        assert.deepEqual(oPointGot, oPointExpected);
    }

    it("should return 10 from target point on a vertical line", () => {
        test({
            source: { x: 50, y: 100 },
            target: { x: 50, y: 50 },
            offset: 10,
            expected: { x: 50, y: 90 }
        });
    });

    it("should return 10 from target point on a horizontal line", () => {
        test({
            source: { x: 100, y: 50 },
            target: { x: 50, y: 50 },
            offset: 10,
            expected: { x: 90, y: 50 }
        });

    });

    it("should return 10 from target point on a vertical line (inverted target)", () => {
        test({
            source: { x: 50, y: 50 },
            target: { x: 50, y: 100 },
            offset: 10,
            expected: { x: 50, y: 60 }
        });
    });

    it("should return 10 from target point on a horizontal line (inverted target)", () => {
        test({
            source: { x: 50, y: 50 },
            target: { x: 100, y: 50 },
            offset: 10,
            expected: { x: 60, y: 50 }
        });
    });
});
