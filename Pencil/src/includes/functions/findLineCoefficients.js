function findLineCoefficients(a, b) {
    var x1 = a.x;
    var y1 = a.y;
    var x2 = b.x;
    var y2 = b.y;
    var div = x2 - x1;
    var m = (y2 / div) - (y1 / div);
    var q = y1 - m * x1;
    return {
        q: q,
        m: m
    };
}

module.exports = findLineCoefficients;
