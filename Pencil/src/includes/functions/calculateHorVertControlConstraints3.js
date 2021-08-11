function calculateHorVertControlConstraints3 (
    aPoints,
    offset,
    area = 0
) {
    // in:
    //   aPoints: Array with line points {x:, y:}
    //   offset: 0..pixels range orthogonal to line  
    //   area: Where on the line?
    //     0: everywhere
    //     1: start
    //     2: end
    
    // out:
    //   constraints 
    //   {xmin: , xmax:, ymin:, ymax:}
    //
    //
    // Example:
    //  lStart = 10, lEnd = -10, offset = 20 (c1 can be on the line or up 20 pixels next to it)
    //   p1 x--------x p2
    //               |
    //         c1 x  |
    //               x-------x p4
    //              p3

    function isBetween(x, a, b) {
        return( (a <= x && x <= b) || (a >= x && x >= b) );
    }

    // loop over points to find segment closest to control point
    let a = aPoints[0];
    let boundary = {xmin:  Number.MAX_VALUE, xmax: 0 - Number.MAX_VALUE, ymin: Number.MAX_VALUE, ymax: 0 - Number.MAX_VALUE};
    for (let i=1; i < aPoints.length ; i++) {
        let b = aPoints[i];
        if (area == 0) {
            // now widen the bounding box with every point
            boundary.xmin = Math.min(boundary.xmin, a.x, b.x);
            boundary.xmax = Math.max(boundary.xmax, a.x, b.x);
            boundary.ymin = Math.min(boundary.ymin, a.y, b.y);
            boundary.ymax = Math.max(boundary.ymax, a.y, b.y);
        } else {
            if (area == 1 && i == 1) {
                // first segment
                boundary.xmin = Math.min(a.x, b.x);
                boundary.xmax = Math.max(a.x, b.x);
                boundary.ymin = Math.min(a.y, b.y);
                boundary.ymax = Math.max(a.y, b.y);
            } else if (area == 2 && i == aPoints.length - 1) {
                // last segment
                boundary.xmin = Math.min(a.x, b.x);
                boundary.xmax = Math.max(a.x, b.x);
                boundary.ymin = Math.min(a.y, b.y);
                boundary.ymax = Math.max(a.y, b.y);
            }
        }
        
        a = b;
    }
    return {
        xmin: boundary.xmin - offset, 
        xmax: boundary.xmax + offset, 
        ymin: boundary.ymin - offset, 
        ymax: boundary.ymax + offset
    };
}


module.exports = calculateHorVertControlConstraints3;

//test = calculateHorVertControlConstraints3([{x:0, y:0}, {x:-20, y:0}, {x: -20, y:40}, {x:40, y:40}], 20, 2);