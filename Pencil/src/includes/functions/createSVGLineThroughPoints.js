function createSVGLineThroughPoints (aPoints, bRounded, bClosed, iCornerRadius = 10) {
    /* global z L M Q*/
    // uses: 
    //   collection.getPointOnLine

    var collection = this;
    var line = [];

    if (aPoints.length < 2) {
        throw new Error("We need at least 2 points to create a line");
    }

    if (bRounded) {
        if (bClosed) {
            aPoints.push(aPoints[0]);
        }

        aPoints.forEach(function (oPt, i, aPts) {
            var bFirstPoint = i === 0;
            var bLastPoint = i === aPts.length - 1;

            if (bFirstPoint) {
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
