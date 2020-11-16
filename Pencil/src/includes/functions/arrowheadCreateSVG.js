function arrowheadCreateSVG (arrowType) {
  /* global z L M Q*/
  var arrowHead = [];
  switch (arrowType) {
    case "none":
      // no arrowhead
      break;
    case "full":
      // closed arrowhead
      arrowHead.push(M(9,5));
      arrowHead.push(L(-1,0));
      arrowHead.push(L(9,-5));
      arrowHead.push(C(7,-2,  7,2,  9,5));
      arrowHead.push(z);
      break;
    case "open":
      // open arrowhead
      arrowHead.push(M(10,4.5));
      arrowHead.push(L(-1,0));
      arrowHead.push(L(10,-4.5));
      break;
    case "composition":
      // filled diamond
      arrowHead.push(M(9,5));
      arrowHead.push(L(-1,0));
      arrowHead.push(L(9,-5));
      arrowHead.push(L(17,0));
      arrowHead.push(z);
      break;
    case "aggregation":
      // open diamond
      arrowHead.push(M(9,5));
      arrowHead.push(L(-1,0));
      arrowHead.push(L(9,-5));
      arrowHead.push(L(17,0));
      arrowHead.push(z);
      break;
    case "specialization":
      // triangle
      arrowHead.push(M(15,8));
      arrowHead.push(L(-1,0));
      arrowHead.push(L(15,-8));
      arrowHead.push(z);
      break;
    default:
    arrowHead.push(M(9,5));
    arrowHead.push(L(-1,0));
    arrowHead.push(L(9,-5));
    arrowHead.push(C(7,-2,  7,2,  9,5));
    arrowHead.push(z);

  }
  return arrowHead;
}

module.exports = arrowheadCreateSVG;
