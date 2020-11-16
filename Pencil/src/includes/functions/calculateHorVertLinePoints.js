function calculateHorVertLinePoints (p1, p2, c3, isHorizontal, alignType = "center", hasExtensionA = false, hasExtensionB = false, isExtADiagonal = false) {
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
    // range determines whether an ellbow will be inserted at all
    var range = 7.0;
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
        if ( (hasExtA || hasExtA) && p1x > p2x - 2 * range && p1x < p2x + 2 * range) {
            // although horizontal, the start- and endpoints imply a vertical line, if too close 
            hasExtA = false;
            hasExtB = false;
            pa.x = (p1x + p2x) / 2;
            pa.y = p1y;
            pb.x = pa.x;
            pb.y = p2y;
            return [pa, pb]; 
        }
        if (((hasExtA && hasExtB) || alignType == "control") && p1y > c3y - range && p1y < c3y + range) {
            // if c3 and p1 are too close (Y), it is not possible to draw an elbow
            hasExtA = false;
        }
        if (((hasExtA && hasExtB) || alignType == "control") && p2y > c3y - range && p2y < c3y + range) {
            // if c3 and p2 are too close (Y), it is not possible to draw an elbow
            hasExtB = false;
        }
        if (((hasExtA && !hasExtB) || (!hasExtA && hasExtB )) && p1y > p2y - range && p1y < p2y + range) {
            // one elbow 
            // check range: If too close, convert to a line
            // pa.x = p1x;
            pa.y = (p1y + p2y) / 2;
            // pb.x = p2x;
            pb.y = pa.y;
            return [pa, pb];     
        }
        if (hasExtA && !hasExtB) {
            // one elbow vertical from start
            pa.y = p2y;
            
            return [pStart, pa, pEnd]; 
        }
        if (!hasExtA && hasExtB) {
            // one elbow horizontal from start 
            pb.y = p1y;
            return [pStart, pb, pEnd]; 
        }
        if ((hasExtA && hasExtB) || alignType == "control") {
            // Control c3 defines x
            pa.y = c3y;
            pb.y = c3y;
        } else {
            // Aligntype defines y
            switch (alignType) {
            case "start":
                pa.y = p1y;
                pb.y = p1y;
                break;
            case "center":
                pa.y = p1y + (p2y-p1y)/2;
                pb.y = pa.y;
                break;
            case "end":
                pa.y = p2y;
                pb.y = p2y;
                break;
            } // switch aligntype
        }
    } else {
        // vertical line
        pa.y = p1y;
        pb.y = p2y;
        if ( (hasExtA || hasExtA) && p1y > p2y - 2 * range && p1y < p2y + 2 * range) {
            // although vertical, the start- and endpoints imply a horizontal line, if too close 
            hasExtA = false;
            hasExtB = false;
            pa.x = p1x;
            pa.y = (p1y + p2y) / 2;
            pb.x = p2x;
            pb.y = pa.y;
            return [pa, pb]; 
        }
        if (((hasExtA && hasExtB) || alignType == "control") && p1x > c3x - range && p1x < c3x + range) {
            // if c3 and p1 are too close (X), it is not possible to draw an elbow
            hasExtA = false;
        }
        if (((hasExtA && hasExtB) || alignType == "control") && p2x > c3x - range && p2x < c3x + range) {
            // if c3 and p2 are too close (X), it is not possible to draw an elbow
            hasExtB = false;
        }
        if (((hasExtA && !hasExtB) || (!hasExtA && hasExtB )) && p1x > p2x - range && p1x < p2x + range) {
            // one elbow 
            // check range: If too close, convert to a line
            pa.x = (p1x + p2x) / 2;
            //pa.y = p1y;
            pb.x = pa.x;
            //pb.y = p2y;
            return [pa, pb];     
        }
        if (hasExtA && !hasExtB) {
            // one elbow horizontal from start
            pa.x = p2x;
            return [pStart, pa, pEnd]; 
        }
        if (!hasExtA && hasExtB) {
            // one elbow vertical from start
            pb.x = p1x;
            return [pStart, pb, pEnd]; 
        }
        if ((hasExtA && hasExtB) || alignType == "control") {
            // Control c3 defines x
            pa.x = c3x;
            pb.x = c3x;
        } else {
            // Aligntype defines x
            switch (alignType) {
            case "start":
                pa.x = p1x;
                pb.x = p1x;
                break;
            case "center":
                pa.x = p1x + (p2x-p1x)/2;
                pb.x = pa.x;
                break;
            case "end":
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

module.exports = calculateHorVertLinePoints;
