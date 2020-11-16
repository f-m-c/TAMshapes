function calculateChannelCoord (p1, p2, c3, isHorizontal, circleRadius, directionType, rOffset, alignType = "center", hasExtensionA = false, hasExtensionB = false) {
//    x p1    |
//           _|_las
//          /   \    ^ ras
//    x c3 (  x c)   R r  
//          \___/    . rae
//            ^ lae
//            |
//            |
//            |      x p2
// collection.calculateHorVertControlConstraints($HNDLp1, $HNDLp2, $HNDLc3, $BOOLisHorizontal.value, $ENUMalignType.value, $BOOLhasExtensionA.value, $BOOLhasExtensionB.value, $BOOLisExtADiagonal.value
    var p1x = parseFloat(p1.x);
    var p1y = parseFloat(p1.y);
    var p2x = parseFloat(p2.x);
    var p2y = parseFloat(p2.y);
    var c3x = parseFloat(c3.x);
    var c3y = parseFloat(c3.y);
    var cRad = parseFloat(circleRadius);
    var rOff = parseFloat(rOffset);
    var cx = 0.0;
    var cy = 0.0;
    
    // First, calculate the center of the channel circle
    // if (hasExtensionA || hasExtensionB || alignType == 'control') {
    //     cx = c3x;
    //     cy = c3y;
    // } else {
    //     if (isHorizontal) {
    //         switch (alignType) {
    //             case 'start':
    //                 cx = c3x;
    //                 cy = p1y;
    //                 break;
    //             case 'center':
    //                 cx = c3x;
    //                 cy = (p1y + p2y)/2;
    //                 break;
    //             case 'end':
    //                 cx = c3x; 
    //                 cy = p2y;
    //                 break;
    //             } // switch aligntype
    //     } else {
    //         // vertical
    //         switch (alignType) {
    //             case 'start':
    //                 cx = p1x;
    //                 cy = c3y;
    //                 break;
    //             case 'center':
    //                 cx = (p1x + p2x)/2;
    //                 cy = c3y;
    //                 break;
    //             case 'end':
    //                 cx = p2x; 
    //                 cy = c3y;
    //                 break;
    //             } // switch aligntype
    //     }
    // }

    var cc = collection.calculateHorVertControlConstraints(p1, p2, c3, isHorizontal, alignType, hasExtensionA, hasExtensionB);
    cx = cc.x;
    cy = cc.y;
    // now calculate the annotations: Short lines for arrows to channel circle (la*)
    // Location of Request-R (rx, ry)
    // Short lines for Request direction (ras*, res*)
    var las1x = 0.0;
    var las1y = 0.0;
    var las2x = 0.0;
    var las2y = 0.0;
    var lae1x = 0.0;
    var lae1y = 0.0;
    var lae2x = 0.0;
    var lae2y = 0.0;
    var rx = 0.0;
    var ry = 0.0;
    var ras1x = 0.0;
    var ras1y = 0.0;
    var ras2x = 0.0;
    var ras2y = 0.0;
    var rae1x = 0.0;
    var rae1y = 0.0;
    var rae2x = 0.0;
    var rae2y = 0.0;

    if (isHorizontal) {
        // is the channel circle out of bounds?
        if (cx < Math.min(p1x, p2x)) {
            cx = Math.min(p1x, p2x) + 1;
        }
        if (cx > Math.max(p1x, p2x)) {
            cx = Math.max(p1x, p2x) - 1;
        }
        var xdir = Math.sign(cx-p1x);
        las1x = cx - xdir*(cRad / 2 + 3);
        las1y = cy ;
        las2x = cx - xdir*(cRad / 2 + 2);
        las2y = cy ;
        lae1x = cx + xdir*(cRad / 2 + 3);
        lae1y = cy ;
        lae2x = cx + xdir*(cRad / 2 + 2);
        lae2y = cy ;
        rx = cx - 4.5 - xdir*(directionType == "single" ? 5 : 0)  + xdir*(directionType == "other" ? 5 : 0); 
        ry = cy - rOff + 4;
        ras1x = cx - xdir*(11 - (directionType == "other" ?  4 : 0));
        ras1y = cy - rOff;
        ras2x = cx - xdir*(17 - (directionType == "other" ?  4 : 0));
        ras2y = cy - rOff;
        rae1x = cx + xdir*(11 + (directionType == "single" ?  -4 : (directionType == "other" ?  4 : 0)));
        rae1y = cy - rOff;
        rae2x = cx + xdir*(17 + (directionType == "single" ?  -4 : (directionType == "other" ?  4 : 0)));
        rae2y = cy - rOff;
    } else {
        if (cy < Math.min(p1y, p2y)) {
            cy = Math.min(p1y, p2y) + 1;
        }
        if (cy > Math.max(p1y, p2y)) {
            cy = Math.max(p1y, p2y) - 1;
        }
        var ydir = Math.sign(cy-p1y);
        las1x = cx; 
        las1y = cy - ydir*(cRad / 2 + 3);
        las2x = cx; 
        las2y = cy - ydir*(cRad / 2 + 2);
        lae1x = cx; 
        lae1y = cy + ydir*(cRad / 2 + 3);
        lae2x = cx; 
        lae2y = cy + ydir*(cRad / 2 + 2);
        rx = cx + rOff - 4.5;
        ry = cy + 4 + ydir*(directionType == "single" ? -5 : 0) + ydir*(directionType == "other" ? 5 : 0);
        ras1x = cx + rOff; 
        ras1y = cy - ydir*(12 - (directionType == "other" ?  4 : 0));
        ras2x = cx + rOff; 
        ras2y = cy - ydir*(18 - (directionType == "other" ?  4 : 0));
        rae1x = cx + rOff; 
        rae1y = cy + ydir*(12 + (directionType == "single" ?  -4 : (directionType == "other" ?  4 : 0)));
        rae2x = cx + rOff; 
        rae2y = cy + ydir*(18 + (directionType == "single" ?  -4 : (directionType == "other" ?  4 : 0)));
    }
    return {
        cx: cx, cy: cy,
        las1x: las1x, las1y: las1y, las2x: las2x, las2y:las2y,
        lae1x: lae1x, lae1y: lae1y, lae2x: lae2x, lae2y:lae2y,
        rx: rx, ry: ry,
        ras1x: ras1x, ras1y: ras1y, ras2x: ras2x, ras2y:ras2y,
        rae1x: rae1x, rae1y: rae1y, rae2x: rae2x, rae2y:rae2y
    };                          
}

module.exports = calculateChannelCoord;