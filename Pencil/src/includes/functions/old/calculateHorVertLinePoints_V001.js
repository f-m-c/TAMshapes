function calculateHorVertLinePoints_V001 (p1, p2, c3, isHorizontal, alignType = 'center', hasExtensionA = false, hasExtensionB = false, isExtADiagonal = false) {
    // calculate line points for a horizontal / vertical only routing
    // p1, p2: Start and End point
    // c3: Control point
    // isHorizontal: Main line horizontal (true) or vertical (false)
    // aligntype: start, center, end, control - only for straight lines (no elbows)
    // hasExtensionA, hasExtensionB: Elbow at start / end
    // isExtADiagonal: Allow extension A (start) to be diagonal
    // 
    //  Example: isHorizontal = true
    //  pStart x  (= p1)
    //         |    c3
    //      pa x----x----x pb  (this is the main line)
    //                   |
    //                   x pEnd (= p2)

    var p1x = parseFloat(p1.x);
    var p1y = parseFloat(p1.y);
    var p2x = parseFloat(p2.x);
    var p2y = parseFloat(p2.y);
    var c3x = parseFloat(c3.x);
    var c3y = parseFloat(c3.y);
    var pStart = { x: p1x, y: p1y } ;
    var pEnd = { x: p2x, y: p2y } ;

    var pa = { x: 0.0, y: 0.0 };
    var pb = { x: 0.0, y: 0.0 };
    var pd = { x: c3x,  y: c3y }; // diagonal case

    var hasExtA = hasExtensionA;
    var hasExtB = hasExtensionB;

    if (isHorizontal) {
        // horizontal line
        pa.x = p1x;
        pb.x = p2x;
        if (hasExtensionA || hasExtensionB || alignType == 'control') {
            // Control c3 defines y
            pa.y = c3y;
            pb.y = c3y;
            if (hasExtensionA && p1.y == c3.y) {
                hasExtA = false;
            }
            if (hasExtensionB && p2.y == c3.y) {
                hasExtB = false;
            }
        } else {
            // Aligntype defines y
            switch (alignType) {
            case 'start':
                pa.y = p1y;
                pb.y = p1y;
                break;
            case 'center':
                pa.y = p1y + (p2y-p1y)/2;
                pb.y = pa.y;
                break;
            case 'end':
                pa.y = p2y;
                pb.y = p2y;
                break;
            } // switch aligntype
        }
    } else {
        // vertical line
        pa.y = p1y;
        pb.y = p2y;
        if (hasExtensionA || hasExtensionB || alignType == 'control') {
            // Control c3 defines x
            pa.x = c3x;
            pb.x = c3x;
            if (hasExtensionA && p1.x == c3.x) {
                hasExtA = false;
            }
            if (hasExtensionB && p2.x == c3.x) {
                hasExtB = false;
            }

        } else {
            // Aligntype defines x
            switch (alignType) {
            case 'start':
                pa.x = p1x;
                pb.x = p1x;
                break;
            case 'center':
                pa.x = p1x + (p2x-p1x)/2;
                pb.x = pa.x;
                break;
            case 'end':
                pa.x = p2x;
                pb.x = p2x;
                break;
            } // switch aligntype
        }
    }
    
    var aPoints = isExtADiagonal ? [pStart, pd, pb, pEnd] : (
        hasExtA ? (
            hasExtB ? [pStart, pa, pb, pEnd] : [pStart, pa, pb] 
            )
            : (hasExtB ? [pa, pb, pEnd] : [pa, pb] )
        );
    return aPoints;                                    
}

module.exports = calculateHorVertLinePoints_V001;
