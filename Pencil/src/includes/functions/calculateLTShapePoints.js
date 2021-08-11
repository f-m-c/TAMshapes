function calculateLTShapePoints (box, hasNW, cNW, hasNE, cNE, hasSE, cSE, hasSW, cSW) {
    // calculate line points for an L or T Shape
    // box (.w, .h) size of the surrounding box
    // cNW, cNE, cSE, cSW control points 
    // 
    //  Example: 
    // cNW=(0,0) pNNW=(cNW.x,0) pNWW=(0,cNW.y)
    // x -----o pNNE=(cNE.x,0)
    // |      |    
    // |      cNE---o pNEE=(box.w, cNE.y)
    // |            |
    // |        cSE-o pSEE=(box.w,cSE.y)
    // |        |
    // x--------o pSSE=(cSE.x,box.h)
    // cSW=(0,box.h) pSWW=(0,csSW.y) pSSW=(cSW.x,box.h)

    var bx = parseFloat(box.w);
    var by = parseFloat(box.h);
    var cNWx = parseFloat(cNW.x);
    var cNWy = parseFloat(cNW.y);
    var cNEx = parseFloat(cNE.x);
    var cNEy = parseFloat(cNE.y);
    var cSWx = parseFloat(cSW.x);
    var cSWy = parseFloat(cSW.y);
    var cSEx = parseFloat(cSE.x);
    var cSEy = parseFloat(cSE.y);

    var aPoints = [];
    if (hasNW) {
        aPoints.push( {x: 0, y: cNWy} );
        aPoints.push( cNW );
        aPoints.push( {x: cNWx, y: 0} );
    } else {
        aPoints.push( {x: 0, y: 0 });
    }
    if (hasNE) {
        aPoints.push( {x: cNEx, y: 0} );
        aPoints.push( cNE );
        aPoints.push( {x: bx, y: cNEy} );
    } else {
        aPoints.push( {x: bx, y: 0 });
    }
    if (hasSE) {
        aPoints.push( {x: bx, y: cSEy} );
        aPoints.push( cSE );
        aPoints.push( {x: cSEx, y: by} );
    } else {
        aPoints.push( {x: bx, y: by });
    }
    if (hasSW) {
        aPoints.push( {x: cSWx, y: by} );
        aPoints.push( cSW );
        aPoints.push( {x: 0, y: cSWy} );
    } else {
        aPoints.push( {x: 0, y: by });
    }
/*    
    var pNWW = { x: 0,                  y: hasNW ? cNWy : 0  } ;
    var pNNW = { x: hasNW ? cNWx : 0,   y: 0 } ;
    var pNEE = { x: bx,                 y: hasNE ? cNEy : 0 } ;
    var pNNE = { x: hasNE ? cNEx : bx,  y: 0 } ;
    var pSEE = { x: bx,                 y: hasSE ? cSEy : by } ;
    var pSSE = { x: hasSE ? cSEx : bx,  y: by } ;
    var pSWW = { x: 0,                  y: hasSW ? cSWy : by } ;
    var pSSW = { x: hasSW ? cSWx : 0,   y: by } ;



    var aPoints =  [hasNW ? cNW : pNNW, pNNW, pNNE, hasNE ? cNE : pNEE, pNEE, pSEE, hasSE ? cSE : pSSE, pSSE, pSSW, hasSW ? cSW: pSWW, pSWW, pNWW] ;
*/
    return aPoints;                                    
}

module.exports = calculateLTShapePoints;
