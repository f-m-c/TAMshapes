function calculatePointOnHorVertLine (
    aPoints,
    control
) {
    // in:
    //   aPoints: Array with line points {x:, y:}
    //   control: control point (current coords) {x:, y:}    
    // out:
    //   Point on given line closest to control
    //
    // Example:
    //  
    //   p1 x--------x p2
    //               |
    //         c1 x  |
    //               x-------x p4
    //              p3

    function isBetween(x, a, b) {
        return( (a <= x && x <= b) || (a >= x && x >= b) );
    }
    var shortestDistance = Number.MAX_VALUE;
    var cOnLine = {x: 0, y: 0};

    // loop over points to find segment closest to control point
    let a = aPoints[0];
    let dist = Number.MAX_VALUE;
    let colX = 0; 
    let colY = 0;
    for (let i=1; i < aPoints.length ; i++) {
        let b = aPoints[i];
        if (a.y == b.y) {
            // horizontal case
            if (isBetween(control.x, a.x, b.x)){
                dist = Math.abs(control.y - a.y);
                colX = control.x;
            } else {
                // we just skip the exact sqrt(sqr+sqr) case
                dist = Math.min(Math.abs(a.x - control.x), Math.abs(b.x - control.x)) + Math.abs(a.y - control.y);
                if (b.x - a.x > 0) {
                    colX = control.x < a.x ? a.x : b.x;
                } else {
                    colX = control.x < b.x ? b.x : a.x;
                }                
            }
            colY = a.y;
            if (dist < shortestDistance) {
                shortestDistance = dist;
                cOnLine.x = colX;
                cOnLine.y = colY;            
            }
        } else if (a.x == b.x)  {
            // vertical case
            if (isBetween(control.y, a.y, b.y)){
                dist = Math.abs(control.x - a.x);      
                colY = control.y;          
            } else {
                // we just skip the exact sqrt(sqr+sqr) case
                dist = Math.abs(a.y - control.y) + Math.min(Math.abs(a.y - control.y), Math.abs(b.y - control.y) );
                if (b.y - a.y > 0) {
                    colY = control.y < a.y ? a.y : b.y;
                } else {
                    colY = control.y < b.y ? b.y : a.y;
                }                
            }
            colX = a.x;
            if (dist < shortestDistance) {
                shortestDistance = dist;
                cOnLine.x = colX;
                cOnLine.y = colY;         
            }
        } else {
            // diagonal case
            dist = Math.min(Math.abs(a.x - control.x), Math.abs(b.x - control.x)) + Math.min(Math.abs(a.y - control.y), Math.abs(b.y - control.y));
            if (dist < shortestDistance) {
                shortestDistance = dist;                
            }
        }        
        a = b;
    }
    return cOnLine;
}


module.exports = calculatePointOnHorVertLine;

//test = calculatePointOnHorVertLine([{x:0, y:0}, {x:-20, y:0}, {x: -20, y:40}, {x:40, y:40}], {x: 10, y:25});