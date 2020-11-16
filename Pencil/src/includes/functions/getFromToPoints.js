module.exports = function (a, b) {
    if (a.x < b.x) {
        return [a, b];
    } else {
        return [b, a];
    }
};
