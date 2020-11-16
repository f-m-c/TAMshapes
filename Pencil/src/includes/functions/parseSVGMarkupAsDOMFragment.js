function parseSVGMarkupAsDOMFragment (sMarkup) {
    let oDocumentFragment = document.createDocumentFragment()

    try {
        let oDOMParser = new DOMParser();
        const oParsed = oDOMParser.parseFromString(sMarkup, "image/svg+xml");
        oDocumentFragment.appendChild(oParsed.firstElementChild);
    } catch (e) {
        console.error(e);
    }

    return oDocumentFragment;
}

module.exports = parseSVGMarkupAsDOMFragment;
