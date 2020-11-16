function makeShapeLineStraight (oShape, sP1, sP2, aPretendConnected=[]) {
    function getFromToPoints (p1, p2) {
        if (p1.x < p2.x) {
            return [p1, p2];
        } else {
            return [p2, p1];
        }
    }

    function isLineVertical (p1, p2) {
        var [pFrom, pTo] = getFromToPoints(p1, p2);
        return Math.abs(pTo.x - pFrom.x) < Math.abs(pTo.y - pFrom.y);
    }

    function isConnected (sPoint) {
        return oShape.getProperty(sPoint).isConnected() || aPretendConnected.indexOf(sPoint) >= 0;
    }

    let p1 = oShape.getProperty(sP1);
    let p2 = oShape.getProperty(sP2);

    if (isConnected(sP1) && isConnected(sP2)) {
        return;
    }

    if (isLineVertical(p1, p2)) {
        if (isConnected(sP1)) {
            p2.x = p1.x;
            oShape.setProperty(sP2, p2);
        } else if (isConnected(sP2)) {
            p1.x = p2.x;
            oShape.setProperty(sP1, p1);
        } else {
            var dx = Math.abs(p1.x - p2.x) / 2;
            if (p1.x < p2.x) {
                p1.x += dx;
                p2.x -= dx;
            } else {
                p2.x += dx;
                p1.x -= dx;
            }
            oShape.setProperty(sP1, p1);
            oShape.setProperty(sP2, p2);
        }
    } else {
        if (isConnected(sP1)) {
            p2.y = p1.y;
            oShape.setProperty(sP2, p2);
        } else if (isConnected(sP2)) {
            p1.y = p2.y;
            oShape.setProperty(sP1, p1);
        } else {
            var dy = Math.abs(p1.y - p2.y)/2;
            if (p1.y < p2.y) {
                p1.y += dy;
                p2.y -= dy;
            } else {
                p2.y += dy;
                p1.y -= dy;
            }
            oShape.setProperty(sP1, p1);
            oShape.setProperty(sP2, p2);
        }
    }
}

module.exports = makeShapeLineStraight;
