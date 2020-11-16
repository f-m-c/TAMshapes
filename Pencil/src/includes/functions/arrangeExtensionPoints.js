function arrangeExtensionPoints (oOptions) {
    /*
     * Drawing a line with createSVGLineThroughPoints requires
     * an array of points sorted from start to end (in the direction of the drawing pen).
     * Shapes sometimes have a built-in "smartness" for cases
     * of 1 extension point (which should be placed to the closest
     * main point of the shape).
     * In this function we create an array suitable for createSVGLineThroughPoints
     * containing the shape main and extension points in the correct
     * positions.
     */
    // uses: 
    //   collection.getClosestPoint

    var collection = this;

    var aPoints = oOptions.mainPoints;
    var bHasExtensionA = oOptions.hasExtensionA;
    var bHasExtensionB = oOptions.hasExtensionB;
    var p2 = aPoints[0];
    var p3 = aPoints[1];
    var p1 = oOptions.extensionPoints[0];
    var p4 = oOptions.extensionPoints[1];

    var aRemainingPoints = [p2, p3];

    function connectToClosestPoint (pExt) {
        var oClosestPoint = collection.getClosestPoint(pExt, ...aRemainingPoints);
        if (oClosestPoint === p2) {
            aRemainingPoints.shift();
        } else {
            aRemainingPoints.pop();
        }

        if (oClosestPoint === p2) {
            aPoints.unshift(pExt);
        } else {
            aPoints.push(pExt);
        }
    }

    if (bHasExtensionA) {
        connectToClosestPoint(p1);
    }

    if (bHasExtensionB) {
        connectToClosestPoint(p4);
    }

    return aPoints;
}

module.exports = arrangeExtensionPoints;
