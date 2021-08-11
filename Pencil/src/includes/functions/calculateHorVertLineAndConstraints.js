function calculateHorVertLineAndConstraints (
    iStart, iEnd,
    iControlPoints, iCPnum = 0,
    startsHorizontal, 
    isStraight = false, alignType = "center", endsDiagonal = false, cornerRadius = 10) {
    // calculate x/y contraints for segments for a horizontal / vertical only routing with open number of control points
    // iStart, iEnd: Start point and end point of the line    
    // iControlPoints: Array of all control points {x: , y: } between start and end
    // iCPnum: number of control points to be used from array
    // startsHorizontal: First line at start point horizontal (true) or vertical (false)
    // aligntype: start, center, end, control - only for straight lines (no elbows: iPoints has only two elements or three if aligntype = control)
    // endsDiagonal: last line (to end) can be diagonal - iPoints has at least 3 elements
    // cornerRadius: determines minimal distance to calculate an elbow, else corner will be ignored
    // 
    // output: Array for all control points
    // [{xmin: , xmax:, ymin:, ymax:}]
    //
    //  Example: startsHorizontal = false iPoints: 3 elements
    //  iStart x  (= p1)
    //         |    p2
    //      pa x----O----x pb 
    //                   |
    //                   x iEnd (= p3)
    // output: [{xmin: (iEnd.x+iStart.x)/2 , xmax:(iEnd.x+iStart.x)/2, ymin:-9999, ymax:9999}]
    //
    // Example2: startsHorizontal = true
    //  p1 x----x 1
    //     0    |
    //       p2 O    p6          p6
    //       p3 |     x  6        x
    //    3 x-O-x 2   |          /
    //   p4 O         |         /
    //    4 x----O----x 5 x----O
    //          p5            p5 (endsDiagonal = true)
    // output: [{xmin:-9999, xmax:9999, ymin:(iStart.y+p[2].y)/2, ymax:(iStart.y+p[2].y)/2},
    //          {xmin: (p[2].x+p[3].x)/2 , xmax:(p[2].x+p[3].x)/2, ymin:-9999, ymax:9999},
    //          {xmin:-9999, xmax:9999, ymin: (p[3].y+p[4].y)/2, ymax:(p[3].y+p[4].y)/2},
    //          {xmin: (p[4].x+p[5].x)/2 , xmax:(p[4].x+p[5].x)/2, ymin:-9999, ymax:9999}]
    // range determines whether an ellbow will be inserted at all
    const range = cornerRadius * 0.7;

    // target point array
    const aPoints = [];
    const aConstraints = [];
    for (let i = 0; i < iControlPoints.length; i++) {
        aConstraints.push( {xmin: 0 - Number.MAX_VALUE, xmax: Number.MAX_VALUE, ymin: 0 - Number.MAX_VALUE, ymax: Number.MAX_VALUE} );
    }
    if (isStraight) {
        // special case: straight line. This is the only case where the starting point can differ from the
        // fist given point (except alignType = start)
        const p1 = iStart; // first point
        const p2 = iEnd; // last point
        let pa = p1;
        let pb = p2;
        switch (alignType) {
        case "control":
            // we pick the first as control point
            const c = iControlPoints[0];
            if (startsHorizontal) {
                pa.x = p1.x;
                pa.y = c.y;
                pb.x = p2.x;
                pb.y = c.y;
                aConstraints[0].xmin = (p1.x+p2.x)/2;
                aConstraints[0].xmax = (p1.x+p2.x)/2;
            } else {
                pa.x = c.x;
                pa.y = p1.y;
                pb.x = c.x;
                pb.y = p2.y;
                aConstraints[0].ymin = (p1.y+p2.y)/2;
                aConstraints[0].ymax = (p1.y+p2.y)/2;
            }
            break;
        case "start":
            if (startsHorizontal) {
                pa.y = p1.y;
                pb.y = p1.y;
            } else {
                pa.x = p1.x;
                pb.x = p1.x;
            }
            break;
        case "center":
            if (startsHorizontal) {
                pa.y = p1.y + (p2.y-p1.y)/2;
                pb.y = pa.y;
            } else {
                pa.x = p1.x + (p2.x-p1.x)/2;
                pb.x = pa.x;
            }
            break;
        case "end":
            if (startsHorizontal) {
                pa.y = p2.y;
                pb.y = p2.y;
            } else {
                pa.x = p2.x;
                pb.x = p2.x;
            }
            break;
        } // switch aligntype    
        aPoints.push(pa, pb);    
    } else {
        // it's not a straight line: Add segment with elbow corner with every element of iPoints.

        // first line is starting point
        var cpnum = parseInt(iCPnum);
        let iPoints = [];
        for (let i = 0; i < cpnum; i++) {
            iPoints.push(iControlPoints[i]);
        }
        iPoints.push(iEnd);
        var p1 = iStart;
        
        var p2 = iPoints[0];
        var nextIsHor = startsHorizontal;
        aPoints.push(iStart);

        // now loop over rest of array
        for (let i = 0; i < iPoints.length; i++){
            let pax = 0;
            let pay = 0;
            p2 = iPoints[i]; //next point
            // last loop iteration? Then check whether endsDiagonal is set
            if (endsDiagonal && i == iPoints.length - 1 ) {
                // just push the control point instead of calculated point
                aPoints.push(iPoints[i-1]);
            } else {
                let skip = false; 
           
                if (nextIsHor) {
                    // next segment is horizontal
                    if (i > 0) { 
                        aConstraints[i-1].xmin = (p1.x + p2.x)/2; 
                        aConstraints[i-1].xmax = (p1.x + p2.x)/2 
                    }
                    if (Math.abs(p2.x-p1.x) < range) {
                        // too small: don't add elbow
                        skip = true;
                    } else {
                        if (i == iPoints.length - 1 && Math.abs(p2.y-p1.y) < range) {
                            // In case it's the last control point: adjust last aPoint.y to endPoint.y
                            aPoints[aPoints.length - 1].y = p2.y;
                            skip = true;
                        } else {
                            pax = p2.x;
                            pay = p1.y; 
                        }
                    }
                } else {
                    // vertical
                    if (i > 0) { 
                        aConstraints[i-1].ymin = (p1.y + p2.y)/2; 
                        aConstraints[i-1].ymax = (p1.y + p2.y)/2;
                    }
                    if (Math.abs(p2.y-p1.y) < range) {
                        // too small: don't add elbow
                        skip = true;
                    } else {
                        if (i == iPoints.length - 1 && Math.abs(p2.x-p1.x) < range) {
                            // In case it's the last control point: adjust last aPoint.x to endPoint.x
                            aPoints[aPoints.length - 1].x = p2.x;
                            skip = true;
                        } else {
                            pax = p1.x;
                            pay = p2.y;
                        }
                    }
                }
                if (!skip) {
                    aPoints.push({x: pax, y: pay});
                    p1 = {x: pax, y: pay};
                    
                } else {
                    // push the last point again so that the control points still match the segments
                    aPoints.push(aPoints[aPoints.length - 1]);
                    p1 = aPoints[aPoints.length - 1];
                }
                nextIsHor = !nextIsHor;
            }
        }
        // last point to push
        aPoints.push(p2);
    }
    return [aPoints, aConstraints];
}
module.exports = calculateHorVertLineAndConstraints;
//test = calculateHorVertControlConstraints2({x:0,y:0}, {x:40,y:40},[{x:20,y:5}, {x:5,y:35}], 2, true, false, "center", false);
