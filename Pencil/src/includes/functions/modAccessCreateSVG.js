function modAccessCreateSVG (p1, p2, c3, isHorizontal, curvedOffset, curvedRadius, alignType = 'center') {
    /* global z L M Q*/
    var curvedR = [];
    var curvedW = [];    
    
    var p1x = parseFloat(p1.x);
    var p1y = parseFloat(p1.y);
    var p2x = parseFloat(p2.x);
    var p2y = parseFloat(p2.y);
    var c3x = parseFloat(c3.x);
    var c3y = parseFloat(c3.y);
    var offset = parseFloat(curvedOffset);
    var radius = parseFloat(curvedRadius);
    var pStart = { x: p1x, y: p1y } ;
    var pEnd = { x: p2x, y: p2y } ;
    var pcx = (p1x + p2x) / 2;
    var pcy = (p1y + p2y) / 2;

    if (isHorizontal) {
        // horizontal line        

        // Aligntype defines y
        switch (alignType) {
        case 'start':
            curvedR.push(M(p1x, p1y + offset));
            curvedR.push(Q(pcx, p1y + offset + radius, p2x, p1y + offset));            
            curvedW.push(M(p1x, p1y - offset));
            curvedW.push(Q(pcx, p1y - offset - radius, p2x, p1y - offset));            
            break;
        case 'center':
            curvedR.push(M(p1x, pcy + offset));
            curvedR.push(Q(pcx, pcy + offset + radius, p2x, pcy + offset));            
            curvedW.push(M(p1x, pcy - offset));
            curvedW.push(Q(pcx, pcy - offset - radius, p2x, pcy - offset));            
            break;
        case 'end':
            curvedR.push(M(p1x, p2y + offset));
            curvedR.push(Q(pcx, p2y + offset + radius, p2x, p2y + offset));            
            curvedW.push(M(p1x, p2y - offset));
            curvedW.push(Q(pcx, p2y - offset - radius, p2x, p2y - offset));            
            break;
        case 'control':
            curvedR.push(M(p1x, c3y + offset));
            curvedR.push(Q(pcx, c3y + offset + radius, p2x, c3y + offset));            
            curvedW.push(M(p1x, c3y - offset));
            curvedW.push(Q(pcx, c3y - offset - radius, p2x, c3y - offset));            
            break;
        } // switch aligntype
        
    } else {
        // vertical line
        // Aligntype defines x
        switch (alignType) {
        case 'start':
            curvedR.push(M(p1x + offset, p1y));
            curvedR.push(Q(p1x + offset + radius, pcy, p1x + offset, p2y));            
            curvedW.push(M(p1x - offset, p1y));
            curvedW.push(Q(p1x - offset - radius, pcy, p1x - offset, p2y));            
            break;
        case 'center':
            curvedR.push(M(pcx + offset, p1y));
            curvedR.push(Q(pcx + offset + radius, pcy, pcx + offset, p2y));            
            curvedW.push(M(pcx - offset, p1y));
            curvedW.push(Q(pcx - offset - radius, pcy, pcx - offset, p2y));            
            break;
        case 'end':
            curvedR.push(M(p2x + offset, p1y));
            curvedR.push(Q(p2x + offset + radius, pcy, p2x + offset, p2y));            
            curvedW.push(M(p2x - offset, p1y));
            curvedW.push(Q(p2x - offset - radius, pcy, p2x - offset, p2y));            
            break;
        case 'control':
            curvedR.push(M(c3x + offset, p1y));
            curvedR.push(Q(c3x + offset + radius, pcy, c3x + offset, p2y));            
            curvedW.push(M(c3x - offset, p1y));
            curvedW.push(Q(c3x - offset - radius, pcy, c3x - offset, p2y));            
            } // switch aligntype
        
    }
    
return { r: curvedR, w: curvedW };
}

module.exports = modAccessCreateSVG;
