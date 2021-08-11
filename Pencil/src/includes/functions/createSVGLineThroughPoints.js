//const { last } = require("underscore");

function createSVGLineThroughPoints (iPoints, bRounded, bClosed, iCornerRadius = 10) {
/**
 * Creates a coordinate path for the Path SVG element with rounded corners - only for rectangular shapes
 * @param iPoints  - An array of coordinates in the form [{x: Number, y: Number}, ...]
 * @param bRounded - Bool: is it rounded?
 * @param bClosed  - Bool: is shape closed?
 * @param iCornerRadius - Radius of corner rounding 
 */
    var collection = this;
    var line = [];

    if (iPoints.length < 2) {
        throw new Error("We need at least 2 points to create a line");
    }
    // remove duplicate points
    let aPoints = [];
    aPoints.push (iPoints[0]);
    let lastPoint = iPoints[0];
    for (let i=1; i < iPoints.length; i++){
        if (iPoints[i].x != lastPoint.x || iPoints[i].y != lastPoint.y ) {
            aPoints.push(iPoints[i]);
            lastPoint = iPoints[i];
        }
    }
    if (bRounded) {
        if (bClosed) {
            // append first point at the end to close the path
            aPoints.push(aPoints[0]);
        }

        aPoints.forEach(function (oPt, i, aPts) {
            var bFirstPoint = i === 0;
            var bLastPoint = i === aPts.length - 1;

            if (bFirstPoint) {
                // First point to process? Push first point (open) or start of next rounding (closed) as initial drawing point (M)
                let oMoveToPoint = bClosed
                    ? collection.getPointOnLine(oPt, aPts[i+1], iCornerRadius)
                    : oPt;

                line.push(M(oMoveToPoint.x, oMoveToPoint.y));
                return;
            }

            if (bLastPoint) {
                if (bClosed) {
                    let oPtCurveStart = collection.getPointOnLine(oPt, aPts[i-1], iCornerRadius);
                    let oPtCurveEnd = collection.getPointOnLine(oPt, aPts[1], iCornerRadius);

                    line.push(L(oPtCurveStart.x, oPtCurveStart.y));
                    line.push(Q(
                        oPt.x, oPt.y,
                        oPtCurveEnd.x, oPtCurveEnd.y
                    ));
                    return;
                }

                // not closed
                line.push(L(oPt.x, oPt.y));
                return;
            }

            let oPtCurveStart = collection.getPointOnLine(oPt, aPts[i-1], iCornerRadius);
            let oPtCurveEnd = collection.getPointOnLine(oPt, aPts[i+1], iCornerRadius);

            line.push(L(oPtCurveStart.x, oPtCurveStart.y));
            line.push(Q(
                oPt.x, oPt.y,
                oPtCurveEnd.x, oPtCurveEnd.y
            ));
        });
    } else {
        aPoints.forEach(function (oPt, i) {
            var bFirstPoint = i === 0;
            if (bFirstPoint) {
                line.push(M(oPt.x, oPt.y));
                return;
            }

            line.push(L(oPt.x, oPt.y));
        });
    }


    if (bClosed) {
        line.push(z);
    }

    return line;
}
module.exports = createSVGLineThroughPoints;
