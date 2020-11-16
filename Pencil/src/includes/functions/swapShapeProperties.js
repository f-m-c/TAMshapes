function swapShapeProperties (oShape, sP1, sP2) {
    var p1 = oShape.getProperty(sP1);
    var p2 = oShape.getProperty(sP2);
    oShape.setProperty(sP1, p2);
    oShape.setProperty(sP2, p1);
}

module.exports = swapShapeProperties;
