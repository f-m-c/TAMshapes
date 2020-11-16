function getPointOnComplexSegment (aSegmentPoints, offsetPercent) {
    // finds a point on the segment between a and b (points) which is at
    // a percentage offset distance between 0% and 100% from a.
    // uses: 
    //   collection.getPointOnLine   
    //   collection.rangeMap

    var collection = this;

    function calculateSegmentLengthMapping (aSegmentPoints) {
        var iLength = 0;
        var aMappings = [];
        aSegmentPoints.reduce((a, b, iIdx) => {
            var iLengthFrom = iLength + (iIdx === 0 ? 0 : 1);
            iLength += collection.findPointDistance(a, b);
            aMappings.push({
                segmentPoints: { a, b },
                length: [iLengthFrom, iLength]
            });
            return b;
        });

        return {
            totalLength: iLength,
            segments: aMappings
        };
    }

    var oLengthMapping = calculateSegmentLengthMapping(aSegmentPoints);
    var iLength = oLengthMapping.totalLength;
    var iMappedPoint = collection.rangeMap([0, 100], [0, iLength], offsetPercent);

    var iDistanceSoFar = iMappedPoint;
    var iTargetSegmentIdx = -1;
    oLengthMapping.segments.forEach(function (oSegmentInfo, iSegmentIdx) {
        if (iTargetSegmentIdx !== -1) {
            return;
        }
        if (oSegmentInfo.length[1] >= iDistanceSoFar) {
            iTargetSegmentIdx = iSegmentIdx;
            return;
        }

        iDistanceSoFar -= oSegmentInfo.length[1];
        if (iSegmentIdx === oLengthMapping.segments.length - 1) {
            iTargetSegmentIdx = iSegmentIdx;
        }
    });

    var oTargetSegmentPoints = oLengthMapping.segments[iTargetSegmentIdx].segmentPoints;

    return collection.getPointOnLine(oTargetSegmentPoints.a, oTargetSegmentPoints.b, iDistanceSoFar);
}

module.exports = getPointOnComplexSegment;
