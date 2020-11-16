/* global CSS Dom */
function buildListDomContent(contentText, itemColor, itemFont, box) {
    var items = contentText.value.split(/[\r\n]+/);
    var specs = [];
    for (var i = 0; i < items.length; i++) {
        var css = new CSS();
        var title = items[i];

        if (title.match(/\S/) != null) {
            var lineHeight = (i + 1) * (30 + itemFont.getPixelHeight());

            css = new CSS();
            css.set("font-size", itemFont.size);
            css.set("font-family", itemFont.family);
            css.set("font-style", itemFont.style);
            css.set("font-weight", itemFont.weight);
            css.set("font-decor", itemFont.decor);
            css.set("fill", itemColor.toRGBString());

            specs.push({
                _name: "text",
                _uri: "http://www.w3.org/2000/svg",
                x: 10,
                y: lineHeight,
                _text: title,
                style: css
            }, {
                _name: "path",
                _uri: "http://www.w3.org/2000/svg",
                d: "m 10," + (lineHeight + 10) + " " + (box.w - 20) + ",0",
                style: "stroke-width:1;stroke:#c9c9c9"
            });
        }
    }
    var frag = Dom.newDOMFragment(specs);

    return frag;
}

module.exports = buildListDomContent;
