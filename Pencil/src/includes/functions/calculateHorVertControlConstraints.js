function calculateHorVertControlConstraints (p1, p2, c3, isHorizontal, alignType = "center", hasExtensionA = false, hasExtensionB = false, isExtADiagonal = false) {
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
    // output:

    var range = 7.0;
    var p1x = parseFloat(p1.x);
    var p1y = parseFloat(p1.y);
    var p2x = parseFloat(p2.x);
    var p2y = parseFloat(p2.y);
    var c3x = parseFloat(c3.x);
    var c3y = parseFloat(c3.y);
    var cc = { inUse: true, x: c3x, y: c3y };

    var hasExtA = hasExtensionA;
    var hasExtB = hasExtensionB;
    if ((hasExtA && !hasExtB) || (!hasExtA && hasExtB )) {
        // one elbow 
        cc.inUse = false;
    }
if (isHorizontal) {
        // horizontal line
        if ( (hasExtA || hasExtA) && p1x > p2x - 2 * range && p1x < p2x + 2 * range) {
            // although horizontal, the start- and endpoints imply a vertical line, if too close 
            cc.inUse = false;
            cc.x = (p1x + p2x) / 2;
            return cc; 
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
            cc.y = (p1y + p2y) / 2;
            return cc;     
        }
        if (hasExtA && !hasExtB) {
            // one elbow vertical from start
            cc.y = p2y;
            return cc; 
        }
        if (!hasExtA && hasExtB) {
            // one elbow horizontal from start 
            cc.y = p1y;
            return cc; 
        }
        if ((hasExtA && hasExtB) || alignType == "control") {
            // Control c3 defines x
            cc.inUse = true;
            return cc; 
        } else {
            // Aligntype defines y
            switch (alignType) {
            case "start":
                cc.y = p1y;
                break;
            case "center":
                cc.y = (p1y + p2y) / 2;
                break;
            case "end":
                cc.y = p2y;
                break;
            } // switch aligntype
            cc.inUse = false;
            return cc; 
        }
    } else {
        // vertical line
        if ( (hasExtA || hasExtA) && p1y > p2y - 2 * range && p1y < p2y + 2 * range) {
            // although vertical, the start- and endpoints imply a horizontal line, if too close 
            cc.inUse = false;
            cc.y = (p1y + p2y) / 2;
            return cc; 
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
            cc.y = (p1x + p2x) / 2;
            return cc;     
        }
        if (hasExtA && !hasExtB) {
            // one elbow horizontal from start
            cc.x = p2x;
            return cc; 
        }
        if (!hasExtA && hasExtB) {
            // one elbow vertical from start
            cc.x = p1x;
            return cc; 
        }
        if ((hasExtA && hasExtB) || alignType == "control") {
            // Control c3 defines x
            cc.inUse = true;
            return cc; 
        } else {
            // Aligntype defines x
            switch (alignType) {
            case "start":
                cc.x = p1x;
                break;
            case "center":
                cc.x = (p1x + p2x) / 2;
                break;
            case "end":
                cc.x = p2x;
                break;
            } // switch aligntype
            cc.inUse = false;
            return cc; 
        }
    }
}

module.exports = calculateHorVertControlConstraints;
