function generateOutletsBetween (sLabel, bIsXDimension, iDimensionFrom, iDimensionTo, iFixedDimensionValue, iNumOutlets) {
    /* global Outlet */
    // uses: 
    //   collection.divideSegment

    let collection = this;
    let aSegments = collection.divideSegment(iDimensionFrom, iDimensionTo, iNumOutlets);

    aSegments.pop();

    return aSegments
        .map((iSegmentEnd, i) => {

            let x = iFixedDimensionValue;
            let y = iSegmentEnd;

            if (bIsXDimension) {
                let tmp = x;
                x = y;
                y = tmp;
            }

            const sOutletName = sLabel + i;

            return new Outlet(sOutletName, "Bounding", x, y);
        });
}

module.exports = generateOutletsBetween;
