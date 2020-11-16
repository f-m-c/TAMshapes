function getPerpendicularPointDistance(a, b, offsetK, targetDistance, bDirection) {
    //
    // Calculates a point k on the line a--b, which is at
    // distance offsetK from a. Then returns a new point perpendicular to the
    // line a--b at distance targetDistance from k.
    //
    //        * targetPoint _
    //        |              \_ targetDistance
    //        |             _/
    //    a*--k-------*b
    //
    // uses: 
    //   collection.getPointOnLine   
    //   collection.findPointDistance
    
    var collection = this;

    var k = collection.getPointOnLine(a, b, offsetK);

    var dx = a.x - b.x;
    var dy = a.y - b.y;
    var distance = collection.findPointDistance(a, b);

    var xPerpendicular = targetDistance * (dx / distance);
    var yPerpendicular = targetDistance * (dy / distance);

    if (bDirection) {
        return {
            x: k.x + yPerpendicular,
            y: k.y - xPerpendicular
        };
    }

    return {
        x: k.x - yPerpendicular,
        y: k.y + xPerpendicular
    };
}

module.exports = getPerpendicularPointDistance;
