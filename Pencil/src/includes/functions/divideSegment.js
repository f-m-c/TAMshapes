function divideSegment(iA, iB, iNumSubSegments) {
    // divides a segment identified by A and B extremes in subsegments of equal size

    var iStep = Math.abs(iA - iB) / iNumSubSegments;
    if (iA > iB) {
        [iA, iB] = [iB, iA];
    }

    return Array(iNumSubSegments).fill(0).map(function (unused, i) {
        return parseFloat((iA + (i + 1) * iStep).toPrecision(3));
    });
}

module.exports = divideSegment;
