const assert = require("assert");
const {describe, it} = require("mocha");

const getPointOnLine = require("../../src/includes/functions/getPointOnLine");
const findPointDistance = require("../../src/includes/functions/findPointDistance");

const fn = require("../../src/includes/functions/getPerpendicularPointDistance");

const oMockedCollection = {
    getPointOnLine,
    findPointDistance
};

describe("getPerpendicularPointDistance", () => {

    function test ({ a, b, offsetK, targetDistance, expected, direction}) {
        const oPointGot = fn.call(oMockedCollection, a, b, offsetK, targetDistance, direction);

        assert.deepEqual(oPointGot, expected);
    }

    it("should find the perpendicular point distance", () => {
        test({
            a: { x: 0, y: 0 },
            b: { x: 10, y: 0 },
            offsetK: 5,
            targetDistance: 10,
            direction: false,
            expected: {
                x: 5,
                y: -10
            }
        });
    });

});
