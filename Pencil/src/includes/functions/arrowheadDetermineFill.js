function arrowheadDetermineFill (arrowType, strokeColor) {
  /* global z L M Q*/
  var arrowHeadFill = Color.fromString("transparent");
  switch (arrowType) {
    case "none":
      // no arrowhead
      break;
    case "full":
      // closed arrowhead
      arrowHeadFill = strokeColor;
      break;
    case "open":
      // open arrowhead
      break;
    case "composition":
      // filled diamond
      arrowHeadFill = strokeColor;
      break;
    case "aggregation":
      // open diamond
      arrowHeadFill = Color.fromString("#ffffffff")
      break;
    case "specialization":
      // triangle
      arrowHeadFill = Color.fromString("#ffffffff")
      break;
    default:

  }
  return arrowHeadFill;
}

module.exports = arrowheadDetermineFill;
