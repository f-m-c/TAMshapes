function getPointOnLine (a, b, offset) {
    // finds a point on the segment between a and b (points) which is at
    // offset distance from a.

    function getPointCoordinates (a, b) {

        let ax, ay, bx, by;

        ay = a.y;
        by = b.y;
        ax = a.x;
        bx = b.x;
        return { ax, ay, bx, by };
    }

    function findPointDistance (a, b) {
        const x1 = a.x;
        const y1 = a.y;
        const x2 = b.x;
        const y2 = b.y;
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    const {
        ax,
        ay,
        bx,
        by
    } = getPointCoordinates(a, b);

    const R = findPointDistance(a, b);
    // if distance is smaller than double radius, limit to radius (and avoid division by zero as well...)
    const rR = R/2 > offset ? offset/R : 0.5;

    return {
        x : ax + ( bx - ax ) * rR,
        y : ay + ( by - ay ) * rR
    };
}

module.exports = getPointOnLine;
