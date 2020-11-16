function findSlopeOfPoints (a, b) {
    var num = (b.y - a.y);
    var den = (b.x - a.x);
    if (den === 0) {
        return Infinity;
    }
    return  num / den;
}

module.exports = findSlopeOfPoints;
