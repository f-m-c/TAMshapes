module.exports = function (point, ...rest) {
    return rest.sort(function (a, b) {
        var distA = Math.sqrt(Math.pow(a.x - point.x, 2) + Math.pow(a.y - point.y, 2));
        var distB = Math.sqrt(Math.pow(b.x - point.x, 2) + Math.pow(b.y - point.y, 2));
        if (distA === distB) {
            return 0;
        }
        return distA < distB ? -1 : 1;
    })[0];
};
