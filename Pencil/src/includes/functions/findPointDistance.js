module.exports = function (a, b) {
    var x1 = a.x;
    var y1 = a.y;
    var x2 = b.x;
    var y2 = b.y;
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
