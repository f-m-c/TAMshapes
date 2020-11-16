function drawSequenceDiagramSvg(sDiagram, oOptions) {
    // uses: 
    //   collection.getHiddenDiv
    //   collection.parseSVGMarkupAsDOMFragment

    let oDiv = collection.getHiddenDiv();
    oDiv.innerHTML = "";

    let oDiagram;
    try {
        oDiagram = Diagram.parse(sDiagram);

        const oDiagramOptions = {
            theme: "simple",
            "font-family": oOptions.fontFamily,
            "font-size": oOptions.fontSize,
            "text-decoration": "underline"
        };

        oDiagram.drawSVG(oDiv, oDiagramOptions);

    } catch (e) {
        oDiv.innerHTML = `<svg font-size="12" fill="red" font-family="Courier" xmlns="http://www.w3.org/2000/svg" width="510.234375px" height="429.1875px" class="sequence simple">
            ${e.message.split("\n").map((x, y) => `<text y="${(y+1) * 12}">${x}</text>`).join("")}
        </svg>`;
    }

    let sSvg = oDiv.innerHTML;
    return collection.parseSVGMarkupAsDOMFragment(sSvg);
}

module.exports = drawSequenceDiagramSvg;
