const assert = require("assert");
const {describe, it} = require("mocha");
const fn = require("../../src/includes/functions/divideSegment");


describe("divideSegment", () => {

    function test (oOptions) {
        const aSegmentsGot = fn(oOptions.segment[0], oOptions.segment[1], oOptions.parts);

        assert.deepEqual(aSegmentsGot, oOptions.expected);
    }

    it("divides 0, 100 in 5 parts", () => {
        test({
            segment: [0, 100],
            parts: 5,
            expected: [20, 40, 60, 80, 100]
        });
    });

    it("divides -100, 100 in 5 parts", () => {
        test({
            segment: [-100, 100],
            parts: 5,
            expected: [-60, -20, 20, 60, 100]
        });
    });

    it("divides 100, -100 in 5 parts without minding from/to", () => {
        test({
            segment: [100, -100],
            parts: 5,
            expected: [-60, -20, 20, 60, 100]
        });
    });

    it("divides a small segment in 5 parts", () => {
        test({
            segment: [1, 5],
            parts: 5,
            expected: [1.8, 2.6, 3.4, 4.2, 5]
        });
    });

});
