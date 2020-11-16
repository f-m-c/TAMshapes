function switchHorVert (shape) {
// toggle vertical / horizontal direction    
//
//  p1     x                  x-----            o p1       o---x---x
//         |    c3                 |            |
//         -----x-----    =>       x            x c3    => 
//                   |             |            |
//                   x p2          -----x       x p2
//
// properties needed: p1, p2, c3, isHorizontal, hasExtensionA, hasExtensionB, alignType
    var p1 = shape.getProperty("p1");
    var p2 = shape.getProperty("p2");
    var c3 = shape.getProperty("c3");
    var isHorizontal = shape.getProperty("isHorizontal");
    var hasExtensionA = shape.getProperty("hasExtensionA");
    var hasExtensionB = shape.getProperty("hasExtensionB");
    var alignType = shape.getProperty("alignType");

    // check whether pins are connected
    var p1conn = (p1.meta && p1.meta.connectedShapeId);
    var p2conn = (p2.meta && p2.meta.connectedShapeId);

    if (isHorizontal) {
        // from horizontal to vertical
        isHorizontal = false;
    } else {
        // from vertical to horizontal
        isHorizontal = true;
    }
    shape.setProperty("isHorizontal", isHorizontal);
}

module.exports = switchHorVert;